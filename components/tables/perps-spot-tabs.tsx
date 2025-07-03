"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

function PerpsSpotTabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function PerpsSpotTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "flex flex-row gap-4 items-start justify-start p-0",
        className
      )}
      {...props}
    />
  )
}

function PerpsSpotTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "box-border content-stretch flex flex-row gap-1 items-center justify-start px-0 py-3 relative shrink-0",
        "font-favorit text-lg leading-6 text-left text-nowrap not-italic cursor-pointer",
        "text-[#b3b9be] data-[state=active]:text-white",
        "transition-colors duration-200 ease-in-out",
        "hover:text-white focus-visible:outline-none focus-visible:text-white",
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function PerpsSpotTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { PerpsSpotTabs, PerpsSpotTabsList, PerpsSpotTabsTrigger, PerpsSpotTabsContent }