import * as React from "react"
import { WalletIcon } from "@/components/icons/wallet"
import Image from "next/image"

interface WalletBalanceProps {
  usdcBalance?: number
  hlBalance?: number
}

export function WalletBalance({ usdcBalance = 0, hlBalance = 0 }: WalletBalanceProps) {
  return (
    <button className="relative bg-background h-8 text-white rounded border border-border px-3 py-2 flex items-center gap-2 hover:bg-accent hover:border-accent-foreground/20 hover:[&_svg]:text-accent-foreground hover:text-accent-foreground transition-all duration-200 ease-in-out cursor-pointer">
      <WalletIcon className="size-4" />
      <div className="flex items-center gap-1.5">
        {/* First balance with SOL icon */}
        <div className="flex items-center gap-1">
          <div className=" relative rounded-full size-4">
            <Image
              src="/sol-token.svg"
              alt="SOL"
              width={16}
              height={16}
              className="absolute inset-0"
            />
          </div>
          <span className="font-favorit font-bold text-sm leading-5">{usdcBalance}</span>
        </div>
        
        {/* Second balance with USDC/HL composite icon */}
        <div className="flex items-center gap-1">
          <div className="relative size-4">
            <Image
              src="/usdc-hl-token.svg"
              alt="USDC"
              width={16}
              height={16}
              className="absolute inset-0"
            />
          </div>
          <span className="font-favorit font-bold text-sm leading-5">{hlBalance}</span>
        </div>
      </div>
    </button>
  )
}