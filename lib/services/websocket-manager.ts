// Centralized WebSocket Manager
// Manages the global WebSocket connection and ensures only one connection exists

import { hyperliquidWebSocket } from './hyperliquid-websocket'
import type { WebSocketStatus } from './hyperliquid-websocket'

export class WebSocketManager {
  private static instance: WebSocketManager | null = null
  private connectionCount = 0
  private isConnecting = false
  private reconnectAttempts = 0
  private maxReconnectAttempts = 3
  private reconnectDelay = 2000

  // Singleton pattern
  static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager()
    }
    return WebSocketManager.instance
  }

  private constructor() {
    console.log('WebSocketManager: Initializing...')
    this.setupGlobalWebSocket()
  }

  private setupGlobalWebSocket(): void {
    // Listen for status changes globally
    hyperliquidWebSocket.onStatusChange((status) => {
      console.log('WebSocketManager: Status changed to:', status)
      
      if (status === 'connected') {
        this.reconnectAttempts = 0
        this.isConnecting = false
        // Subscribe to all mids for real-time price updates
        hyperliquidWebSocket.subscribeToAllMids()
      } else if (status === 'disconnected' && this.connectionCount > 0) {
        this.handleReconnection()
      } else if (status === 'error' && this.connectionCount > 0) {
        this.handleReconnection()
      }
    })

    // Listen for errors globally
    hyperliquidWebSocket.onError((error) => {
      console.error('WebSocketManager: WebSocket error:', error)
      if (this.connectionCount > 0) {
        this.handleReconnection()
      }
    })
  }

  private handleReconnection(): void {
    if (this.isConnecting || this.reconnectAttempts >= this.maxReconnectAttempts) {
      return
    }

    this.reconnectAttempts++
    this.isConnecting = true

    console.log(`WebSocketManager: Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts}`)

    setTimeout(() => {
      if (this.connectionCount > 0 && !hyperliquidWebSocket.isConnected) {
        this.connect()
      }
    }, this.reconnectDelay * this.reconnectAttempts)
  }

  // Request a connection (reference counting)
  requestConnection(): void {
    this.connectionCount++
    console.log(`WebSocketManager: Connection requested. Count: ${this.connectionCount}`)

    if (this.connectionCount === 1 && !hyperliquidWebSocket.isConnected && !this.isConnecting) {
      this.connect()
    }
  }

  // Release a connection (reference counting)
  releaseConnection(): void {
    this.connectionCount = Math.max(0, this.connectionCount - 1)
    console.log(`WebSocketManager: Connection released. Count: ${this.connectionCount}`)

    // Don't disconnect the WebSocket even if count reaches 0
    // Keep it alive for better UX when switching between tabs
  }

  private connect(): void {
    if (this.isConnecting || hyperliquidWebSocket.isConnected) {
      return
    }

    this.isConnecting = true
    console.log('WebSocketManager: Connecting to WebSocket...')
    
    try {
      hyperliquidWebSocket.connect()
    } catch (error) {
      console.error('WebSocketManager: Failed to connect:', error)
      this.isConnecting = false
    }
  }

  // Get current connection status
  getStatus(): WebSocketStatus {
    return hyperliquidWebSocket.connectionStatus
  }

  // Check if connected
  isConnected(): boolean {
    return hyperliquidWebSocket.isConnected
  }

  // Force disconnect (for cleanup)
  forceDisconnect(): void {
    console.log('WebSocketManager: Force disconnecting...')
    this.connectionCount = 0
    this.isConnecting = false
    hyperliquidWebSocket.disconnect()
  }
}

// Export singleton instance
export const webSocketManager = WebSocketManager.getInstance()