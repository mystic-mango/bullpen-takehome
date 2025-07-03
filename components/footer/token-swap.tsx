import * as React from "react"
import Image from "next/image"
import { SwitchIcon } from "@/components/icons/switch"

export function TokenSwap() {
  return (
    <button className="flex items-center h-6 px-1 py-1.5 relative rounded cursor-pointer hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1">
          <Image src="/sol-token.svg" alt="SOL" width={12} height={12} className="size-4" />
          <span className="flex flex-col font-favorit justify-center leading-[0] not-italic relative shrink-0 text-foreground text-xs text-center text-nowrap">
            SOL
          </span>
        </div>
        <div className="bg-primary/10 flex items-center justify-center px-0.5 py-0.5 relative rounded shrink-0 size-5">
          <SwitchIcon className="text-primary" />
        </div>
        <div className="flex items-center gap-1">
          <span className="flex flex-col font-favorit justify-center leading-[0] not-italic relative shrink-0 text-foreground text-xs text-center text-nowrap">
            USDC
          </span>
          <Image src="/usdc-sol-token.svg" alt="USDC" width={16} height={16} className="size-4" />
        </div>
      </div>
    </button>
  )
}