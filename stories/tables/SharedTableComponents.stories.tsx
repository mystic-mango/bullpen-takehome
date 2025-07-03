import type { Meta, StoryObj } from '@storybook/nextjs'
import {
  SortableHeader,
  TokenCell,
  PriceCell,
  VolumeCell,
  DashCell,
  BadgeCell,
  formatChange,
} from '@/components/tables/shared-table-components'
import { Table, TableBody, TableHeader, TableRow, TableCell } from '@/components/ui/table'

const meta = {
  title: 'Tables/SharedTableComponents',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Reusable table components used across perp and spot tables. Includes sortable headers, formatted cells, responsive utilities, and loading/empty states.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Mock sort config for examples
const mockSortConfig = {
  key: 'lastPrice' as const,
  direction: 'desc' as const,
}

export const SortableHeaders: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHeader 
            sortKey="token" 
            currentSort={mockSortConfig} 
            onSort={() => {}} 
            className="w-[200px] text-left"
          >
            Token
          </SortableHeader>
          <SortableHeader 
            sortKey="lastPrice" 
            currentSort={mockSortConfig} 
            onSort={() => {}} 
            className="w-[140px] text-right"
          >
            Last Price
          </SortableHeader>
          <SortableHeader 
            sortKey="change24h" 
            currentSort={mockSortConfig} 
            onSort={() => {}} 
            className="w-[140px] text-right"
          >
            24h Change
          </SortableHeader>
        </TableRow>
      </TableHeader>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sortable table headers with active sort indicators and reserved space for arrows.',
      },
    },
  },
}

export const LoadingState: Story = {
  render: () => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={6} className="text-center p-8">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent"></div>
              <span className="text-[#b3b9be]">Loading markets...</span>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner animation and message.',
      },
    },
  },
}

export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={6} className="text-center p-8">
            <div className="text-[#b3b9be]">No markets available</div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no data is available.',
      },
    },
  },
}

export const ErrorState: Story = {
  render: () => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={6} className="text-center p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F34C68]/10 flex items-center justify-center">
                <span className="text-[#F34C68] text-xl">⚠</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-favorit text-lg text-white">Failed to load markets</h3>
                <p className="text-sm text-[#b3b9be]">Unable to connect to API. Please check your connection and try again.</p>
              </div>
              <button 
                onClick={() => {}}
                className="px-4 py-2 bg-[#F34C68] text-white rounded-lg hover:bg-[#F34C68]/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error state with retry button.',
      },
    },
  },
}

export const TokenCells: Story = {
  render: () => (
    <Table>
      <TableBody>
        <TableRow>
          <TokenCell
            iconSrc="https://app.hyperliquid.xyz/coins/BTC.svg"
            token="BTC"
            pair="BTC/USDC"
            badge={{ text: "50x", variant: "leverage" }}
            className="w-[240px]"
          />
        </TableRow>
        <TableRow>
          <TokenCell
            iconSrc="https://app.hyperliquid.xyz/coins/SOL.svg"
            token="SOL"
            pair="SOL/USDC"
            badge={{ text: "SPOT", variant: "spot" }}
            showSocialLinks={true}
            socialLinks={{
              twitter: "https://twitter.com/solana",
              telegram: "https://t.me/solana",
              website: "https://solana.com"
            }}
            contractAddress="So11111111111111111111111111111111111111112"
            className="w-[240px]"
          />
        </TableRow>
        <TableRow>
          <TokenCell
            iconSrc="https://app.hyperliquid.xyz/coins/HYPE.svg"
            token="HYPE"
            pair="HYPE/USD"
            badge={{ text: "SPOT", variant: "spot" }}
            showSocialLinks={true}
            contractAddress="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
            className="w-[240px]"
          />
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Token cells showing different configurations: leverage badges, spot badges, social links, and contract addresses.',
      },
    },
  },
}

export const PriceCells: Story = {
  render: () => (
    <Table>
      <TableBody>
        <TableRow>
          <PriceCell value={45234.56} className="w-[140px]" />
          <PriceCell value={2834.67} className="w-[140px]" />
          <PriceCell value={98.45} className="w-[140px]" />
          <PriceCell value={1.0001} className="w-[140px]" />
          <PriceCell value={0.0234} className="w-[140px]" />
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Price cells showing different value ranges with appropriate decimal precision.',
      },
    },
  },
}


export const VolumeCells: Story = {
  render: () => (
    <Table>
      <TableBody>
        <TableRow>
          <VolumeCell value={1250000000} className="w-[120px]" />
          <VolumeCell value={854000000} className="w-[120px]" />
          <VolumeCell value={432000000} className="w-[120px]" />
          <VolumeCell value={1500000} className="w-[120px]" />
          <VolumeCell value={25000} className="w-[120px]" />
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Volume cells with automatic formatting using short format (K, M, B suffixes).',
      },
    },
  },
}



export const BadgeCells: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-white mb-2">Badge Cell - Not Scrolled</h4>
        <Table>
          <TableBody>
            <TableRow>
              <BadgeCell 
                pair="BTC/USDC" 
                isScrolled={false} 
                className="text-left p-0 transition-all duration-150 sticky left-0 bg-background z-20 overflow-hidden" 
              />
              <TableCell className="text-white">Badge is hidden when not scrolled</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-white mb-2">Badge Cell - Scrolled (Visible)</h4>
        <Table>
          <TableBody>
            <TableRow>
              <BadgeCell 
                pair="BTC/USDC" 
                isScrolled={true} 
                className="text-left p-0 transition-all duration-150 sticky left-0 bg-background z-20 overflow-hidden" 
              />
              <TableCell className="text-white">Short pair name</TableCell>
            </TableRow>
            <TableRow>
              <BadgeCell 
                pair="ETHEREUM/USDC" 
                isScrolled={true} 
                className="text-left p-0 transition-all duration-150 sticky left-0 bg-background z-20 overflow-hidden" 
              />
              <TableCell className="text-white">Medium pair name</TableCell>
            </TableRow>
            <TableRow>
              <BadgeCell 
                pair="MOODENG/USD" 
                isScrolled={true} 
                className="text-left p-0 transition-all duration-150 sticky left-0 bg-background z-20 overflow-hidden" 
              />
              <TableCell className="text-white">11 chars - shows MOODENG</TableCell>
            </TableRow>
            <TableRow>
              <BadgeCell 
                pair="VERYLONGTOKEN/USDC" 
                isScrolled={true} 
                className="text-left p-0 transition-all duration-150 sticky left-0 bg-background z-20 overflow-hidden" 
              />
              <TableCell className="text-white">Long pair - truncated to first part</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge cells that appear on horizontal scroll with smart text truncation for long pair names.',
      },
    },
  },
}

export const UtilityComponents: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-white mb-2">Dash Cell (No Data)</h4>
        <Table>
          <TableBody>
            <TableRow>
              <DashCell className="w-[120px]" />
              <DashCell className="w-[120px]" />
              <DashCell className="w-[120px]" />
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-white mb-2">Formatting Functions</h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">formatChange(234.56, 2.34): </span>
            {formatChange(234.56, 2.34)}
          </div>
          <div>
            <span className="text-muted-foreground">formatChange(-123.45, -1.23): </span>
            {formatChange(-123.45, -1.23)}
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Utility components and formatting functions used throughout the table system.',
      },
    },
  },
}