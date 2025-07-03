// Hyperliquid API Types

/**
 * Base asset context shared between spot and perpetual markets
 */
export interface SharedAssetCtx {
  dayNtlVlm: string    // 24h volume
  prevDayPx: string    // Previous day's price
  markPx: string       // Mark price
  midPx?: string       // Mid price (optional)
}

/**
 * Spot market asset context
 */
export interface SpotAssetCtx extends SharedAssetCtx {
  circulatingSupply: string
}

/**
 * Spot market token information
 */
export interface SpotToken {
  name: string
  szDecimals: number
  weiDecimals: number
  index: number
  tokenId: string
  isCanonical: boolean
  evmContract: string | null
  fullName: string | null
}

/**
 * Spot market trading pair information
 */
export interface SpotPair {
  name: string              // Pair identifier (e.g., '@1', '@2')
  tokens: [number, number]  // Indices of base and quote tokens
  index: number            // Unique index for this pair
  isCanonical: boolean     // Whether this is the canonical pair
}

/**
 * Complete spot market metadata
 */
export interface SpotMeta {
  tokens: SpotToken[]
  universe: SpotPair[]
}

/**
 * Perpetual market asset information
 */
export interface PerpAsset {
  name: string
  szDecimals: number
  maxLeverage: number
  onlyIsolated?: boolean
}

/**
 * Perpetual market asset context
 */
export interface PerpAssetCtx extends SharedAssetCtx {
  funding?: string          // Funding rate
  openInterest?: string     // Open interest
  premium?: string          // Premium
  oraclePx?: string        // Oracle price
}

/**
 * Complete perpetual market metadata
 */
export interface PerpMeta {
  universe: PerpAsset[]
}

// API Response types
export type SpotMetaAndAssetCtxsResponse = [SpotMeta, SpotAssetCtx[]]
export type MetaAndAssetCtxsResponse = [PerpMeta, PerpAssetCtx[]]

// WebSocket types
export interface AllMids {
  mids: Record<string, string>  // Market ID to mid price mapping
}

export interface WsLevel {
  px: string   // Price level
  sz: string   // Size at this level
  n: number    // Number of orders at this level
}

export interface WsTrade {
  coin: string
  side: string
  px: string
  sz: string
  hash: string
  time: number
  tid: number
  users: [string, string]
}

export interface WsBook {
  coin: string
  levels: [Array<WsLevel>, Array<WsLevel>]  // [bids, asks]
  time: number
}

export interface WsBbo {
  coin: string
  time: number
  bbo: [WsLevel | null, WsLevel | null]  // [best bid, best ask]
}

export interface Candle {
  t: number    // Open time
  T: number    // Close time
  s: string    // Symbol
  i: string    // Interval
  o: number    // Open price
  c: number    // Close price
  h: number    // High price
  l: number    // Low price
  v: number    // Volume
  n: number    // Number of trades
}

// WebSocket subscription types
export type SubscriptionType = 
  | { type: 'allMids'; dex?: string }
  | { type: 'candle'; coin: string; interval: string }
  | { type: 'l2Book'; coin: string; nSigFigs?: number; mantissa?: number }
  | { type: 'trades'; coin: string }
  | { type: 'bbo'; coin: string }

export interface SubscriptionMessage {
  method: 'subscribe' | 'unsubscribe'
  subscription: SubscriptionType
}

// WebSocket response types
export interface WsResponse<T = unknown> {
  channel: string
  data: T
}

// Type guard to check if a response is a subscription response
export function isSubscriptionResponse(response: WsResponse<unknown>): response is WsResponse<SubscriptionType> {
  return response.channel === 'subscriptionResponse';
}

/**
 * Processed spot market data ready for display
 */
export interface ProcessedSpotMarket {
  id: string                     // Unique identifier
  token: string                  // Display name (e.g., "BTC")
  pair: string                   // Display pair (e.g., "BTC/USDC")
  pairName: string              // Original pair name from API like '@1', '@2', etc.
  lastPrice: number
  markPrice: number
  change24h: number
  changePercent24h: number
  volume24h: number
  marketCap: number | null
  circulatingSupply: number | null
  szDecimals: number
  weiDecimals: number
  tokenId: string
  isCanonical: boolean
  iconSrc: string
  contractAddress?: string
  // Additional fields for internal tracking
  internalToken?: string        // Internal token name (e.g., "UBTC")
  internalPair?: string         // Internal pair (e.g., "UBTC/USDC")
  hasDisplayMapping?: boolean   // Whether this token uses a display name mapping
}

/**
 * Processed perpetual market data ready for display
 */
export interface ProcessedPerpMarket {
  id: string                     // Unique identifier
  coin: string                   // Display name (e.g., "BTC")
  pair: string                   // Display pair (e.g., "BTC-USDC")
  lastPrice: number
  markPrice: number
  change24h: number
  changePercent24h: number
  volume24h: number
  openInterest: number | null
  funding8h: number | null
  maxLeverage: number
  szDecimals: number
  onlyIsolated: boolean
  iconSrc: string
  premium?: number               // Premium over oracle price
  oraclePrice?: number          // Oracle price
}

/**
 * API error information
 */
export interface HyperliquidApiError {
  message: string
  code?: string
  endpoint?: string
  timestamp: number
}

/**
 * Loading state for data services
 */
export interface LoadingState {
  isLoading: boolean
  error: HyperliquidApiError | null
  lastUpdated: number | null
}