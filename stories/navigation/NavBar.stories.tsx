import type { Meta, StoryObj } from '@storybook/nextjs'
import { NavBar } from '@/components/navigation/nav-bar'

const meta = {
  title: 'Navigation/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Navigation bar component containing logo, navigation links, search, and user actions. Features dropdown menus and responsive design.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: { type: 'select' },
      options: ['solana', 'hyperliquid', 'rewards'],
      description: 'Currently active navigation tab'
    },
    searchTerm: {
      control: { type: 'text' },
      description: 'Search input value'
    },
    onSearchChange: {
      action: 'search changed',
      description: 'Search input change handler'
    }
  }
} satisfies Meta<typeof NavBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-full">
      <NavBar {...args} />
    </div>
  ),
  args: {
    activeTab: 'solana'
  }
}

export const HyperliquidActive: Story = {
  render: (args) => (
    <div className="w-full">
      <NavBar {...args} />
    </div>
  ),
  args: {
    activeTab: 'hyperliquid'
  }
}

export const RewardsActive: Story = {
  render: (args) => (
    <div className="w-full">
      <NavBar {...args} />
    </div>
  ),
  args: {
    activeTab: 'rewards'
  }
}

export const WithSearch: Story = {
  render: (args) => (
    <div className="w-full">
      <NavBar {...args} />
    </div>
  ),
  args: {
    activeTab: 'solana',
    searchTerm: 'PENGU'
  }
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <div>
        <h3 className="text-sm font-medium mb-2">Solana Active</h3>
        <div className="w-full">
          <NavBar activeTab="solana" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Hyperliquid Active</h3>
        <div className="w-full">
          <NavBar activeTab="hyperliquid" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Rewards Active</h3>
        <div className="w-full">
          <NavBar activeTab="rewards" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">With Search Term</h3>
        <div className="w-full">
          <NavBar activeTab="solana" searchTerm="BTC" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All navigation states and configurations'
      }
    }
  }
}