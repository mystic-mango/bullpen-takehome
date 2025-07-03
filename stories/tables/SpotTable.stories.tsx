import type { Meta, StoryObj } from '@storybook/nextjs'
import { SpotTable } from '@/components/tables/spot-table'

const meta = {
  title: 'Tables/SpotTable',
  component: SpotTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Spot trading table showing real tokens with instant settlement. Features social links, contract address copying, and market cap data.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpotTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default spot trading table with live data from Hyperliquid API. Shows USDC pairs with social links and contract addresses.',
      },
    },
  },
}

export const Loading: Story = {
  args: {
    forceLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state of the spot trading table.',
      },
    },
  },
}

export const ErrorState: Story = {
  args: {
    forceError: new Error('Unable to connect to Hyperliquid API. Please check your connection and try again.'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state of the spot trading table with retry functionality.',
      },
    },
  },
}

export const EmptyState: Story = {
  args: {
    forceEmpty: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no spot markets are available.',
      },
    },
  },
}

export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-optimized view showing only Token, Last Price, and 24h Change columns. Badges wrap below token names for space efficiency.',
      },
    },
  },
}

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet view with horizontal scrolling when all columns are visible.',
      },
    },
  },
}

export const WithDescription: Story = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Spot Trading Markets</h2>
        <p className="text-muted-foreground mb-4">
          Trade real tokens with instant settlement. Each token includes social links and 
          contract addresses for easy access to additional information.
        </p>
      </div>
      <SpotTable />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spot trading table with contextual description showing how it might appear in the application.',
      },
    },
  },
}

export const Features: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Key Features</h3>
        <ul className="text-muted-foreground space-y-1 text-sm">
          <li>• Social media links (Twitter, Telegram, Website)</li>
          <li>• Contract address copying with one click</li>
          <li>• Market cap and circulating supply data</li>
          <li>• Responsive design for mobile and desktop</li>
          <li>• Real-time price updates via WebSocket</li>
          <li>• Sortable columns with visual indicators</li>
        </ul>
      </div>
      <SpotTable />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spot table with feature highlights showing the additional functionality available.',
      },
    },
  },
}