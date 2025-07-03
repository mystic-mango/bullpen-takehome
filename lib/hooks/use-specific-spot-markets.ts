import { useSpotMarketsByQuote } from './use-spot-data'

/**
 * Hook to get specific spot markets by their base tokens
 * @param tokens Array of token symbols to fetch (e.g., ['BTC', 'SOL', 'HYPE'])
 * @param quoteToken Quote token to filter by (defaults to 'USDC')
 * @returns Object containing the filtered markets and loading state
 */
export function useSpecificSpotMarkets(tokens: string[], quoteToken: string = 'USDC') {
  const { markets, loading, error, lastUpdated } = useSpotMarketsByQuote(quoteToken)
  
  // Filter markets to only the requested tokens
  const filteredMarkets = markets.filter(market => tokens.includes(market.token))
  
  return {
    markets: filteredMarkets,
    loading,
    error,
    lastUpdated,
    // Helper to get a specific market's price
    getPrice: (token: string) => {
      const market = filteredMarkets.find(m => m.token === token)
      return market?.lastPrice || null
    }
  }
} 