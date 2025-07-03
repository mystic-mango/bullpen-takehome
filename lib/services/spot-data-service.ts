// Spot Data Service - combines HTTP API and WebSocket

import { hyperliquidAPI } from './hyperliquid-api'
import { hyperliquidWebSocket } from './hyperliquid-websocket'
import { webSocketManager } from './websocket-manager'
import type { 
  ProcessedSpotMarket, 
  LoadingState, 
  HyperliquidApiError,
  AllMids 
} from '../types/hyperliquid-types'

export class SpotDataService {
  private markets: ProcessedSpotMarket[] = []
  private loadingState: LoadingState = {
    isLoading: false,
    error: null,
    lastUpdated: null
  }

  // Event handlers
  private dataHandlers = new Set<(markets: ProcessedSpotMarket[]) => void>()
  private loadingHandlers = new Set<(state: LoadingState) => void>()
  
  // WebSocket cleanup functions
  private wsCleanupFunctions: (() => void)[] = []
  private isWsSetup = false
  
  // Request deduplication
  private activePromise: Promise<void> | null = null
  private lastFetchTime = 0
  private cacheTimeout = 30000 // 30 seconds cache

  constructor() {
    // WebSocket setup will be done when first needed
  }

  private setupWebSocket(): void {
    if (this.isWsSetup) return

    console.log('Setting up WebSocket subscriptions for spot markets')

    // Listen for all mids updates (real-time prices) only
    const midsCleanup = hyperliquidWebSocket.onData<AllMids>('allMids', (data) => {
      console.log('Received spot market update:', data)
      this.handlePriceUpdates(data)
    })

    // Store cleanup functions
    this.wsCleanupFunctions = [midsCleanup]
    this.isWsSetup = true
  }

  private handlePriceUpdates(midsData: AllMids): void {
    if (!midsData.mids || typeof midsData.mids !== 'object') {
      console.warn('Invalid mids data received:', midsData)
      return
    }
    
    // Update existing spot markets with new prices
    let updatedCount = 0
    const updatedMarkets = this.markets.map(market => {
      const newPrice = midsData.mids[market.pairName]
      
      if (newPrice && typeof newPrice === 'string') {
        const price = parseFloat(newPrice)
        if (!isNaN(price) && price !== market.lastPrice) {
          updatedCount++
          const change24h = price - (market.markPrice || price)
          const changePercent24h = market.markPrice ? (change24h / market.markPrice) * 100 : 0
          
          return {
            ...market,
            lastPrice: price,
            markPrice: price,
            change24h,
            changePercent24h,
            marketCap: market.circulatingSupply ? market.circulatingSupply * price : null
          }
        }
      }
      
      return market
    })

    if (updatedCount > 0) {
      console.log(`Updated ${updatedCount} market prices`)
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
      } catch {
        // Error handling silently
      }
    })
  }

  private notifyLoadingHandlers(): void {
    this.loadingHandlers.forEach(handler => {
      try {
        handler({ ...this.loadingState })
      } catch {
        // Error handling silently
      }
    })
  }

  async fetchMarkets(): Promise<void> {
    // Check if we have cached data that's still valid
    const now = Date.now()
    if (this.markets.length > 0 && (now - this.lastFetchTime) < this.cacheTimeout) {
      console.log('SpotDataService: Using cached data')
      this.notifyDataHandlers()
      return
    }

    // Return existing promise if there's already a request in progress
    if (this.activePromise) {
      console.log('SpotDataService: Request already in progress, waiting...')
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
      console.log('SpotDataService: Fetching fresh data from API')
      const markets = await hyperliquidAPI.getSpotMarkets()
      console.log('SpotDataService: Received fresh markets:', markets.length)
      
      this.markets = markets
      this.lastFetchTime = Date.now()
      this.setLoadingState({
        isLoading: false,
        error: null,
        lastUpdated: this.lastFetchTime
      })
      
      this.notifyDataHandlers()

      // Setup WebSocket if not already done
      if (!this.isWsSetup) {
        console.log('Setting up WebSocket for the first time')
        this.setupWebSocket()
      }
      
      // Request WebSocket connection through manager
      webSocketManager.requestConnection()

    } catch (error) {
      console.error('Failed to fetch spot markets:', error)
      const apiError: HyperliquidApiError = {
        message: error instanceof Error ? error.message : 'Failed to fetch spot markets',
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
  onData(handler: (markets: ProcessedSpotMarket[]) => void): () => void {
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
  getMarkets(): ProcessedSpotMarket[] {
    return [...this.markets]
  }

  getLoadingState(): LoadingState {
    return { ...this.loadingState }
  }

  // Market filtering and searching
  getMarketsByToken(tokens: string[]): ProcessedSpotMarket[] {
    const tokenSet = new Set(tokens.map(t => t.toUpperCase()))
    return this.markets.filter(market => tokenSet.has(market.token))
  }

  searchMarkets(query: string): ProcessedSpotMarket[] {
    const lowerQuery = query.toLowerCase()
    return this.markets.filter(market => 
      market.token.toLowerCase().includes(lowerQuery) ||
      market.pair.toLowerCase().includes(lowerQuery) ||
      market.tokenId.toLowerCase().includes(lowerQuery)
    )
  }

  getTopMarketsByVolume(limit: number = 10): ProcessedSpotMarket[] {
    return [...this.markets]
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, limit)
  }

  getMarketsByQuote(quoteToken: string = 'USDC'): ProcessedSpotMarket[] {
    return this.markets.filter(market => 
      market.pair.endsWith(`/${quoteToken}`)
    )
  }

  // Cleanup
  destroy(): void {
    // Release WebSocket connection through manager
    webSocketManager.releaseConnection()
    
    // Clean up WebSocket listeners
    this.wsCleanupFunctions.forEach(cleanup => cleanup())
    this.wsCleanupFunctions = []
    this.isWsSetup = false
    
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
export const spotDataService = new SpotDataService()