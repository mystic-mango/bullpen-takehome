"use client"

import * as React from "react"
import Image from "next/image"
import { Currency } from "@/components/display/currency"
import { useSpecificSpotMarkets } from "@/lib/hooks/use-specific-spot-markets"

function Divider() {
  return (
    <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
      <div className="flex-none rotate-[90deg]">
        <div className="h-0 relative w-[22px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px] bg-border"></div>
        </div>
      </div>
    </div>
  )
}

interface PriceIndicatorProps {
  symbol: string
  price: number | null
  iconSrc: string
  iconSize: { width: number; height: number }
  color: string
  minWidth: string
}

function PriceIndicator({ symbol, price, iconSrc, iconSize, color, minWidth }: PriceIndicatorProps) {
  if (price === null) return null;

  return (
    <div className="flex items-center gap-1">
      <div style={{ minWidth }} className="flex items-center gap-1">
        <Image src={iconSrc} alt={symbol} width={iconSize.width} height={iconSize.height} />
        <Currency
          value={price}
          className={`leading-[0] not-italic relative shrink-0 ${color} text-xs text-left text-nowrap tabular-nums`}
        />
      </div>
    </div>
  );
}

export function PriceIndicators() {
  const { getPrice } = useSpecificSpotMarkets(['BTC', 'SOL', 'HYPE'])
  
  const prices = {
    BTC: getPrice('BTC'),
    SOL: getPrice('SOL'),
    HYPE: getPrice('HYPE')
  }

  // If all prices are null, don't render anything
  if (Object.values(prices).every(price => price === null)) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <Divider />
      <PriceIndicator
        symbol="BTC"
        price={prices.BTC}
        iconSrc="/btc.svg"
        iconSize={{ width: 11, height: 12 }}
        color="text-[#f7931a]"
        minWidth="60px"
      />
      <PriceIndicator
        symbol="SOL"
        price={prices.SOL}
        iconSrc="/sol.svg"
        iconSize={{ width: 10, height: 10 }}
        color="text-[#6de698]"
        minWidth="60px"
      />
      <PriceIndicator
        symbol="HYPE"
        price={prices.HYPE}
        iconSrc="/hl.svg"
        iconSize={{ width: 11, height: 8 }}
        color="text-[#4ff0d6]"
        minWidth="60px"
      />
    </div>
  )
}