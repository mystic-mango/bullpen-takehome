import type { Meta, StoryObj } from '@storybook/nextjs'
import { Footer } from '@/components/footer/footer'
import { LiveIndicator } from '@/components/display/live-indicator'
import { PriceIndicators } from '@/components/footer/price-indicators'
import { TokenSwap } from '@/components/footer/token-swap'
import { TelegramConnect } from '@/components/footer/telegram-connect'
import { FooterLinks } from '@/components/footer/footer-links'
import { SocialLinks } from '@/components/footer/social-links'

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Application footer component containing live status, price indicators, quick actions, and navigation links.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete footer as it appears in the application with live status, prices, and navigation'
      }
    }
  }
}

export const Components: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Individual Footer Components</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Live Indicator</h4>
            <LiveIndicator isLive={true} />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Price Indicators</h4>
            <PriceIndicators />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Token Swap</h4>
            <TokenSwap />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Telegram Connect</h4>
            <TelegramConnect />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Footer Links</h4>
            <FooterLinks />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Social Links</h4>
            <SocialLinks />
          </div>
        </div>
      </div>
      
  
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breakdown of all footer components individually and the complete footer'
      }
    }
  }
}

// Individual component stories
export const LiveIndicatorStory: Story = {
  render: () => <LiveIndicator isLive={true} />,
  name: 'Live Indicator Only'
}

export const PriceIndicatorsStory: Story = {
  render: () => <PriceIndicators />,
  name: 'Price Indicators Only'
}

export const TokenSwapStory: Story = {
  render: () => <TokenSwap />,
  name: 'Token Swap Only'
}

export const TelegramConnectStory: Story = {
  render: () => <TelegramConnect />,
  name: 'Telegram Connect Only'
}

export const FooterLinksStory: Story = {
  render: () => <FooterLinks />,
  name: 'Footer Links Only'
}

export const SocialLinksStory: Story = {
  render: () => <SocialLinks />,
  name: 'Social Links Only'
}