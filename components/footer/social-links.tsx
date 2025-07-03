import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DiscordIcon } from "@/components/icons/discord"
import { TwitterIcon } from "@/components/icons/twitter"

export function SocialLinks() {
  return (
    <div className="flex items-center">
      <Button variant="footer" asChild className="flex items-center justify-center px-1.5 py-2 relative rounded shrink-0 size-6 hover:bg-accent/50">
        <Link href="https://discord.gg/bullpen" target="_blank" rel="noopener noreferrer">
          <DiscordIcon className="shrink-0 size-3" />
        </Link>
      </Button>
      <Button variant="footer" asChild className="flex items-center justify-center px-1.5 py-2 relative rounded shrink-0 size-6 hover:bg-accent/50">
        <Link href="https://x.com/BullpenFi" target="_blank" rel="noopener noreferrer">
          <TwitterIcon className="shrink-0 size-3" />
        </Link>
      </Button>
    </div>
  )
}