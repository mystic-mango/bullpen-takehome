"use client";

import * as React from "react";
import { LiveIndicator } from "@/components/display/live-indicator";
import { PriceIndicators } from "./price-indicators";
import { TokenSwap } from "./token-swap";
import { TelegramConnect } from "./telegram-connect";
import { FooterLinks } from "./footer-links";
import { SocialLinks } from "./social-links";
import { useWebSocketStatus } from "@/lib/hooks/use-websocket-status";

export function Footer() {
  const { isLive, status } = useWebSocketStatus();

  return (
    <div className="border-border h-[34px] w-full items-center justify-between border-t px-3 mt-auto hidden md:flex bg-background">
      <div className="flex items-center gap-2">
        <LiveIndicator
          isLive={isLive}
          isInitializing={status === "connecting"}
        />
        <PriceIndicators />
        <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
          <div className="flex-none rotate-[90deg]">
            <div className="h-0 relative w-[22px]">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px] bg-border"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 h-6">
          <div className="flex items-center gap-2 h-5">
            <div className="hidden lg:block">
              <TokenSwap />
            </div>
            <TelegramConnect />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <FooterLinks />
        <SocialLinks />
      </div>
    </div>
  );
}
