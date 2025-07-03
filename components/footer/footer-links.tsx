import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function Divider() {
  return (
    <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
      <div className="flex-none rotate-[90deg]">
        <div className="h-0 relative w-[22px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px] bg-border"></div>
        </div>
      </div>
    </div>
  )
}

export function FooterLinks() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="footer" asChild className="flex-col justify-center p-0">
        <Link href="/support" target="_blank" rel="noopener noreferrer">
          Support
        </Link>
      </Button>
      <Button variant="footer" asChild className="flex-col justify-center p-0">
        <Link href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy
        </Link>
      </Button>
      <Button variant="footer" asChild className="flex-col justify-center p-0">
        <Link href="/terms" target="_blank" rel="noopener noreferrer">
          Terms
        </Link>
      </Button>
      <Button variant="footer" asChild className="flex-col justify-center p-0">
        <Link href="/docs" target="_blank" rel="noopener noreferrer">
          Docs
        </Link>
      </Button>
      <Divider />
    </div>
  )
}