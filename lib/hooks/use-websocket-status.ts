import { useState, useEffect, useRef, useCallback } from 'react'
import { hyperliquidWebSocket } from '../services/hyperliquid-websocket'
import type { WebSocketStatus } from '../services/hyperliquid-websocket'
import type { AllMids } from '../types/hyperliquid-types'

export function useWebSocketStatus() {
  const [status, setStatus] = useState<WebSocketStatus>('connecting')
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now())
  const [hasInitialized, setHasInitialized] = useState(false)
  const [isLive, setIsLive] = useState(false)
  
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const initAttemptRef = useRef(false)
  const statusRef = useRef<WebSocketStatus>('connecting')
  const lastUpdateRef = useRef<number>(Date.now())
  const hasInitializedRef = useRef(false)

  // Update refs when state changes
  useEffect(() => {
    statusRef.current = status
  }, [status])

  useEffect(() => {
    lastUpdateRef.current = lastUpdate
  }, [lastUpdate])

  useEffect(() => {
    hasInitializedRef.current = hasInitialized
  }, [hasInitialized])

  // Function to calculate live status
  const updateLiveStatus = useCallback(() => {
    const now = Date.now()
    const timeSinceUpdate = now - lastUpdateRef.current
    const newIsLive = hasInitializedRef.current && 
                      statusRef.current === 'connected' && 
                      timeSinceUpdate <= 30000
    
    setIsLive(newIsLive)
    
    console.log('Live status update:', {
      status: statusRef.current,
      hasInitialized: hasInitializedRef.current,
      timeSinceUpdate,
      isLive: newIsLive,
      timestamp: new Date().toISOString()
    })
  }, [])

  // Update live status every 5 seconds
  useEffect(() => {
    updateLiveStatus() // Initial calculation
    
    const interval = setInterval(updateLiveStatus, 5000)
    return () => clearInterval(interval)
  }, [updateLiveStatus])

  useEffect(() => {
    // Reset state when component mounts
    setStatus('connecting')
    setHasInitialized(false)
    setIsLive(false)
    initAttemptRef.current = false
    statusRef.current = 'connecting'
    hasInitializedRef.current = false

    console.log('Starting initialization...', {
      timestamp: new Date().toISOString()
    })

    // Only attempt initialization once
    if (initAttemptRef.current) {
      console.log('Initialization already attempted, skipping')
      return
    }
    initAttemptRef.current = true

    // Subscribe to WebSocket status changes
    const unsubscribeStatus = hyperliquidWebSocket.onStatusChange((newStatus) => {
      console.log('WebSocket status change:', {
        oldStatus: statusRef.current,
        newStatus,
        hasInitialized: hasInitializedRef.current,
        timestamp: new Date().toISOString()
      })

      // If we get disconnected after being initialized, don't go back to initializing
      if (hasInitializedRef.current && newStatus === 'disconnected') {
        setStatus('error')
      } else {
        setStatus(newStatus)
      }
      statusRef.current = newStatus
      setLastUpdate(Date.now())
    })

    // Subscribe to data updates to track last activity
    const unsubscribeData = hyperliquidWebSocket.onData<AllMids>('allMids', () => {
      console.log('Received data update:', {
        status: statusRef.current,
        hasInitialized: hasInitializedRef.current,
        timestamp: new Date().toISOString()
      })
      setLastUpdate(Date.now())
      if (!hasInitializedRef.current && statusRef.current === 'connected') {
        console.log('First data received, marking as initialized')
        setHasInitialized(true)
        if (timeoutRef.current) {
          console.log('Clearing initialization timeout')
          clearTimeout(timeoutRef.current)
        }
      }
    })

    // Set a timeout for initialization
    timeoutRef.current = setTimeout(() => {
      console.log('Initialization timeout reached:', {
        hasInitialized: hasInitializedRef.current,
        status: statusRef.current,
        timestamp: new Date().toISOString()
      })
      if (!hasInitializedRef.current) {
        console.log('Setting status to error due to initialization timeout')
        setStatus('error')
        statusRef.current = 'error'
      }
    }, 10000) // 10 second timeout for initialization

    // Ensure WebSocket is connected
    if (!hyperliquidWebSocket.isConnected) {
      hyperliquidWebSocket.connect()
    }

    return () => {
      console.log('Cleanup triggered:', {
        hasInitialized: hasInitializedRef.current,
        status: statusRef.current,
        timestamp: new Date().toISOString()
      })
      unsubscribeStatus()
      unsubscribeData()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, []) // Remove hasInitialized from dependencies

  // Determine the display state
  const isInitializing = !hasInitialized && status !== 'error'

  return {
    status,
    isLive,
    isInitializing,
    lastUpdate
  }
} 