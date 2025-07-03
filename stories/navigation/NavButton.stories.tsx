import type { Meta, StoryObj } from '@storybook/nextjs'
import { NavButton } from '@/components/navigation/nav-button'
import { StarIcon } from '@/components/icons/star'
import { DownloadIcon } from '@/components/icons/download'
import { BellIcon } from '@/components/icons/bell'
import { SettingsIcon } from '@/components/icons/settings'

const meta = {
  title: 'Navigation/NavButton',
  component: NavButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Navigation button component with icon and text variants. Features hover, active, and focus states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['icon', 'text'],
      description: 'Button variant style'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state'
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Render as child component using Slot'
    }
  }
} satisfies Meta<typeof NavButton>

export default meta
type Story = StoryObj<typeof meta>

export const IconVariant: Story = {
  args: {
    variant: 'icon',
    children: <StarIcon className="h-4 w-4 text-white" />
  }
}

export const TextVariant: Story = {
  args: {
    variant: 'text',
    children: [
      <DownloadIcon key="icon" className="h-4 w-4 text-white" />,
      'Fund'
    ]
  }
}

export const AllIcons: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <NavButton variant="icon">
        <StarIcon className="h-4 w-4 text-white" />
      </NavButton>
      <NavButton variant="icon">
        <BellIcon className="h-4 w-4 text-white" />
      </NavButton>
      <NavButton variant="icon">
        <SettingsIcon className="h-4 w-4 text-white" />
      </NavButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collection of icon buttons showing different icons'
      }
    }
  }
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Normal:</span>
        <NavButton variant="icon">
          <StarIcon className="h-4 w-4 text-white" />
        </NavButton>
        <NavButton variant="text">
          <DownloadIcon className="h-4 w-4 text-white" />
          Fund
        </NavButton>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Disabled:</span>
        <NavButton variant="icon" disabled>
          <StarIcon className="h-4 w-4 text-white" />
        </NavButton>
        <NavButton variant="text" disabled>
          <DownloadIcon className="h-4 w-4 text-white" />
          Fund
        </NavButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states including normal and disabled'
      }
    }
  }
}

export const Disabled: Story = {
  args: {
    variant: 'icon',
    disabled: true,
    children: <StarIcon className="h-4 w-4 text-white" />
  }
}