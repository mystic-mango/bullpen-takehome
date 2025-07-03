import type { Meta, StoryObj } from '@storybook/nextjs'
import { WalletBalance } from '@/components/navigation/wallet-balance'

const meta: Meta<typeof WalletBalance> = {
  title: 'Navigation/WalletBalance',
  component: WalletBalance,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    usdcBalance: {
      control: 'number',
      description: 'USDC balance amount',
    },
    hlBalance: {
      control: 'number',
      description: 'Hyperliquid token balance amount',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    usdcBalance: 1250.75,
    hlBalance: 150.0,
  },
}

export const ZeroBalance: Story = {
  args: {
    usdcBalance: 0,
    hlBalance: 0,
  },
}

export const LargeBalances: Story = {
  args: {
    usdcBalance: 125000.50,
    hlBalance: 15000.25,
  },
}

export const SmallBalances: Story = {
  args: {
    usdcBalance: 0.01,
    hlBalance: 0.05,
  },
}

export const OnlyUSDC: Story = {
  args: {
    usdcBalance: 500.0,
    hlBalance: 0,
  },
}

export const OnlyHL: Story = {
  args: {
    usdcBalance: 0,
    hlBalance: 75.5,
  },
}

export const InNavBar: Story = {
  render: () => (
    <div className="bg-background border-b border-border p-4">
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground">Other nav items...</span>
        <WalletBalance usdcBalance={1250.75} hlBalance={150.0} />
        <span className="text-muted-foreground">More items...</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wallet balance as it appears in the navigation bar context.',
      },
    },
  },
}

export const VariousAmounts: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white">Different Balance Scenarios</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-20">Empty:</span>
            <WalletBalance usdcBalance={0} hlBalance={0} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-20">Small:</span>
            <WalletBalance usdcBalance={12.34} hlBalance={5.67} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-20">Medium:</span>
            <WalletBalance usdcBalance={1250.75} hlBalance={150.0} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-20">Large:</span>
            <WalletBalance usdcBalance={125000.50} hlBalance={15000.25} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different balance amounts to show formatting behavior.',
      },
    },
  },
}