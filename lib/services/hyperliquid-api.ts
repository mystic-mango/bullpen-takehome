// Hyperliquid HTTP API Service

import type { 
  MetaAndAssetCtxsResponse,
  SpotMetaAndAssetCtxsResponse,
  SpotMeta,
  ProcessedPerpMarket,
  ProcessedSpotMarket
} from '../types/hyperliquid-types'

import { TokenBucket } from './token-bucket'
import { getAssetDisplayName } from './asset-display-names'

export class HyperliquidAPIError extends Error {
  constructor(
    message: string, 
    public code?: string, 
    public endpoint?: string
  ) {
    super(message)
    this.name = 'HyperliquidAPIError'
  }
}

export class HyperliquidAPI {
  private baseUrl = 'https://api.hyperliquid.xyz'
  private timeout = 10000 // 10 seconds
  private rateLimiter = new TokenBucket()

  private async makeRequest<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
    // Wait for rate limit token before making request
    await this.rateLimiter.waitForToken()

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      // console.log(`🔄 Making request to ${endpoint}`, body)
      
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new HyperliquidAPIError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status.toString(),
          endpoint
        )
      }

      const data = await response.json()
      // console.log(`✅ Request successful for ${endpoint}`)
      return data
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new HyperliquidAPIError(
          `Request timeout after ${this.timeout}ms`,
          'TIMEOUT',
          endpoint
        )
      }
      
      if (error instanceof HyperliquidAPIError) {
        throw error
      }
      
      throw new HyperliquidAPIError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'NETWORK_ERROR',
        endpoint
      )
    }
  }

  async getMetaAndAssetCtxs(): Promise<MetaAndAssetCtxsResponse> {
    return this.makeRequest<MetaAndAssetCtxsResponse>('/info', {
      type: 'metaAndAssetCtxs'
    })
  }

  async getSpotMeta(): Promise<SpotMeta> {
    return this.makeRequest<SpotMeta>('/info', {
      type: 'spotMeta'
    })
  }

  async getSpotMetaAndAssetCtxs(): Promise<SpotMetaAndAssetCtxsResponse> {
    const response = await this.makeRequest<SpotMetaAndAssetCtxsResponse>('/info', {
      type: 'spotMetaAndAssetCtxs'
    })
    return response
  }

  private resolveTokenName(coinSymbol: string): string {
    // Handle wrapped/derivative tokens that start with 'k'
    if (coinSymbol.startsWith('k') && coinSymbol.length > 1) {
      const baseToken = coinSymbol.substring(1) // Remove 'k' prefix
      
      // Only log in development to avoid spam
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 Resolving wrapped token: ${coinSymbol} -> ${baseToken}`)
      }
      
      return baseToken
    }
    
    // Handle other common prefixes as we discover them
    // Examples might include:
    // - 'w' prefix for wrapped tokens
    // - 'x' prefix for some derivatives
    // - Add more cases here based on real data
    
    return coinSymbol
  }

  getTokenIconUrl(coinSymbol: string): string {
    const resolvedName = this.resolveTokenName(coinSymbol)
    return `https://app.hyperliquid.xyz/coins/${resolvedName}.svg`
  }

  getSpotTokenIconUrl(baseToken: string, quoteToken: string): string {
    // For USD pairs like ADA/USD, use just the base token name
    if (quoteToken === 'USD') {
      return `https://app.hyperliquid.xyz/coins/${baseToken}.svg`
    }
    
    // For other pairs like VORTEX/USDC, use the format: BASETOKEN_QUOTETOKEN.svg
    return `https://app.hyperliquid.xyz/coins/${baseToken}_${quoteToken}.svg`
  }

  async validateIconUrl(iconUrl: string): Promise<boolean> {
    try {
      const response = await fetch(iconUrl, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }

  async getTokenIconUrlWithFallback(coinSymbol: string): Promise<string> {
    const primaryIconUrl = this.getTokenIconUrl(coinSymbol)
    
    // For now, return the primary URL - we'll handle fallback in the UI component
    // This avoids blocking the API calls with icon validation
    return primaryIconUrl
  }

  processMetaAndAssetCtxs(response: MetaAndAssetCtxsResponse): ProcessedPerpMarket[] {
    const [meta, assetCtxs] = response
    
    if (!meta?.universe || !Array.isArray(meta.universe)) {
      throw new HyperliquidAPIError('Invalid universe data in response')
    }

    if (!Array.isArray(assetCtxs)) {
      throw new HyperliquidAPIError('Invalid asset contexts in response')
    }

    const markets: ProcessedPerpMarket[] = meta.universe.map((asset, index) => {
      const ctx = assetCtxs[index]
      
      if (!ctx) {
        return null
      }

      // Parse numeric values safely
      const markPrice = parseFloat(ctx.markPx || '0')
      const prevDayPrice = parseFloat(ctx.prevDayPx || '0')
      const volume24h = parseFloat(ctx.dayNtlVlm || '0')
      const funding = parseFloat(ctx.funding || '0')
      const openInterest = parseFloat(ctx.openInterest || '0')
      const premium = ctx.premium ? parseFloat(ctx.premium) : undefined
      const oraclePrice = ctx.oraclePx ? parseFloat(ctx.oraclePx) : undefined

      // Calculate 24h change
      const change24h = markPrice - prevDayPrice
      const changePercent24h = prevDayPrice > 0 ? (change24h / prevDayPrice) * 100 : 0

      const market: ProcessedPerpMarket = {
        id: `${asset.name.toLowerCase()}-usd`,
        coin: asset.name,
        pair: `${asset.name}-USD`,
        lastPrice: markPrice,
        markPrice: markPrice,
        change24h,
        changePercent24h,
        volume24h,
        funding8h: funding,
        openInterest,
        maxLeverage: asset.maxLeverage,
        szDecimals: asset.szDecimals,
        onlyIsolated: asset.onlyIsolated || false,
        iconSrc: this.getTokenIconUrl(asset.name),
        premium,
        oraclePrice
      }

      return market
    }).filter((market): market is ProcessedPerpMarket => market !== null)

    // Sort by volume (highest first)
    markets.sort((a, b) => b.volume24h - a.volume24h)

    return markets
  }

  processSpotMetaAndAssetCtxs(response: SpotMetaAndAssetCtxsResponse): ProcessedSpotMarket[] {
    if (!response || !Array.isArray(response) || response.length !== 2) {
      throw new HyperliquidAPIError('Invalid spot markets response format')
    }

    const [meta, assetCtxs] = response

    if (!meta?.universe || !Array.isArray(meta.universe)) {
      throw new HyperliquidAPIError('Invalid spot universe data in response')
    }

    if (!meta?.tokens || !Array.isArray(meta.tokens)) {
      throw new HyperliquidAPIError('Invalid spot tokens data in response')
    }

    if (!Array.isArray(assetCtxs)) {
      throw new HyperliquidAPIError('Invalid spot asset contexts in response')
    }

    const markets: ProcessedSpotMarket[] = meta.universe.map((pair) => {
      // Find the asset context using the pair index
      const ctx = assetCtxs[pair.index]
      if (!ctx) return null

      // Get token info
      const baseTokenIndex = pair.tokens[0]
      const quoteTokenIndex = pair.tokens[1]
      const baseToken = meta.tokens.find(t => t.index === baseTokenIndex)
      const quoteToken = meta.tokens.find(t => t.index === quoteTokenIndex)

      if (!baseToken || !quoteToken) return null

      // Get display names
      const displayBaseToken = getAssetDisplayName(baseToken.name)
      const displayQuoteToken = getAssetDisplayName(quoteToken.name)

      // Parse numeric values
      const lastPrice = ctx.midPx ? parseFloat(ctx.midPx) : null
      const markPrice = ctx.markPx ? parseFloat(ctx.markPx) : null
      const prevDayPrice = ctx.prevDayPx ? parseFloat(ctx.prevDayPx) : null
      const volume24h = ctx.dayNtlVlm ? parseFloat(ctx.dayNtlVlm) : 0
      const circulatingSupply = ctx.circulatingSupply ? parseFloat(ctx.circulatingSupply) : null

      // Skip markets with invalid prices
      if (lastPrice === null || markPrice === null) return null

      // Calculate changes
      const change24h = prevDayPrice !== null ? lastPrice - prevDayPrice : 0
      const changePercent24h = prevDayPrice && prevDayPrice > 0 ? (change24h / prevDayPrice) * 100 : 0

      // Calculate market cap
      const marketCap = circulatingSupply !== null && lastPrice !== null 
        ? circulatingSupply * lastPrice 
        : null

      const market: ProcessedSpotMarket = {
        id: `${displayBaseToken}-${displayQuoteToken}`,
        pair: `${displayBaseToken}/${displayQuoteToken}`,
        token: displayBaseToken,
        pairName: pair.name,
        lastPrice,
        markPrice,
        volume24h,
        change24h,
        changePercent24h,
        marketCap,
        circulatingSupply,
        szDecimals: baseToken.szDecimals,
        weiDecimals: baseToken.weiDecimals,
        tokenId: baseToken.tokenId,
        isCanonical: baseToken.isCanonical,
        iconSrc: `https://app.hyperliquid.xyz/coins/${displayBaseToken}_${displayQuoteToken}.svg`,
        contractAddress: baseToken.evmContract || undefined,
        hasDisplayMapping: baseToken.name !== displayBaseToken
      }

      return market
    }).filter((market): market is ProcessedSpotMarket => market !== null)

    // Sort by volume
    markets.sort((a, b) => b.volume24h - a.volume24h)
    
    return markets
  }

  async getPerpetualMarkets(): Promise<ProcessedPerpMarket[]> {
    try {
      const response = await this.getMetaAndAssetCtxs()
      return this.processMetaAndAssetCtxs(response)
    } catch (error) {
      console.error('❌ Error fetching perpetual markets:', error)
      throw error
    }
  }

  async getSpotMarkets(): Promise<ProcessedSpotMarket[]> {
    try {
      const response = await this.getSpotMetaAndAssetCtxs()
      const processed = this.processSpotMetaAndAssetCtxs(response)
      return processed
    } catch (error) {
      console.error('❌ Error fetching spot markets:', error)
      throw error
    }
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      await this.getMetaAndAssetCtxs()
      return true
    } catch (error) {
      console.error('❌ Health check failed:', error)
      return false
    }
  }
}

// Singleton instance
export const hyperliquidAPI = new HyperliquidAPI()