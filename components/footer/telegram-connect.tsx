import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TelegramIcon } from "@/components/icons/telegram"

export function TelegramConnect() {
  return (
    <Button variant="footer" asChild className="flex items-center gap-1 h-6 px-1.5 py-1 relative rounded hover:bg-accent/50 transition-colors">
      <Link href="https://t.me/BullpenFiBot/?start=connect_tg_code_null" target="_blank" rel="noopener noreferrer">
        <TelegramIcon className="shrink-0 size-3" />
        <span className="font-favorit leading-[0] not-italic relative shrink-0 text-foreground text-xs text-left text-nowrap">
          Connect Telegram
        </span>
      </Link>
    </Button>
  )
}