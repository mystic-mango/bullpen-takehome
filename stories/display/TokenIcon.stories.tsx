import type { Meta, StoryObj } from '@storybook/nextjs'
import { TokenIcon } from '@/components/display/token-icon'

const meta: Meta<typeof TokenIcon> = {
  title: 'Display/TokenIcon',
  component: TokenIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL of the token icon image',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the icon',
    },
    width: {
      control: 'number',
      description: 'Width of the icon',
    },
    height: {
      control: 'number',
      description: 'Height of the icon',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://app.hyperliquid.xyz/coins/BTC.svg',
    alt: 'Bitcoin',
    width: 36,
    height: 36,
    className: 'rounded-full',
  },
}

export const Bitcoin: Story = {
  args: {
    src: 'https://app.hyperliquid.xyz/coins/BTC.svg',
    alt: 'Bitcoin',
    width: 36,
    height: 36,
    className: 'rounded-full',
  },
}

export const Solana: Story = {
  args: {
    src: 'https://app.hyperliquid.xyz/coins/SOL.svg',
    alt: 'Solana',
    width: 36,
    height: 36,
    className: 'rounded-full',
  },
}

export const Hyperliquid: Story = {
  args: {
    src: 'https://app.hyperliquid.xyz/coins/HYPE.svg',
    alt: 'Hyperliquid',
    width: 36,
    height: 36,
    className: 'rounded-full',
  },
}

export const InvalidIcon: Story = {
  args: {
    src: '/invalid-icon.svg',
    alt: 'Unknown Token',
    width: 36,
    height: 36,
    className: 'rounded-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows fallback behavior when token icon fails to load.',
      },
    },
  },
}

export const SmallSize: Story = {
  args: {
    src: 'https://app.hyperliquid.xyz/coins/BTC.svg',
    alt: 'Bitcoin',
    width: 20,
    height: 20,
    className: 'rounded-full',
  },
}

export const LargeSize: Story = {
  args: {
    src: 'https://app.hyperliquid.xyz/coins/BTC.svg',
    alt: 'Bitcoin',
    width: 64,
    height: 64,
    className: 'rounded-full',
  },
}

export const AllTokens: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col items-center gap-2">
        <TokenIcon src="https://app.hyperliquid.xyz/coins/BTC.svg" alt="Bitcoin" width={36} height={36} className="rounded-full" />
        <span className="text-sm text-muted-foreground">BTC</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <TokenIcon src="https://app.hyperliquid.xyz/coins/SOL.svg" alt="Solana" width={36} height={36} className="rounded-full" />
        <span className="text-sm text-muted-foreground">SOL</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <TokenIcon src="https://app.hyperliquid.xyz/coins/HYPE.svg" alt="Hyperliquid" width={36} height={36} className="rounded-full" />
        <span className="text-sm text-muted-foreground">HYPE</span>
      </div>
   
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gallery of all available token icons.',
      },
    },
  },
}