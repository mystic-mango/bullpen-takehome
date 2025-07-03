import * as React from "react"
import { formatCurrency, type CurrencyFormatOptions } from "@/lib/currency"
import { cn } from "@/lib/utils"

export interface CurrencyProps extends CurrencyFormatOptions {
  value: number
  className?: string
}

export function Currency({ value, className, ...formatOptions }: CurrencyProps) {
  const { symbol, number } = formatCurrency(value, formatOptions)
  
  return (
    <span className={cn("font-favorit", className)}>
      <span className="italic">{symbol}</span>
      <span className="not-italic">{number}</span>
    </span>
  )
}