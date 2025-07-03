import * as React from "react"
import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="relative h-10 w-[136px]">
      <Image
        src="/bullpen-logo.svg"
        alt="Bullpen"
        width={136}
        height={40}
        className="h-10 w-[136px]"
      />
    </Link>
  )
} 