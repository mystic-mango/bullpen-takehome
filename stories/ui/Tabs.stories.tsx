import type { Meta, StoryObj } from '@storybook/nextjs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const meta: Meta<typeof Tabs> = {
  title: 'shadcn/ui/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Default active tab value',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 text-sm">
          Make changes to your account here. Click save when you're done.
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 text-sm">
          Change your password here. After saving, you'll be logged out.
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const TradingTabs: Story = {
  render: () => (
    <Tabs defaultValue="perps" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="perps">Perpetuals</TabsTrigger>
        <TabsTrigger value="spot">Spot</TabsTrigger>
      </TabsList>
      <TabsContent value="perps">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Perpetual Futures</h3>
          <p className="text-sm text-muted-foreground">
            Trade perpetual futures with up to 50x leverage.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="spot">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Spot Trading</h3>
          <p className="text-sm text-muted-foreground">
            Trade real tokens with instant settlement.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trading-specific tabs for switching between perpetuals and spot markets.',
      },
    },
  },
}

export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="p-4 text-sm">
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-muted-foreground">
            Get a high-level view of your trading activity.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4 text-sm">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-muted-foreground">
            Deep dive into your trading performance.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4 text-sm">
          <h3 className="text-lg font-semibold mb-2">Reports</h3>
          <p className="text-muted-foreground">
            Generate and download trading reports.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4 text-sm">
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <p className="text-muted-foreground">
            Configure your trading preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="available" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="another">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="available">
        <div className="p-4 text-sm">
          This tab is available and active.
        </div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="p-4 text-sm">
          This content won't be shown as the tab is disabled.
        </div>
      </TabsContent>
      <TabsContent value="another">
        <div className="p-4 text-sm">
          Another available tab.
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example with a disabled tab that cannot be selected.',
      },
    },
  },
}