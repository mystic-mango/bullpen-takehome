import * as React from "react"
import { cn } from "@/lib/utils"

interface NavLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  icon?: React.ReactNode
}

export function NavLink({ children, className, active, icon, ...props }: NavLinkProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 px-0 py-2 text-base font-favorit font-normal cursor-pointer leading-6",
        "text-muted-foreground hover:text-white transition-colors",
        active && "text-white",
        className
      )}
      {...props}
    >
      {children}
      {icon}
    </div>
  )
} 