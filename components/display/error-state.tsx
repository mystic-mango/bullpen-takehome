"use client"

import * as React from "react"

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

export function ErrorState({ 
  title = "Something went wrong",
  message, 
  onRetry, 
  retryLabel = "Try again",
  className = ""
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="flex flex-col items-center gap-4 max-w-md">
        {/* Error Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F34C68]/10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#F34C68]"
          >
            <path
              d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Error Text */}
        <div className="space-y-2">
          <h3 className="font-favorit font-medium text-lg text-white">
            {title}
          </h3>
          <p className="font-favorit text-sm text-[#b3b9be] leading-relaxed">
            {message}
          </p>
        </div>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2C4A60] text-white hover:bg-[#2C4A60]/80 transition-colors font-favorit text-sm font-medium"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M13.65 2.35C12.2 0.9 10.21 0 8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C11.73 16 14.84 13.45 15.73 10H13.65C12.83 12.33 10.61 14 8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C9.66 2 11.14 2.69 12.22 3.78L9 7H16V0L13.65 2.35Z"
                fill="currentColor"
              />
            </svg>
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  )
}

// Specific error state for tables
export function TableErrorState({ 
  message, 
  onRetry, 
  colSpan = 6 
}: { 
  message: string
  onRetry?: () => void
  colSpan?: number 
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-0">
        <ErrorState
          title="Failed to load data"
          message={message}
          onRetry={onRetry}
          retryLabel="Retry"
          className="py-12"
        />
      </td>
    </tr>
  )
}