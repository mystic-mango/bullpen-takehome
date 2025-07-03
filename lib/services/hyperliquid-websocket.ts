// Hyperliquid WebSocket Service

import type { 
  SubscriptionMessage, 
  SubscriptionType,
  WsResponse,
  AllMids,
  WsTrade,
  WsBook,
  WsBbo,
  Candle
} from '../types/hyperliquid-types'

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

export interface WebSocketEventHandlers {
  onStatusChange: (status: WebSocketStatus) => void
  onError: (error: string) => void
  onAllMids: (data: AllMids) => void
  onTrades: (data: WsTrade[]) => void
  onL2Book: (data: WsBook) => void
  onBbo: (data: WsBbo) => void
  onCandle: (data: Candle[]) => void
}

export class HyperliquidWebSocket {
  private ws: WebSocket | null = null
  private baseUrl = 'wss://api.hyperliquid.xyz/ws'
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000 // Start with 1 second
  private maxReconnectDelay = 30000 // Max 30 seconds
  private pingInterval: NodeJS.Timeout | null = null
  private status: WebSocketStatus = 'disconnected'
  
  // Event handlers
  private statusHandlers = new Set<(status: WebSocketStatus) => void>()
  private errorHandlers = new Set<(error: string) => void>()
  private dataHandlers = new Map<string, Set<(data: unknown) => void>>()
  
  // Active subscriptions
  private activeSubscriptions = new Set<string>()

  constructor() {
    this.setupPingInterval()
  }

  private setupPingInterval() {
    // Send ping every 30 seconds to keep connection alive
    this.pingInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ method: 'ping' }))
      }
    }, 30000)
  }

  connect(): void {
    if (this.ws) {
      console.log('WebSocket already exists, closing existing connection')
      this.ws.close()
    }

    console.log('Connecting to WebSocket...')
    this.ws = new WebSocket(this.baseUrl)

    this.ws.onopen = () => {
      console.log('WebSocket connected')
      this.setStatus('connected')
      this.reconnectAttempts = 0
      this.reconnectDelay = 1000
      
      // Resubscribe to active subscriptions
      this.resubscribeAll()
    }

    this.ws.onclose = () => {
      console.log('WebSocket disconnected')
      this.setStatus('disconnected')
      this.handleReconnect()
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      this.setStatus('error')
      this.notifyError('WebSocket connection error')
    }

    this.ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data)
        console.log('WebSocket message received:', response)
        this.handleMessage(response)
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
        this.notifyError('Failed to parse WebSocket message')
      }
    }
  }

  private handleMessage(response: WsResponse): void {
    const { channel, data } = response

    // Handle subscription responses
    if (channel === 'subscriptionResponse') {
      return
    }

    // Handle data messages
    const handlers = this.dataHandlers.get(channel)
    if (handlers) {
      console.log('WebSocket data received:', { channel, data })
      handlers.forEach(handler => {
        try {
          handler(data)
        } catch (error) {
          console.error('Handler error:', error)
        }
      })
    }
  }

  private setStatus(status: WebSocketStatus): void {
    this.status = status
    this.statusHandlers.forEach(handler => {
      handler(status)
    })
  }

  private notifyError(error: string): void {
    this.errorHandlers.forEach(handler => {
      handler(error)
    })
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.notifyError('Failed to reconnect after maximum attempts')
      return
    }

    this.reconnectAttempts++
    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1), this.maxReconnectDelay)
    
    setTimeout(() => {
      this.connect()
    }, delay)
  }

  private resubscribeAll(): void {
    this.activeSubscriptions.forEach(subscriptionKey => {
      try {
        const subscription: SubscriptionType = JSON.parse(subscriptionKey)
        this.subscribe(subscription)
      } catch (error) {
        console.error('❌ Failed to resubscribe:', subscriptionKey, error)
      }
    })
  }

  subscribe(subscription: SubscriptionType): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.activeSubscriptions.add(JSON.stringify(subscription))
      return
    }

    const message: SubscriptionMessage = {
      method: 'subscribe',
      subscription
    }

    try {
      this.ws.send(JSON.stringify(message))
      this.activeSubscriptions.add(JSON.stringify(subscription))
    } catch {
      this.notifyError('Failed to send subscription message')
    }
  }

  unsubscribe(subscription: SubscriptionType): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return
    }

    const message: SubscriptionMessage = {
      method: 'unsubscribe',
      subscription
    }

    try {
      this.ws.send(JSON.stringify(message))
      this.activeSubscriptions.delete(JSON.stringify(subscription))
    } catch {
      this.notifyError('Failed to send unsubscription message')
    }
  }

  // Event handler management
  onStatusChange(handler: (status: WebSocketStatus) => void): () => void {
    this.statusHandlers.add(handler)
    // Immediately call with current status
    handler(this.status)
    return () => this.statusHandlers.delete(handler)
  }

  onError(handler: (error: string) => void): () => void {
    this.errorHandlers.add(handler)
    return () => this.errorHandlers.delete(handler)
  }

  onData<T = unknown>(channel: string, handler: (data: T) => void): () => void {
    if (!this.dataHandlers.has(channel)) {
      this.dataHandlers.set(channel, new Set())
    }
    this.dataHandlers.get(channel)!.add(handler as (data: unknown) => void)
    return () => {
      const handlers = this.dataHandlers.get(channel)
      if (handlers) {
        handlers.delete(handler as (data: unknown) => void)
        if (handlers.size === 0) {
          this.dataHandlers.delete(channel)
        }
      }
    }
  }

  // Convenience methods for common subscriptions
  subscribeToAllMids(): void {
    this.subscribe({ type: 'allMids' })
  }

  subscribeToTrades(coin: string): void {
    this.subscribe({ type: 'trades', coin })
  }

  subscribeToL2Book(coin: string): void {
    this.subscribe({ type: 'l2Book', coin })
  }

  subscribeToBbo(coin: string): void {
    this.subscribe({ type: 'bbo', coin })
  }

  subscribeToCandles(coin: string, interval: string): void {
    this.subscribe({ type: 'candle', coin, interval })
  }

  // Getters
  get connectionStatus(): WebSocketStatus {
    return this.status
  }

  get isConnected(): boolean {
    return this.status === 'connected'
  }

  // Cleanup
  disconnect(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
      this.pingInterval = null
    }

    if (this.ws) {
      this.ws.close()
      this.ws = null
    }

    this.activeSubscriptions.clear()
    this.statusHandlers.clear()
    this.errorHandlers.clear()
    this.dataHandlers.clear()
    
    this.setStatus('disconnected')
  }
}

// Singleton instance
export const hyperliquidWebSocket = new HyperliquidWebSocket()