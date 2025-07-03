import type { Meta, StoryObj } from '@storybook/nextjs'
import { SearchBar } from '@/components/navigation/search-bar'
import { useState } from 'react'

const meta: Meta<typeof SearchBar> = {
  title: 'Navigation/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    searchTerm: {
      control: 'text',
      description: 'Current search term value',
    },
    onExpandChange: {
      action: 'expanded',
      description: 'Callback when expand state changes (medium screens)',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when input value changes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for stateful examples
const SearchBarWrapper = ({ searchTerm: initialTerm = '', ...props }) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm)
  
  return (
    <SearchBar
      {...props}
      searchTerm={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}

export const Default: Story = {
  render: (args) => <SearchBarWrapper {...args} />,
  args: {},
}

export const WithInitialValue: Story = {
  render: (args) => <SearchBarWrapper {...args} />,
  args: {
    searchTerm: 'BTC',
  },
}

export const ResponsiveBehavior: Story = {
  render: (args) => <SearchBarWrapper {...args} />,
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'On desktop (lg+) shows full search bar. On medium screens shows icon that expands when clicked.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

// Show both states side by side for documentation
export const ResponsiveStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Desktop View (lg+)</h3>
        <div className="hidden lg:block">
          <SearchBarWrapper />
        </div>
        <div className="lg:hidden text-muted-foreground">
          (Full search bar always visible - resize window to see)
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Medium Screens (md to lg)</h3>
        <div className="lg:hidden">
          <SearchBarWrapper />
        </div>
        <div className="hidden lg:block text-muted-foreground">
          (Icon mode with expand behavior - resize window to see)
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates responsive behavior across different screen sizes.',
      },
    },
  },
}