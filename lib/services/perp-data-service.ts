// Perpetuals Data Service - combines HTTP API and WebSocket

import { hyperliquidAPI } from './hyperliquid-api'
import { hyperliquidWebSocket } from './hyperliquid-websocket'
import { webSocketManager } from './websocket-manager'
import type { 
  ProcessedPerpMarket, 
  LoadingState, 
  HyperliquidApiError,
  AllMids 
} from '../types/hyperliquid-types'

export class PerpDataService {
  private markets: ProcessedPerpMarket[] = []
  private loadingState: LoadingState = {
    isLoading: false,
    error: null,
    lastUpdated: null
  }

  // Event handlers
  private dataHandlers = new Set<(markets: ProcessedPerpMarket[]) => void>()
  private loadingHandlers = new Set<(state: LoadingState) => void>()
  
  // WebSocket cleanup functions
  private wsCleanupFunctions: (() => void)[] = []
  
  // Request deduplication
  private activePromise: Promise<void> | null = null
  private lastFetchTime = 0
  private cacheTimeout = 30000 // 30 seconds cache

  constructor() {
    // WebSocket setup will be done when first needed
  }

  private setupWebSocket(): void {
    if (this.wsCleanupFunctions.length > 0) return // Already setup

    console.log('Setting up WebSocket subscriptions for perp markets')

    // Listen for all mids updates (real-time prices) only
    const midsCleanup = hyperliquidWebSocket.onData<AllMids>('allMids', (data) => {
      this.handlePriceUpdates(data)
    })

    this.wsCleanupFunctions = [midsCleanup]
  }

  private handlePriceUpdates(midsData: AllMids): void {
    if (!midsData.mids || typeof midsData.mids !== 'object') {
      return
    }


    // Update existing markets with new prices
    let updatedCount = 0
    const updatedMarkets = this.markets.map(market => {
      const newPrice = midsData.mids[market.coin]
      
      if (newPrice && typeof newPrice === 'string') {
        const price = parseFloat(newPrice)
        if (!isNaN(price) && price !== market.lastPrice) {
          updatedCount++
          return {
            ...market,
            lastPrice: price,
            markPrice: price // Update mark price too since they're usually the same from mids
          }
        }
      }
      
      return market
    })

    if (updatedCount > 0) {
      this.markets = updatedMarkets
      this.notifyDataHandlers()
    }
  }

  private setLoadingState(updates: Partial<LoadingState>): void {
    this.loadingState = {
      ...this.loadingState,
      ...updates
    }
    this.notifyLoadingHandlers()
  }

  private notifyDataHandlers(): void {
    this.dataHandlers.forEach(handler => {
      try {
        handler([...this.markets])
      } catch (error) {
        console.error('Handler error:', error)
      }
    })
  }

  private notifyLoadingHandlers(): void {
    this.loadingHandlers.forEach(handler => {
      try {
        handler({ ...this.loadingState })
      } catch (error) {
        console.error('Handler error:', error)
      }
    })
  }

  async fetchMarkets(): Promise<void> {
    // Check if we have cached data that's still valid
    const now = Date.now()
    if (this.markets.length > 0 && (now - this.lastFetchTime) < this.cacheTimeout) {
      console.log('PerpDataService: Using cached data')
      this.notifyDataHandlers()
      return
    }

    // Return existing promise if there's already a request in progress
    if (this.activePromise) {
      console.log('PerpDataService: Request already in progress, waiting...')
      return this.activePromise
    }

    this.setLoadingState({ 
      isLoading: true, 
      error: null 
    })

    // Create and store the promise
    this.activePromise = this.performFetch()
    
    try {
      await this.activePromise
    } finally {
      this.activePromise = null
    }
  }

  private async performFetch(): Promise<void> {
    try {
      console.log('PerpDataService: Fetching fresh data from API')
      const markets = await hyperliquidAPI.getPerpetualMarkets()
      
      this.markets = markets
      this.lastFetchTime = Date.now()
      this.setLoadingState({
        isLoading: false,
        error: null,
        lastUpdated: this.lastFetchTime
      })

      this.notifyDataHandlers()

      // Setup WebSocket if not already done
      this.setupWebSocket()
      
      // Request WebSocket connection through manager
      webSocketManager.requestConnection()

    } catch (error) {
      const apiError: HyperliquidApiError = {
        message: error instanceof Error ? error.message : 'Failed to fetch markets',
        code: error instanceof Error ? error.name : 'UNKNOWN_ERROR',
        timestamp: Date.now()
      }

      this.setLoadingState({
        isLoading: false,
        error: apiError
      })
    }
  }

  async refreshMarkets(): Promise<void> {
    // Force a fresh fetch by clearing cache
    this.lastFetchTime = 0
    await this.fetchMarkets()
  }

  // Public API for subscribing to data updates
  onData(handler: (markets: ProcessedPerpMarket[]) => void): () => void {
    this.dataHandlers.add(handler)
    
    // Immediately provide current data if available
    if (this.markets.length > 0) {
      handler([...this.markets])
    }
    
    return () => this.dataHandlers.delete(handler)
  }

  onLoadingStateChange(handler: (state: LoadingState) => void): () => void {
    this.loadingHandlers.add(handler)
    
    // Immediately provide current loading state
    handler({ ...this.loadingState })
    
    return () => this.loadingHandlers.delete(handler)
  }

  // Getters
  getMarkets(): ProcessedPerpMarket[] {
    return [...this.markets]
  }

  getLoadingState(): LoadingState {
    return { ...this.loadingState }
  }

  getWebSocketStatus() {
    return hyperliquidWebSocket.connectionStatus
  }

  // Market filtering and searching
  getMarketsByCoin(coins: string[]): ProcessedPerpMarket[] {
    const coinSet = new Set(coins.map(c => c.toUpperCase()))
    return this.markets.filter(market => coinSet.has(market.coin))
  }

  searchMarkets(query: string): ProcessedPerpMarket[] {
    const lowerQuery = query.toLowerCase()
    return this.markets.filter(market => 
      market.coin.toLowerCase().includes(lowerQuery) ||
      market.pair.toLowerCase().includes(lowerQuery)
    )
  }

  getTopMarketsByVolume(limit: number = 10): ProcessedPerpMarket[] {
    return [...this.markets]
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, limit)
  }

  // Cleanup
  destroy(): void {
    // Release WebSocket connection through manager
    webSocketManager.releaseConnection()
    
    // Clean up WebSocket listeners
    this.wsCleanupFunctions.forEach(cleanup => cleanup())
    this.wsCleanupFunctions = []
    
    // Clear handlers
    this.dataHandlers.clear()
    this.loadingHandlers.clear()
    
    // Clear data
    this.markets = []
    this.setLoadingState({
      isLoading: false,
      error: null,
      lastUpdated: null
    })
  }
}

// Singleton instance
export const perpDataService = new PerpDataService()