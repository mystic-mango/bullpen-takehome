import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bullpen",
  description: "Crypto trading platform",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-favorit">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}