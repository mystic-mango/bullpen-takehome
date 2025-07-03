"use client"

import * as React from "react"
import { 
  PerpsSpotTabs, 
  PerpsSpotTabsList, 
  PerpsSpotTabsTrigger, 
  PerpsSpotTabsContent 
} from "@/components/tables/perps-spot-tabs"
import { PerpTable } from "@/components/tables/perp-table"
import { SpotTable } from "@/components/tables/spot-table"
import { useUrlState } from "@/lib/hooks/use-url-state"

interface DiscoverTabsProps {
  defaultValue?: "perps" | "spot"
  onValueChange?: (value: string) => void
}

export function DiscoverTabs({ defaultValue = "perps", onValueChange }: DiscoverTabsProps) {
  const [activeTab, setActiveTab] = useUrlState('tab', defaultValue)

  const handleValueChange = React.useCallback((value: string) => {
    setActiveTab(value)
    onValueChange?.(value)
  }, [setActiveTab, onValueChange])

  return (
    <PerpsSpotTabs value={activeTab} onValueChange={handleValueChange}>
      <PerpsSpotTabsList className="ml-4">
        <PerpsSpotTabsTrigger value="perps">
          Perps
        </PerpsSpotTabsTrigger>
        <PerpsSpotTabsTrigger value="spot">
          Spot
        </PerpsSpotTabsTrigger>
      </PerpsSpotTabsList>
      
      <div className="relative isolate mt-6 overflow-hidden">
        <PerpsSpotTabsContent value="perps" asChild>
          <div className="w-full">
            <PerpTable />
          </div>
        </PerpsSpotTabsContent>
        
        <PerpsSpotTabsContent value="spot" asChild>
          <div className="w-full">
            <SpotTable />
          </div>
        </PerpsSpotTabsContent>
      </div>
    </PerpsSpotTabs>
  )
}