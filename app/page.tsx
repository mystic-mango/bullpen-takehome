import { Suspense } from "react"
import { DiscoverTabs } from "@/components/tables/trading-tabs"

function DiscoverTabsWrapper() {
  return <DiscoverTabs />
}

export default function Home() {
  return (
    <div className="h-full py-0 pt-10">
      <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
        <Suspense fallback={<div className="h-96 animate-pulse bg-accent/10 rounded-lg" />}>
          <DiscoverTabsWrapper />
        </Suspense>
      </div>
    </div>
  );
}
