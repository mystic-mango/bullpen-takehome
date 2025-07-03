"use client"

import * as React from "react"
import Image from "next/image"

interface TokenIconProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  backgroundColor?: string
}

export function TokenIcon({ src, alt, width = 24, height = 24, className, backgroundColor }: TokenIconProps) {
  const [imgSrc, setImgSrc] = React.useState(src)
  const [hasError, setHasError] = React.useState(false)

  const handleError = React.useCallback(() => {
    if (!hasError) {
      // Only log in development to avoid console spam
      if (process.env.NODE_ENV === 'development') {
        console.log(`⚠️ Failed to load token icon: ${src}, using fallback coin_icon.svg`)
      }
      setHasError(true)
      setImgSrc('/coin_icon.svg')
    }
  }, [src, hasError])

  // Reset error state when src changes
  React.useEffect(() => {
    setImgSrc(src)
    setHasError(false)
  }, [src])

  // Apply default background if no custom className with background is provided
  const finalClassName = backgroundColor 
    ? `${className || ''} ${backgroundColor}`.trim()
    : className?.includes('bg-') 
      ? className 
      : `${className || ''} bg-[#2C4A60]`.trim()

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={finalClassName}
      onError={handleError}
      // Remove the onLoad logging to reduce console noise
    />
  )
}