"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { BarChartIcon } from "@/components/icons/bar-chart"
import { PerpsIcon } from "@/components/icons/perps"
import { SearchIcon } from "@/components/icons/search"
import { Wallet2Icon } from "@/components/icons/wallet2"
import { GiftIcon } from "@/components/icons/gift"

interface MobileNavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}

function MobileNavItem({ icon, label, href, active = false }: MobileNavItemProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center h-14 flex-1 gap-1 p-2"
    >
      <div className={`w-5 h-5 ${active ? 'text-primary' : 'text-foreground'}`}>
        {icon}
      </div>
      <span className={`font-favorit text-[12px] leading-4 ${active ? 'text-primary' : 'text-foreground'}`}>
        {label}
      </span>
    </Link>
  )
}

function MobileNavigationContent() {
  const pathname = usePathname()
  
  // Determine active state based on current route
  const getActiveState = () => {
    if (pathname === '/search') return 'search'
    if (pathname === '/wallet') return 'wallet' 
    if (pathname === '/rewards') return 'rewards'
    if (pathname === '/solana') return 'solana'
    // Default to 'perps' for the main trading page
    return 'perps'
  }
  
  const activeState = getActiveState()

  return (
    <div className="backdrop-blur-[2px] bg-background border-t border-muted h-14 flex items-center justify-center px-6">
      <div className="flex w-full items-center justify-between">
        <MobileNavItem
          icon={<BarChartIcon />}
          label="Solana"
          href="/solana"
          active={activeState === 'solana'}
        />
        <MobileNavItem
          icon={<PerpsIcon />}
          label="Perps"
          href="/"
          active={activeState === 'perps'}
        />
        <MobileNavItem
          icon={<SearchIcon />}
          label="Search"
          href="/search"
          active={activeState === 'search'}
        />
        <MobileNavItem
          icon={<Wallet2Icon />}
          label="Wallet"
          href="/wallet"
          active={activeState === 'wallet'}
        />
        <MobileNavItem
          icon={<GiftIcon />}
          label="Rewards"
          href="/rewards"
          active={activeState === 'rewards'}
        />
      </div>
    </div>
  )
}

export function MobileNavigation() {
  return (
    <Suspense fallback={
      <div className="backdrop-blur-[2px] bg-background border-t border-muted h-14 flex items-center justify-center px-6">
        <div className="flex w-full items-center justify-between">
          {/* Fallback navigation items without active state */}
          <MobileNavItem icon={<BarChartIcon />} label="Solana" href="/solana" />
          <MobileNavItem icon={<PerpsIcon />} label="Perps" href="/" />
          <MobileNavItem icon={<SearchIcon />} label="Search" href="/search" />
          <MobileNavItem icon={<Wallet2Icon />} label="Wallet" href="/wallet" />
          <MobileNavItem icon={<GiftIcon />} label="Rewards" href="/rewards" />
        </div>
      </div>
    }>
      <MobileNavigationContent />
    </Suspense>
  )
}