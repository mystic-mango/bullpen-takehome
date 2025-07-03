"use client"

import * as React from "react"
import { Logo } from "@/components/display/logo"
import { NavLink } from "@/components/navigation/nav-link"
import { NavButton } from "@/components/navigation/nav-button"
import { SearchBar } from "@/components/navigation/search-bar"
import { WalletBalance } from "@/components/navigation/wallet-balance"
import { ChevronDownIcon } from "@/components/icons/chevron-down"
import { StarIcon } from "@/components/icons/star"
import { DownloadIcon } from "@/components/icons/download"
import { BellIcon } from "@/components/icons/bell"
import { SettingsIcon } from "@/components/icons/settings"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavBarProps {
  activeTab?: "solana" | "hyperliquid" | "rewards" | "home"
  searchTerm?: string
  onSearchChange?: (value: string) => void
}

export function NavBar({ activeTab, searchTerm, onSearchChange }: NavBarProps) {
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false)

  return (
    <div className="relative w-full bg-background h-16">
      <div className="absolute flex items-center gap-6 left-0 right-0 px-3 py-0 top-3">
        <div className="flex-shrink-0">
          <Logo />
        </div>
        <div className="flex h-8 items-center justify-between flex-1 min-w-0">
          <div className={`flex items-center gap-[131px] transition-opacity duration-200 ${isSearchExpanded ? 'lg:flex hidden' : 'flex'}`}>
            <div className="flex items-center gap-4">
              <NavLink active={activeTab === "solana"}>Solana</NavLink>
              <NavLink active={activeTab === "hyperliquid"}>Hyperliquid</NavLink>
              {/* Desktop: Show Rewards as separate link */}
              <NavLink active={activeTab === "rewards"} className="hidden lg:flex">Rewards</NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <NavLink icon={<ChevronDownIcon className="h-4 w-4" />}>More</NavLink>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-background border-border rounded">
                  {/* Medium screens: Show Rewards in dropdown */}
                  <DropdownMenuItem className="text-muted-foreground hover:text-white transition-colors cursor-pointer lg:hidden">
                    Rewards
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground hover:text-white transition-colors cursor-pointer">
                    Vaults
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground hover:text-white transition-colors cursor-pointer">
                    Funding Rate Comparison
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground hover:text-white transition-colors cursor-pointer">
                    Docs
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground hover:text-white transition-colors cursor-pointer">
                    Stats
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground hover:text-white transition-colors cursor-pointer">
                    Announcements
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center gap-[9px]">
            <SearchBar
              searchTerm={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onExpandChange={setIsSearchExpanded}
            />
            <div className={`flex items-center gap-2 transition-opacity duration-200 ${isSearchExpanded ? 'lg:flex hidden' : 'flex'}`}>
              <NavButton>
                <StarIcon className="h-4 w-4" />
              </NavButton>
              <NavButton variant="text">
                <DownloadIcon className="h-4 w-4" />
                Fund
              </NavButton>
              <WalletBalance usdcBalance={0} hlBalance={0} />
              <NavButton>
                <BellIcon className="h-4 w-4" />
              </NavButton>
              <NavButton>
                <SettingsIcon className="h-4 w-4" />
              </NavButton>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-0 left-0 right-0 top-16">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px] bg-border"></div>
      </div>
    </div>
  )
} 