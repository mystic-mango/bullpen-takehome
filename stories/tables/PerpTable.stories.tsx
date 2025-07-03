import type { Meta, StoryObj } from '@storybook/nextjs'
import { PerpTable } from '@/components/tables/perp-table'

const meta = {
  title: 'Tables/PerpTable',
  component: PerpTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Perpetual futures trading table showing markets with real-time data including prices, changes, volume, funding rates, and open interest.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PerpTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default perpetual futures table with live data from Hyperliquid API. Features sorting, responsive design, and mobile-optimized layout.',
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
        story: 'Loading state of the perpetual futures table with spinner animation.',
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
        story: 'Error state of the perpetual futures table with retry functionality.',
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
        story: 'Empty state when no perpetual markets are available.',
      },
    },
  },
}
