import type { Meta, StoryObj } from '@storybook/nextjs'
import { PairDisplay } from '@/components/display/pair-display'

const meta: Meta<typeof PairDisplay> = {
  title: 'Display/PairDisplay',
  component: PairDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    pair: {
      control: 'text',
      description: 'Trading pair string to display',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    pair: 'BTC/USDC',
  },
}

export const Bitcoin: Story = {
  args: {
    pair: 'BTC/USDC',
  },
}

export const Ethereum: Story = {
  args: {
    pair: 'ETH/USDC',
  },
}

export const Solana: Story = {
  args: {
    pair: 'SOL/USDC',
  },
}

export const PerpetualFutures: Story = {
  args: {
    pair: 'BTC-USDC',
  },
  parameters: {
    docs: {
      description: {
        story: 'Perpetual futures use dash separator instead of slash.',
      },
    },
  },
}

export const LongPairName: Story = {
  args: {
    pair: 'AVAX/USDC',
  },
}

export const CustomPair: Story = {
  args: {
    pair: 'CUSTOM/TOKEN',
  },
}

export const InTable: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
          B
        </div>
        <PairDisplay pair="BTC/USDC" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
          E
        </div>
        <PairDisplay pair="ETH/USDC" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
          S
        </div>
        <PairDisplay pair="SOL/USDC" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'How PairDisplay appears in a table context with token icons.',
      },
    },
  },
}