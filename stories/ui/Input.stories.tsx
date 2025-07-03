import type { Meta, StoryObj } from '@storybook/nextjs'
import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/components/icons/search'
import { SettingsIcon } from '@/components/icons/settings'

const meta: Meta<typeof Input> = {
  title: 'shadcn/ui/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side of the input',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search for a Token or CA',
    leftIcon: <SearchIcon className="h-4 w-4 text-muted-foreground" />,
  },
}

export const WithDifferentIcon: Story = {
  args: {
    placeholder: 'Settings...',
    leftIcon: <SettingsIcon className="h-4 w-4 text-muted-foreground" />,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    leftIcon: <SearchIcon className="h-4 w-4 text-muted-foreground" />,
  },
}

export const WithValue: Story = {
  args: {
    value: 'Some input value',
    leftIcon: <SearchIcon className="h-4 w-4 text-muted-foreground" />,
  },
}

export const SearchInput: Story = {
  args: {
    placeholder: 'Search for a Token or CA',
    leftIcon: <SearchIcon className="h-4 w-4 text-muted-foreground" />,
    className: 'w-[214px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Search input as used in the navigation bar',
      },
    },
  },
}