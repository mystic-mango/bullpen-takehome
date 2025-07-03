import type { Meta, StoryObj } from '@storybook/nextjs'
import { Logo } from '@/components/display/logo'

const meta: Meta<typeof Logo> = {
  title: 'Display/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InNavBar: Story = {
  render: () => (
    <div className="bg-background border-b border-border p-4">
      <div className="flex items-center gap-6">
        <Logo />
        <div className="text-muted-foreground">Other nav items would go here...</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo as it appears in the navigation bar context.',
      },
    },
  },
}

export const WithBackground: Story = {
  render: () => (
    <div className="bg-card p-8 rounded-lg">
      <Logo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo with a background to show how it looks on different surfaces.',
      },
    },
  },
}