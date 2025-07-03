import * as React from "react"
import { cn } from "@/lib/utils"

export interface LiveIndicatorProps {
  isLive?: boolean
  isInitializing?: boolean
  className?: string
}

export function LiveIndicator({ isLive = true, isInitializing = false, className }: LiveIndicatorProps) {
  const statusConfig = {
    initializing: {
      color: "#B3B9BE",
      bgColor: "bg-[#B3B9BE]",
      textColor: "text-[#b3b9be]",
      borderColor: "border-[#B3B9BE]",
      label: "Initializing",
      animate: true
    },
    live: {
      color: "#2F9967",
      bgColor: "bg-[#2F9967]",
      textColor: "text-[#2f9967]",
      borderColor: "border-primary",
      label: "Live",
      animate: true
    },
    stale: {
      color: "#FFA500",
      bgColor: "bg-[#FFA500]",
      textColor: "text-[#ffa500]",
      borderColor: "border-[#FFA500]",
      label: "Stale",
      animate: false
    }
  }

  const config = isInitializing 
    ? statusConfig.initializing 
    : isLive 
      ? statusConfig.live 
      : statusConfig.stale

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="relative h-3 w-3">
        <div className={cn("h-3 w-3 rounded-full border", config.borderColor)}></div>
        <div className="absolute top-0 left-0">
          <div className={cn(
            "h-3 w-3 rounded-full",
            config.bgColor,
            config.animate && "animate-ping"
          )}></div>
        </div>
      </div>
      <span className={cn(
        "font-favorit leading-[0] not-italic relative shrink-0 text-xs text-left text-nowrap",
        config.textColor
      )}>
        {config.label}
      </span>
    </div>
  )
}