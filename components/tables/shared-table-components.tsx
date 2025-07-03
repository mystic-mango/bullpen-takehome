"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import { ChevronDownIcon } from "@/components/icons/chevron-down";
import { TwitterIcon } from "@/components/icons/twitter";
import { TelegramIcon } from "@/components/icons/telegram";
import { WebsiteIcon } from "@/components/icons/website";
import { CopyIcon } from "@/components/icons/copy";
import { CheckIcon } from "@/components/icons/check";
import { Currency } from "@/components/display/currency";
import { TokenIcon } from "@/components/display/token-icon";
import { PairDisplay } from "@/components/display/pair-display";
import {
  TableHead,
  TableCell,
  TableRow,
} from "@/components/ui/table";

export type SortDirection = "asc" | "desc";

export interface SortConfig<T extends string> {
  key: T | null;
  direction: SortDirection;
}

export function formatChange(change: number, percent: number): React.ReactNode {
  const isPositive = change >= 0;
  const color = isPositive ? "text-[#4FFFAB]" : "text-[#F34C68]";
  const sign = isPositive ? "+" : "";

  return (
    <span className={color}>
      {sign}{change.toFixed(2)} / {sign}{percent.toFixed(2)}%
    </span>
  );
}

export function formatChangeMobile(change: number, percent: number): React.ReactNode {
  const isPositive = change >= 0;
  const color = isPositive ? "text-[#4FFFAB]" : "text-[#F34C68]";
  const sign = isPositive ? "+" : "";

  return (
    <span className={color}>
      {sign}{change.toFixed(2)} / {sign}{percent.toFixed(2)}%
    </span>
  );
}

export interface SortableHeaderProps<T extends string> {
  children: React.ReactNode;
  sortKey: T;
  currentSort: SortConfig<T>;
  onSort: (key: T) => void;
  className?: string;
}

export function SortableHeader<T extends string>({
  children,
  sortKey,
  currentSort,
  onSort,
  className,
}: SortableHeaderProps<T>) {
  const isActive = currentSort.key === sortKey;
  const direction = isActive ? currentSort.direction : "desc";

  return (
    <TableHead
      className={`cursor-pointer hover:text-accent-foreground transition-colors font-favorit text-xs leading-4 text-[#b3b9be] ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-0.5 justify-start">
        {children}
        <div className="w-3 h-3 flex items-center justify-center">
          {isActive && (
            <ChevronDownIcon
              className={`h-3 w-3 transition-transform ${
                direction === "asc" ? "rotate-180" : ""
              } text-accent-foreground`}
            />
          )}
        </div>
      </div>
    </TableHead>
  );
}

export interface TokenCellProps {
  iconSrc: string;
  token: string;
  pair: string;
  badge?: {
    text: string;
    variant: "leverage" | "spot";
  };
  showSocialLinks?: boolean;
  socialLinks?: {
    twitter?: string;
    telegram?: string;
    website?: string;
  };
  contractAddress?: string | { address: string; evm_extra_wei_decimals?: number };
  tokenId?: string;
  className?: string;
}

export function TokenCell({ 
  iconSrc, 
  token, 
  pair, 
  badge, 
  showSocialLinks, 
  socialLinks, 
  contractAddress, 
  tokenId,
  className 
}: TokenCellProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Prefer tokenId over contractAddress
    const valueToCopy = tokenId || (
      typeof contractAddress === 'object' && contractAddress?.address 
        ? contractAddress.address 
        : contractAddress
    );
    
    if (!valueToCopy) return;

    const textToCopy = String(valueToCopy);

    try {
      // Modern clipboard API (preferred)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }

      // Fallback for older browsers and mobile devices
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error('Fallback copy failed');
      }
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };
  return (
    <TableCell className={`text-left px-3 py-3 max-w-0 ${className} relative transition-all duration-300`}>
      <div className="flex items-center gap-3">
        <div className="relative size-9 flex-shrink-0">
          <TokenIcon
            src={iconSrc}
            alt={token}
            width={36}
            height={36}
            className="rounded-full object-cover w-9 h-9"
          />
        </div>
        <div className="flex items-center gap-10 min-w-0 flex-1">
          <div className="flex flex-col gap-1 items-start justify-center min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 h-[18px] min-w-0">
                <span className="font-favorit font-medium text-sm leading-5 text-white truncate">
                  <PairDisplay pair={pair} />
                </span>
              </div>
              {badge && (
                <div className={`flex items-center justify-center px-1 py-0.5 rounded shrink-0 ${
                  badge.variant === "leverage" 
                    ? "bg-[#0d2535]" 
                    : "bg-[#0d2535]"
                }`}>
                  <span className={`font-favorit text-xs leading-4 ${
                    badge.variant === "leverage" 
                      ? "text-[#b3b9be]" 
                      : "text-[#b3b9be]"
                  }`}>
                    {badge.text}
                  </span>
                </div>
              )}
            </div>
            {showSocialLinks && (
              <div className="flex items-center gap-1">
                {socialLinks?.twitter && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(socialLinks.twitter, '_blank');
                    }}
                    className="flex items-center justify-center w-[13px] h-[13px] bg-[#2C4A60] rounded-full text-white hover:text-white transition-colors cursor-pointer"
                  >
                    <TwitterIcon className="w-2 h-2" />
                  </button>
                )}
                {socialLinks?.telegram && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(socialLinks.telegram, '_blank');
                    }}
                    className="flex items-center justify-center w-[13px] h-[13px] bg-[#2C4A60] rounded-full text-white hover:text-white transition-colors cursor-pointer"
                  >
                    <TelegramIcon className="w-2 h-2" />
                  </button>
                )}
                {socialLinks?.website && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(socialLinks.website, '_blank');
                    }}
                    className="flex items-center justify-center w-[13px] h-[13px] bg-[#2C4A60] rounded-full text-white hover:text-white transition-colors cursor-pointer"
                  >
                    <WebsiteIcon className="w-2 h-2" />
                  </button>
                )}
                {(tokenId || contractAddress) && (
                  <button 
                    onClick={handleCopy}
                    className={`transition-all duration-200 p-0.5 cursor-pointer ${
                      copied 
                        ? "text-[#4FFFAB]" 
                        : "text-[#b3b9be] hover:text-white"
                    }`}
                    title={copied ? "Copied!" : (tokenId ? "Copy token ID" : "Copy contract address")}
                  >
                    <div className="relative w-3 h-3">
                      <CopyIcon 
                        className={`w-3 h-3 absolute inset-0 transition-all duration-200 ${
                          copied 
                            ? "opacity-0 scale-75" 
                            : "opacity-100 scale-100"
                        }`} 
                      />
                      <CheckIcon 
                        className={`w-3 h-3 absolute inset-0 transition-all duration-200 ${
                          copied 
                            ? "opacity-100 scale-100" 
                            : "opacity-0 scale-125"
                        }`} 
                      />
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </TableCell>
  );
}

export interface PriceCellProps {
  value: number;
  className?: string;
}

export function PriceCell({ value, className }: PriceCellProps) {
  return (
    <TableCell className={`text-left px-3 py-3 ${className}`}>
      <div className="flex flex-col items-start justify-center">
        <Currency
          value={value}
          useShortFormat={false}
          className="text-sm leading-5 text-white"
          maximumFractionDigits={value >= 1000 ? 2 : 3}
        />
      </div>
    </TableCell>
  );
}

export interface ChangeCellProps {
  change24h: number;
  changePercent24h: number;
  className?: string;
}

export function ChangeCell({ change24h, changePercent24h, className }: ChangeCellProps) {
  return (
    <TableCell className={`text-left px-3 py-3 ${className}`}>
      <div className="flex flex-col items-start justify-center">
        <span className="font-favorit text-sm leading-5">
          {formatChange(change24h, changePercent24h)}
        </span>
      </div>
    </TableCell>
  );
}

export interface VolumeCellProps {
  value: number;
  className?: string;
}

export function VolumeCell({ value, className }: VolumeCellProps) {
  return (
    <TableCell className={`text-left p-3 ${className}`}>
      <div className="flex flex-col items-start justify-center">
        <Currency
          value={value}
          useShortFormat={true}
          className="text-sm leading-5 text-white"
        />
      </div>
    </TableCell>
  );
}

export interface VolumeContentProps {
  value: number;
  className?: string;
}

export function VolumeContent({ value, className }: VolumeContentProps) {
  return (
    <Currency
      value={value}
      useShortFormat={true}
      className={`text-sm leading-5 text-white ${className || ''}`}
    />
  );
}

export interface DashCellProps {
  className?: string;
}

export function DashCell({ className }: DashCellProps) {
  return (
    <TableCell className={`text-left p-3 ${className}`}>
      <div className="flex flex-col items-start justify-center">
        <span className="font-favorit text-sm leading-5 text-[#b3b9be]">–</span>
      </div>
    </TableCell>
  );
}

export interface BadgeCellProps {
  pair: string;
  isScrolled: boolean;
  className?: string;
}

export function BadgeCell({ pair, isScrolled, className }: BadgeCellProps) {
  // Simple truncation: if 11 chars or longer, show only part before dash (max 10 chars)
  const getDisplayText = (pairString: string) => {
    const formattedPair = pairString.replace('/', '-');
    if (formattedPair.length >= 11) {
      const dashIndex = formattedPair.indexOf('-');
      if (dashIndex > 0) {
        return formattedPair.substring(0, Math.min(10, dashIndex));
      }
      return formattedPair.substring(0, 10);
    }
    return formattedPair;
  };

  return (
    <TableCell className={className}>
      {isScrolled && (
        <div className="flex items-center justify-center">
          <div className="bg-[#0A1E2D] border border-border rounded h-12 w-4 flex items-center justify-center overflow-hidden">
            <p 
              className="font-favorit text-[6px] text-white whitespace-pre -rotate-90 leading-[16px]"
              title={pair}
            >
              {getDisplayText(pair)}
            </p>
          </div>
        </div>
      )}
    </TableCell>
  );
}

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export interface TableLoadingStateProps {
  className?: string;
  rowCount?: number;
}

export function TableLoadingState({ className, rowCount = 8 }: TableLoadingStateProps) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={7} className={cn("p-3", className)}>
            <Skeleton className="h-12 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export interface TableEmptyStateProps {
  message?: string;
  className?: string;
}

export function TableEmptyState({ message = "No data available", className }: TableEmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={7} className={cn("text-center p-8", className)}>
        <div className="text-[#b3b9be] animate-in fade-in-0 duration-300">{message}</div>
      </TableCell>
    </TableRow>
  );
}

export interface TableErrorStateProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function TableErrorState({ message, onRetry, className }: TableErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 p-12 animate-in fade-in-0 duration-300", className)}>
      <div className="w-16 h-16 rounded-full bg-[#F34C68]/10 flex items-center justify-center">
        <span className="text-[#F34C68] text-2xl">⚠</span>
      </div>
      <div className="space-y-2 text-center">
        <h3 className="font-favorit text-xl text-white">Failed to load data</h3>
        <p className="text-sm text-[#b3b9be] max-w-md">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-[#F34C68] text-white rounded-lg hover:bg-[#F34C68]/90 transition-colors font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
