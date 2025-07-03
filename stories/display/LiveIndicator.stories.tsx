import type { Meta, StoryObj } from '@storybook/nextjs'
import { LiveIndicator } from '@/components/display/live-indicator'

const meta = {
  title: 'Display/LiveIndicator',
  component: LiveIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Live status indicator component that shows whether data is live or stale. Features animated pulse effect for live state.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isLive: {
      control: { type: 'boolean' },
      description: 'Whether the data is live or stale'
    },
    isInitializing: {
      control: { type: 'boolean' },
      description: 'Whether the component is in initializing state'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
} satisfies Meta<typeof LiveIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Live: Story = {
  args: {
    isLive: true
  }
}

export const Stale: Story = {
  args: {
    isLive: false
  }
}

export const Initializing: Story = {
  args: {
    isLive: true,
    isInitializing: true
  }
}

export const Comparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm w-16">Initializing:</span>
        <LiveIndicator isLive={true} isInitializing={true} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-16">Live:</span>
        <LiveIndicator isLive={true} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-16">Stale:</span>
        <LiveIndicator isLive={false} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of live and stale states'
      }
    }
  }
}

export const InFooter: Story = {
  render: () => (
    <div className="bg-background border-t border-border p-3 flex items-center gap-2">
      <LiveIndicator isLive={true} />
      <span className="text-xs text-muted-foreground">Data stream status</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Live indicator as it appears in the footer context'
      }
    }
  }
}

export const CustomStyling: Story = {
  args: {
    isLive: true,
    className: 'scale-125'
  },
  parameters: {
    docs: {
      description: {
        story: 'Live indicator with custom scaling'
      }
    }
  }
}