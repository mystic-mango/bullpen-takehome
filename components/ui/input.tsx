"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, ...props }, ref) => {
  return (
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-0 flex h-9 w-9 items-center justify-center text-muted-foreground">
            {leftIcon}
          </div>
        )}
    <input
      type={type}
      data-slot="input"
      className={cn(
            "flex h-10 w-full rounded-lg bg-[#163247] px-3 py-2 text-sm ring-offset-background transition-colors",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-9",
        className
      )}
          ref={ref}
      {...props}
    />
      </div>
  )
}
)

Input.displayName = "Input"

export { Input }
