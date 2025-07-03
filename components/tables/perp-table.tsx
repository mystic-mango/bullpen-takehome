"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SortableHeader,
  TokenCell,
  PriceCell,
  ChangeCell,
  VolumeCell,
  VolumeContent,
  BadgeCell,
  TableErrorState,
  TableLoadingState,
  TableEmptyState,
  type SortConfig,
} from "@/components/tables/shared-table-components";
import { usePerpData } from "@/lib/hooks/use-perp-data";
import type { ProcessedPerpMarket } from "@/lib/types/hyperliquid-types";

type PerpSortKey = keyof ProcessedPerpMarket;

interface PerpTableProps {
  forceLoading?: boolean;
  forceError?: Error | null;
  forceEmpty?: boolean;
}

function formatFunding(funding: number | null): string {
  if (funding === null) return "–";
  const sign = funding >= 0 ? "+" : "";
  return `${sign}${(funding * 100).toFixed(4)}%`;
}

export function PerpTable({
  forceLoading,
  forceError,
  forceEmpty,
}: PerpTableProps = {}) {
  const {
    markets,
    loading: dataLoading,
    error: dataError,
    refresh,
  } = usePerpData();

  const loading = forceLoading ?? dataLoading;
  const error = forceError ?? dataError;
  const isEmpty = forceEmpty ?? false;
  
  const [sortConfig, setSortConfig] = React.useState<SortConfig<PerpSortKey>>({
    key: "volume24h",
    direction: "desc",
  });

  const [isScrolled, setIsScrolled] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const viewport = container.querySelector(
      '[data-slot="scroll-area-viewport"]'
    ) as HTMLElement;
    const scrollElement = viewport || container;

    const handleScroll = () => {
      const scrollLeft = scrollElement.scrollLeft;
      setIsScrolled(scrollLeft > 0);
    };

    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSort = (key: PerpSortKey) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "desc" ? "asc" : "desc",
    }));
  };

  const displayData = React.useMemo(() => {
    return isEmpty ? [] : markets;
  }, [isEmpty, markets]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return displayData;

    return [...displayData].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "desc"
          ? bValue - aValue
          : aValue - bValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "desc"
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      return 0;
    });
  }, [displayData, sortConfig]);

  const badgeHeaderClass = `${
    isScrolled ? "w-12 opacity-100 pl-4" : "w-0 opacity-0 p-0"
  } text-left transition-all duration-150 sticky left-0 top-0 bg-background z-30 overflow-hidden font-favorit text-xs leading-4 text-[#b3b9be]`;

  const badgeCellClass = `${
    isScrolled ? "w-12 opacity-100" : "w-0 opacity-0"
  } text-left p-0 transition-all duration-150 sticky left-0 bg-background z-5 overflow-hidden`;

  const tokenCellClass = `w-[240px] transition-opacity duration-150 ${
    isScrolled ? "opacity-30" : "opacity-100"
  }`;

  if (error) {
    return (
      <ScrollArea className="w-full h-[calc(100vh-168px)] md:h-[calc(100vh-204px)]" ref={scrollContainerRef}>
        <TableErrorState message={error.message} onRetry={refresh} />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full h-[calc(100vh-168px)] md:h-[calc(100vh-204px)]" ref={scrollContainerRef}>
      <Table className="min-w-[900px]">
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow className="border-border">
            <TableHead className={badgeHeaderClass}>
              {isScrolled ? "Token" : ""}
            </TableHead>
            <SortableHeader
              sortKey="coin"
              currentSort={sortConfig}
              onSort={handleSort}
              className={`w-[260px] text-left pl-4 transition-opacity duration-150 sticky top-0 bg-background z-10 ${
                isScrolled ? "opacity-30" : "opacity-100"
              }`}
            >
              Token
            </SortableHeader>
            <SortableHeader
              sortKey="lastPrice"
              currentSort={sortConfig}
              onSort={handleSort}
              className="w-[140px] text-left sticky top-0 bg-background z-10"
            >
              Last Price
            </SortableHeader>
            <SortableHeader
              sortKey="changePercent24h"
              currentSort={sortConfig}
              onSort={handleSort}
              className="w-[140px] text-left sticky top-0 bg-background z-10"
            >
              24h Change
            </SortableHeader>
            <SortableHeader
              sortKey="volume24h"
              currentSort={sortConfig}
              onSort={handleSort}
              className="w-[120px] sticky top-0 bg-background z-10"
            >
              24h Volume
            </SortableHeader>
            <SortableHeader
              sortKey="funding8h"
              currentSort={sortConfig}
              onSort={handleSort}
              className="w-[120px] sticky top-0 bg-background z-10"
            >
              8h Funding
            </SortableHeader>
            <SortableHeader
              sortKey="openInterest"
              currentSort={sortConfig}
              onSort={handleSort}
              className="w-[180px] sticky top-0 bg-background z-10"
            >
              Open Interest / Market Cap
            </SortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableLoadingState rowCount={8} />
          ) : sortedData.length === 0 ? (
            <TableEmptyState message="No perpetual markets available" />
          ) : (
            sortedData.map((perp) => (
              <TableRow
                key={perp.id}
                className="border-b hover:bg-accent/10 cursor-pointer transition-colors h-[68px] rounded-[10px] overflow-hidden"
              >
                <BadgeCell 
                  pair={perp.pair}
                  isScrolled={isScrolled}
                  className={badgeCellClass}
                />

                <TokenCell
                  iconSrc={perp.iconSrc}
                  token={perp.coin}
                  pair={perp.pair}
                  badge={{
                    text: `${perp.maxLeverage}x`,
                    variant: "leverage",
                  }}
                  className={tokenCellClass}
                />

                <PriceCell value={perp.lastPrice} className="w-[140px]" />

                <ChangeCell
                  change24h={perp.change24h}
                  changePercent24h={perp.changePercent24h}
                  className="w-[140px]"
                />

                <VolumeCell value={perp.volume24h} className="w-[120px]" />

                <TableCell className="text-left p-3 w-[120px]">
                  <div className="flex flex-col items-start justify-center">
                    <span
                      className={`font-favorit text-sm leading-5 ${
                        perp.funding8h === null ? "text-[#b3b9be]" : "text-white"
                      }`}
                    >
                      {formatFunding(perp.funding8h)}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-left p-3 w-[180px]">
                  <div className="flex flex-col items-start justify-center">
                    {perp.openInterest !== null ? (
                      <VolumeContent value={perp.openInterest} />
                    ) : (
                      <span className="font-favorit text-sm leading-5 text-[#b3b9be]">
                        –
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
