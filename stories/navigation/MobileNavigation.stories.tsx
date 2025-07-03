import type { Meta, StoryObj } from '@storybook/nextjs'
import { MobileNavigation } from '@/components/navigation/mobile-navigation'

const meta: Meta<typeof MobileNavigation> = {
  title: 'Navigation/MobileNavigation',
  component: MobileNavigation,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="h-screen bg-background">
      <div className="flex flex-col h-full">
        <div className="flex-1 p-4">
          <h2 className="text-xl font-semibold text-white mb-4">Mobile Layout</h2>
          <p className="text-muted-foreground">
            This demonstrates how the mobile navigation appears at the bottom of the screen.
            The navigation automatically activates based on the current route.
          </p>
        </div>
        <MobileNavigation />
      </div>
    </div>
  ),
}

export const WithContent: Story = {
  render: () => (
    <div className="h-screen bg-background">
      <div className="flex flex-col h-full">
        <div className="flex-1 p-4 overflow-auto">
          <h2 className="text-xl font-semibold text-white mb-4">Trading Dashboard</h2>
          <div className="space-y-4">
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Portfolio</h3>
              <p className="text-muted-foreground">Your trading portfolio overview</p>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Markets</h3>
              <p className="text-muted-foreground">Live market data and prices</p>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Recent Trades</h3>
              <p className="text-muted-foreground">Your recent trading activity</p>
            </div>
          </div>
        </div>
        <MobileNavigation />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile navigation with content showing how it sits at the bottom of the screen.',
      },
    },
  },
}

export const TabletView: Story = {
  render: () => (
    <div className="h-screen bg-background">
      <div className="flex flex-col h-full">
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Tablet Layout</h2>
          <p className="text-muted-foreground mb-6">
            On medium screens (md to lg), the mobile navigation is shown instead of the desktop navbar.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Solana</h3>
              <p className="text-muted-foreground">Solana ecosystem trading</p>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Hyperliquid</h3>
              <p className="text-muted-foreground">Perpetuals and spot trading</p>
            </div>
          </div>
        </div>
        <MobileNavigation />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'How the mobile navigation appears on tablet devices.',
      },
    },
  },
}

export const NavigationStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Navigation Icons & Labels</h3>
        <div className="bg-card p-4 rounded-lg">
          <div className="grid grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-white mb-1">📊</div>
              <span className="text-xs text-muted-foreground">Solana</span>
            </div>
            <div>
              <div className="text-white mb-1">📈</div>
              <span className="text-xs text-muted-foreground">Perps</span>
            </div>
            <div>
              <div className="text-white mb-1">🔍</div>
              <span className="text-xs text-muted-foreground">Search</span>
            </div>
            <div>
              <div className="text-white mb-1">👛</div>
              <span className="text-xs text-muted-foreground">Wallet</span>
            </div>
            <div>
              <div className="text-white mb-1">🎁</div>
              <span className="text-xs text-muted-foreground">Rewards</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-24">
        <MobileNavigation />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Shows the navigation items and their corresponding icons.',
      },
    },
  },
}