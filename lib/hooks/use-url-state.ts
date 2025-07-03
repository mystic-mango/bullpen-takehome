"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export function useUrlState(key: string, defaultValue: string) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get initial value from URL or use default
  const [value, setValue] = useState(() => {
    const urlValue = searchParams.get(key)
    return urlValue || defaultValue
  })

  // Update URL when value changes
  const updateValue = useCallback((newValue: string) => {
    setValue(newValue)
    
    const params = new URLSearchParams(searchParams.toString())
    
    if (newValue === defaultValue) {
      // Remove param if it's the default value to keep URL clean
      params.delete(key)
    } else {
      params.set(key, newValue)
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/'
    router.replace(newUrl, { scroll: false })
  }, [key, defaultValue, router, searchParams])

  // Sync with URL changes (e.g., browser back/forward)
  useEffect(() => {
    const urlValue = searchParams.get(key)
    const newValue = urlValue || defaultValue
    if (newValue !== value) {
      setValue(newValue)
    }
  }, [searchParams, key, defaultValue, value])

  return [value, updateValue] as const
}