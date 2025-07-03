"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/components/icons/search"

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  searchTerm?: string
  onExpandChange?: (expanded: boolean) => void
}

export function SearchBar({ searchTerm, onExpandChange, ...props }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleToggle = () => {
    const newExpanded = !isExpanded
    setIsExpanded(newExpanded)
    onExpandChange?.(newExpanded)
    
    if (newExpanded) {
      // Focus the input when expanding
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsExpanded(false)
      onExpandChange?.(false)
    }
  }, [onExpandChange])

  React.useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isExpanded, handleClickOutside])

  return (
    <>
      {/* Desktop: Always show full search bar */}
      <div className="relative hidden lg:block">
        <Input
          ref={inputRef}
          leftIcon={<SearchIcon className="h-4 w-4 text-muted-foreground" />}
          placeholder="Search for a Token or CA"
          value={searchTerm}
          className="font-favorit text-sm leading-5 w-[214px] h-8 bg-background border border-border rounded text-white placeholder:text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:border-accent-foreground/20 hover:[&_svg]:text-accent-foreground focus:bg-accent focus:border-accent-foreground/20 focus:[&_svg]:text-accent-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          {...props}
        />
      </div>
      
      {/* Medium screens: Icon that expands to full search */}
      <div className="relative lg:hidden">
        {!isExpanded ? (
          <button
            onClick={handleToggle}
            className="flex items-center justify-center w-8 h-8 bg-background border border-border rounded text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:border-accent-foreground/20 hover:text-accent-foreground cursor-pointer"
          >
            <SearchIcon className="h-4 w-4 text-white hover:[&_svg]:text-accent-foreground" />
          </button>
        ) : (
          <Input
            ref={inputRef}
            leftIcon={<SearchIcon className="h-4 w-4 text-muted-foreground" />}
            placeholder="Search for a Token or CA"
            value={searchTerm}
            className="font-favorit text-sm leading-5 w-[214px] h-8 bg-background border border-border rounded text-white placeholder:text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:border-accent-foreground/20 hover:[&_svg]:text-accent-foreground focus:bg-accent focus:border-accent-foreground/20 focus:[&_svg]:text-accent-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            {...props}
          />
        )}
      </div>
    </>
  )
} 