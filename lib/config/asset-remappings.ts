/**
 * Asset Name Remapping Configuration
 * 
 * This file defines how internal asset names from the Hyperliquid API
 * should be displayed to users in the UI.
*
 * Example: 'UBTC': 'BTC' means UBTC will display as BTC
 * 
 * TODO: Automate remappings with scraping / api feed
 */

export const ASSET_REMAPPINGS = {
  // Bitcoin variants
  'UBTC': 'BTC',
  'UETH': 'ETH',
  'USOL': 'SOL',
  'XAUT0': 'XAUT',
  'UFART': 'FART',
    // Format: 'INTERNAL_NAME': 'DISPLAY_NAME'
  
} as const;

/**
 * Type for the remapping keys (internal names)
 */
export type InternalAssetName = keyof typeof ASSET_REMAPPINGS;

/**
 * Type for the remapping values (display names)
 */
export type DisplayAssetName = typeof ASSET_REMAPPINGS[InternalAssetName];

/**
 * Helper function to check if an asset has a remapping
 */
export function hasRemapping(internalName: string): internalName is InternalAssetName {
  return internalName in ASSET_REMAPPINGS;
}

/**
 * Get all remappings as a plain object
 */
export function getAllRemappings(): Record<string, string> {
  return { ...ASSET_REMAPPINGS };
} 