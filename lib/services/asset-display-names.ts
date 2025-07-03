// Asset display name mapping service
// This service maps internal asset names to user-friendly display names

import { ASSET_REMAPPINGS, hasRemapping } from '../config/asset-remappings';

/**
 * Get the display name for an asset
 * First checks the explicit remappings, then falls back to pattern-based detection
 */
export function getAssetDisplayName(internalName: string): string {
  // Check explicit remappings first
  if (hasRemapping(internalName)) {
    return ASSET_REMAPPINGS[internalName];
  }
  
  // Pattern-based fallbacks for cases not in config
  // Remove single digit suffixes (e.g., TOKEN0 -> TOKEN, but only if not explicitly mapped)
  const withoutSuffix = internalName.replace(/[0-9]$/, '');
  if (withoutSuffix !== internalName && withoutSuffix.length > 1) {
    return withoutSuffix;
  }
  
  // Return original name if no mapping found
  return internalName;
}

/**
 * Get all configured remappings
 */
export function getAllRemappings(): Record<string, string> {
  return { ...ASSET_REMAPPINGS };
}

/**
 * Check if an asset has a display name mapping
 */
export function hasDisplayMapping(internalName: string): boolean {
  return hasRemapping(internalName) || getAssetDisplayName(internalName) !== internalName;
} 