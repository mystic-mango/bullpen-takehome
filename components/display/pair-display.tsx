import React from 'react';

interface PairDisplayProps {
  pair: string;  // Expected format: "BTC/USDC"
  className?: string;
}

/**
 * Formats trading pairs for display
 * Converts forward slash format (BTC/USDC) to hyphenated format (BTC-USDC)
 */
export function PairDisplay({ pair, className = '' }: PairDisplayProps) {
  const displayPair = pair.replace('/', '-');
  
  return (
    <span className={className}>
      {displayPair}
    </span>
  );
}

/**
 * Utility function to format pair strings without the React component
 * Use this in places where you need the formatted string but not a React component
 */
export function formatPairForDisplay(pair: string): string {
  return pair.replace('/', '-');
} 