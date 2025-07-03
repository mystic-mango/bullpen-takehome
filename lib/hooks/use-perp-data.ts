"use client"

import { useState, useEffect, useCallback } from 'react'
import { perpDataService } from '../services/perp-data-service'
import type { ProcessedPerpMarket, LoadingState } from '../types/hyperliquid-types'

export function usePerpData() {
  const [markets, setMarkets] = useState<ProcessedPerpMarket[]>([])
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    error: null,
    lastUpdated: null
  })

  const refresh = useCallback(async () => {
    try {
      await perpDataService.refreshMarkets()
    } catch (error) {
      console.error('Failed to refresh markets:', error)
    }
  }, [])

  useEffect(() => {
    // Subscribe to data updates
    const unsubscribeData = perpDataService.onData((newMarkets) => {
      setMarkets(newMarkets)
    })

    // Subscribe to loading state changes
    const unsubscribeLoading = perpDataService.onLoadingStateChange((newState) => {
      setLoadingState(newState)
    })

    // Initial fetch
    perpDataService.fetchMarkets()

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

// Hook for filtered and sorted perp data
export function useFilteredPerpData(
  sortKey?: keyof ProcessedPerpMarket,
  sortDirection: 'asc' | 'desc' = 'desc',
  searchTerm?: string
) {
  const { markets, ...rest } = usePerpData()

  const filteredData = useState(() => {
    let filtered = markets

    // Apply search filter
    if (searchTerm && searchTerm.length > 0) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(market => 
        market.coin.toLowerCase().includes(term) ||
        market.pair.toLowerCase().includes(term)
      )
    }

    // Apply sorting
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortKey]
        const bValue = b[sortKey]

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
  })[0]

  return {
    markets: filteredData,
    ...rest
  }
}

// Hook for specific markets
export function useSpecificMarkets(coins: string[]) {
  const { markets, ...rest } = usePerpData()
  
  const specificMarkets = useState(() => {
    const coinSet = new Set(coins.map(c => c.toUpperCase()))
    return markets.filter(market => coinSet.has(market.coin))
  })[0]

  return {
    markets: specificMarkets,
    ...rest
  }
}

// Hook for top markets by volume
export function useTopMarkets(limit: number = 10) {
  const { markets, ...rest } = usePerpData()
  
  const topMarkets = useState(() => {
    return [...markets]
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, limit)
  })[0]

  return {
    markets: topMarkets,
    ...rest
  }
}