import type { Meta, StoryObj } from '@storybook/nextjs'
import { BellIcon } from '@/components/icons/bell'
import { BarChartIcon } from '@/components/icons/bar-chart'
import { CheckIcon } from '@/components/icons/check'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { CopyIcon } from '@/components/icons/copy'
import { Copy2Icon } from '@/components/icons/copy-2'
import { DiscordIcon } from '@/components/icons/discord'
import { DownloadIcon } from '@/components/icons/download'
import { GiftIcon } from '@/components/icons/gift'
import { GlobeIcon } from '@/components/icons/globe'
import { PerpsIcon } from '@/components/icons/perps'
import { SearchIcon } from '@/components/icons/search'
import { SettingsIcon } from '@/components/icons/settings'
import { StarIcon } from '@/components/icons/star'
import { SwitchIcon } from '@/components/icons/switch'
import { TelegramIcon } from '@/components/icons/telegram'
import { TwitterIcon } from '@/components/icons/twitter'
import { WalletIcon } from '@/components/icons/wallet'
import { Wallet2Icon } from '@/components/icons/wallet2'
import { WebsiteIcon } from '@/components/icons/website'

const meta: Meta = {
  title: 'Icons/All Icons',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const IconWrapper = ({ children, name }: { children: React.ReactNode; name: string }) => (
  <div className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg">
    <div className="text-white">{children}</div>
    <span className="text-xs text-muted-foreground font-mono">{name}</span>
  </div>
)

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      <IconWrapper name="BellIcon">
        <BellIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="BarChartIcon">
        <BarChartIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="CheckIcon">
        <CheckIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="ChevronDownIcon">
        <ChevronDownIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="CopyIcon">
        <CopyIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="Copy2Icon">
        <Copy2Icon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="DiscordIcon">
        <DiscordIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="DownloadIcon">
        <DownloadIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="GiftIcon">
        <GiftIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="GlobeIcon">
        <GlobeIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="PerpsIcon">
        <PerpsIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="SearchIcon">
        <SearchIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="SettingsIcon">
        <SettingsIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="StarIcon">
        <StarIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="SwitchIcon">
        <SwitchIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="TelegramIcon">
        <TelegramIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="TwitterIcon">
        <TwitterIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="WalletIcon">
        <WalletIcon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="Wallet2Icon">
        <Wallet2Icon className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper name="WebsiteIcon">
        <WebsiteIcon className="h-6 w-6" />
      </IconWrapper>
    </div>
  ),
}

export const NavigationIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Navigation Icons</h3>
      <div className="grid grid-cols-5 gap-4">
        <IconWrapper name="BarChartIcon">
          <BarChartIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="PerpsIcon">
          <PerpsIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="SearchIcon">
          <SearchIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="WalletIcon">
          <WalletIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="GiftIcon">
          <GiftIcon className="h-6 w-6" />
        </IconWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons used in navigation components.',
      },
    },
  },
}

export const ActionIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Action Icons</h3>
      <div className="grid grid-cols-5 gap-4">
        <IconWrapper name="BellIcon">
          <BellIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="SettingsIcon">
          <SettingsIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="DownloadIcon">
          <DownloadIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="StarIcon">
          <StarIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="CheckIcon">
          <CheckIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="CopyIcon">
          <CopyIcon className="h-6 w-6" />
        </IconWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons used for various actions and buttons.',
      },
    },
  },
}

export const SocialIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Social Icons</h3>
      <div className="grid grid-cols-4 gap-4">
        <IconWrapper name="DiscordIcon">
          <DiscordIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="TwitterIcon">
          <TwitterIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="TelegramIcon">
          <TelegramIcon className="h-6 w-6" />
        </IconWrapper>
        <IconWrapper name="WebsiteIcon">
          <WebsiteIcon className="h-6 w-6" />
        </IconWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons used for social media and external links.',
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white">Small (16px)</h4>
        <div className="flex gap-4">
          <BellIcon className="h-4 w-4" />
          <SearchIcon className="h-4 w-4" />
          <SettingsIcon className="h-4 w-4" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white">Medium (24px)</h4>
        <div className="flex gap-4">
          <BellIcon className="h-6 w-6" />
          <SearchIcon className="h-6 w-6" />
          <SettingsIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white">Large (32px)</h4>
        <div className="flex gap-4">
          <BellIcon className="h-8 w-8" />
          <SearchIcon className="h-8 w-8" />
          <SettingsIcon className="h-8 w-8" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different sizes for icons.',
      },
    },
  },
}

export const Colors: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white">Default</h4>
        <div className="flex gap-4">
          <BellIcon className="h-6 w-6" />
          <SearchIcon className="h-6 w-6" />
          <SettingsIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white">Muted</h4>
        <div className="flex gap-4">
          <BellIcon className="h-6 w-6 text-muted-foreground" />
          <SearchIcon className="h-6 w-6 text-muted-foreground" />
          <SettingsIcon className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white">White</h4>
        <div className="flex gap-4">
          <BellIcon className="h-6 w-6 text-white" />
          <SearchIcon className="h-6 w-6 text-white" />
          <SettingsIcon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white">Accent</h4>
        <div className="flex gap-4">
          <BellIcon className="h-6 w-6 text-accent-foreground" />
          <SearchIcon className="h-6 w-6 text-accent-foreground" />
          <SettingsIcon className="h-6 w-6 text-accent-foreground" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different color variants for icons.',
      },
    },
  },
}