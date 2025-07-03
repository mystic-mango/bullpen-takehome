import type { Meta, StoryObj } from '@storybook/nextjs'
import { Currency } from '@/components/display/currency'

const meta = {
  title: 'Display/Currency',
  component: Currency,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Currency formatting component that displays monetary values with customizable formatting options. Features italic dollar symbol and support for K/M/B notation.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'The numerical value to format'
    },
    currency: {
      control: { type: 'text' },
      description: 'Currency code (default: USD)'
    },
    showDecimals: {
      control: { type: 'boolean' },
      description: 'Whether to show decimal places'
    },
    useShortFormat: {
      control: { type: 'boolean' },
      description: 'Use short format (K, M, B, T)'
    },
    minimumFractionDigits: {
      control: { type: 'number', min: 0, max: 4 },
      description: 'Minimum decimal places'
    },
    maximumFractionDigits: {
      control: { type: 'number', min: 0, max: 4 },
      description: 'Maximum decimal places'
    }
  }
} satisfies Meta<typeof Currency>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 150.14
  }
}

export const ShortFormat: Story = {
  args: {
    value: 107400,
    useShortFormat: true,
    showDecimals: false
  }
}

export const LargeNumbers: Story = {
  args: {
    value: 1500000,
    useShortFormat: true,
    showDecimals: false
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="text-sm w-20">Thousands:</span>
        <Currency value={1500} useShortFormat showDecimals={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-20">Millions:</span>
        <Currency value={2500000} useShortFormat showDecimals={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-20">Billions:</span>
        <Currency value={1200000000} useShortFormat showDecimals={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-20">Trillions:</span>
        <Currency value={1500000000000} useShortFormat showDecimals={false} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of large number formatting with K, M, B, T notation'
      }
    }
  }
}