"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { spotDataService } from '../services/spot-data-service'
import type { ProcessedSpotMarket, LoadingState } from '../types/hyperliquid-types'

export function useSpotData() {
  const [markets, setMarkets] = useState<ProcessedSpotMarket[]>([])
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    error: null,
    lastUpdated: null
  })

  const refresh = useCallback(async () => {
    try {
      await spotDataService.refreshMarkets()
    } catch (error) {
      console.error('Failed to refresh spot markets:', error)
    }
  }, [])

  useEffect(() => {
    // Subscribe to data updates
    const unsubscribeData = spotDataService.onData((newMarkets) => {
      setMarkets(newMarkets)
    })

    // Subscribe to loading state changes
    const unsubscribeLoading = spotDataService.onLoadingStateChange((newState) => {
      setLoadingState(newState)
    })

    // Initial fetch
    spotDataService.fetchMarkets()

    return () => {
      unsubscribeData()
      unsubscribeLoading()
    }
  }, [])

  return {
    markets,
    loading: loadingState.isLoading,
    error: loadingState.error,
    lastUpdated: loadingState.lastUpdated,
    refresh,
    isEmpty: markets.length === 0 && !loadingState.isLoading
  }
}

// Hook for filtered and sorted spot data
export function useFilteredSpotData(
  sortKey?: keyof ProcessedSpotMarket,
  sortDirection: 'asc' | 'desc' = 'desc',
  searchTerm?: string,
  quoteToken?: string
) {
  const { markets, ...rest } = useSpotData()

  const filteredData = useMemo(() => {
    let filtered = markets

    // Filter by quote token (e.g., only USDC pairs)
    if (quoteToken) {
      filtered = filtered.filter(market => 
        market.pair.endsWith(`/${quoteToken}`)
      )
    }

    // Apply search filter
    if (searchTerm && searchTerm.length > 0) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(market => 
        market.token.toLowerCase().includes(term) ||
        market.pair.toLowerCase().includes(term) ||
        market.tokenId.toLowerCase().includes(term)
      )
    }

    // Apply sorting
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortKey]
        const bValue = b[sortKey]

        // Handle null values
        if (aValue === null && bValue === null) return 0
        if (aValue === null) return 1
        if (bValue === null) return -1

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'desc' ? bValue - aValue : aValue - bValue
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'desc' 
            ? bValue.localeCompare(aValue)
            : aValue.localeCompare(bValue)
        }

        return 0
      })
    }

    return filtered
  }, [markets, quoteToken, searchTerm, sortKey, sortDirection])

  return {
    markets: filteredData,
    ...rest
  }
}

// Hook for specific spot markets
export function useSpecificSpotMarkets(tokens: string[]) {
  const { markets, ...rest } = useSpotData()
  
  const specificMarkets = useMemo(() => {
    const tokenSet = new Set(tokens.map(t => t.toUpperCase()))
    return markets.filter(market => tokenSet.has(market.token))
  }, [markets, tokens])

  return {
    markets: specificMarkets,
    ...rest
  }
}

// Hook for top spot markets by volume
export function useTopSpotMarkets(limit: number = 10, quoteToken: string = 'USDC') {
  const { markets, ...rest } = useSpotData()
  
  const topMarkets = useMemo(() => {
    return [...markets]
      .filter(market => market.pair.endsWith(`/${quoteToken}`))
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, limit)
  }, [markets, quoteToken, limit])

  return {
    markets: topMarkets,
    ...rest
  }
}

// Hook for markets by quote token
export function useSpotMarketsByQuote(quoteToken: string = 'USDC') {
  const { markets, ...rest } = useSpotData()
  
  const quotedMarkets = useMemo(() => {
    return markets.filter(market => 
      market.pair.endsWith(`/${quoteToken}`) &&
      market.volume24h > 10000 // Only show markets with >$10k in 24h volume
    )
  }, [markets, quoteToken])

  return {
    markets: quotedMarkets,
    ...rest
  }
}