"use client"

import { usePathname } from "next/navigation"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/footer/footer"
import { MobileNavigation } from "@/components/navigation/mobile-navigation"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    if (pathname === "/") {
      return "hyperliquid"
    }
    // Add more route mappings here as needed
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#06121b]">
      {/* Fixed header - hidden on mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <NavBar activeTab={getActiveTab()}/>
      </div>
      
      {/* Main content - responsive margins */}
      <main className="flex-1 md:mt-[57px] md:mb-[34px] mb-14 overflow-auto">
        {children}
      </main>

      {/* Fixed footer - hidden on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 hidden md:block">
        <Footer />
      </div>

      {/* Mobile navigation - visible only on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <MobileNavigation />
      </div>
    </div>
  )
}