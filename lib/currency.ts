export interface CurrencyFormatOptions {
  currency?: string
  showDecimals?: boolean
  useShortFormat?: boolean
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export function formatCurrency(
  value: number,
  options: CurrencyFormatOptions = {}
): { symbol: string; number: string } {
  const {
    currency = "USD",
    showDecimals = true,
    useShortFormat = true,
    minimumFractionDigits,
    maximumFractionDigits
  } = options

  // Handle short format (K, M, B, T)
  if (useShortFormat) {
    const absValue = Math.abs(value)
    
    if (absValue >= 1e12) {
      return { symbol: "$", number: `${(value / 1e12).toFixed(1)}T` }
    }
    if (absValue >= 1e9) {
      return { symbol: "$", number: `${(value / 1e9).toFixed(1)}B` }
    }
    if (absValue >= 1e6) {
      return { symbol: "$", number: `${(value / 1e6).toFixed(1)}M` }
    }
    if (absValue >= 1e3) {
      return { symbol: "$", number: `${(value / 1e3).toFixed(1)}K` }
    }
  }

  // Standard formatting
  const formatOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    minimumFractionDigits: minimumFractionDigits ?? (showDecimals ? 2 : 0),
    maximumFractionDigits: maximumFractionDigits ?? (showDecimals ? 2 : 0)
  }

  const formatted = new Intl.NumberFormat("en-US", formatOptions).format(value)
  
  // Split the formatted string to separate symbol and number
  const match = formatted.match(/^(\$)(.+)$/)
  if (match) {
    return { symbol: match[1], number: match[2] }
  }
  
  return { symbol: "$", number: value.toString() }
}