import type { Meta, StoryObj } from '@storybook/nextjs';
import { 
  PerpsSpotTabs, 
  PerpsSpotTabsList, 
  PerpsSpotTabsTrigger, 
  PerpsSpotTabsContent 
} from '@/components/tables/perps-spot-tabs';

const meta: Meta<typeof PerpsSpotTabs> = {
  title: 'Tables/PerpsSpotTabs',
  component: PerpsSpotTabs,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#06121b' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PerpsSpotTabs defaultValue="perps" className="w-[400px]">
      <PerpsSpotTabsList>
        <PerpsSpotTabsTrigger value="perps">
          Perpetuals
        </PerpsSpotTabsTrigger>
        <PerpsSpotTabsTrigger value="spot">
          Spot
        </PerpsSpotTabsTrigger>
      </PerpsSpotTabsList>
      <PerpsSpotTabsContent value="perps" className="mt-4">
        <div className="text-white p-4 bg-[#0A1E2D] rounded">
          Perpetuals trading content would go here.
        </div>
      </PerpsSpotTabsContent>
      <PerpsSpotTabsContent value="spot" className="mt-4">
        <div className="text-white p-4 bg-[#0A1E2D] rounded">
          Spot trading content would go here.
        </div>
      </PerpsSpotTabsContent>
    </PerpsSpotTabs>
  ),
};

export const SpotSelected: Story = {
  render: () => (
    <PerpsSpotTabs defaultValue="spot" className="w-[400px]">
      <PerpsSpotTabsList>
        <PerpsSpotTabsTrigger value="perps">
          Perpetuals
        </PerpsSpotTabsTrigger>
        <PerpsSpotTabsTrigger value="spot">
          Spot
        </PerpsSpotTabsTrigger>
      </PerpsSpotTabsList>
      <PerpsSpotTabsContent value="perps" className="mt-4">
        <div className="text-white p-4 bg-[#0A1E2D] rounded">
          Perpetuals trading content would go here.
        </div>
      </PerpsSpotTabsContent>
      <PerpsSpotTabsContent value="spot" className="mt-4">
        <div className="text-white p-4 bg-[#0A1E2D] rounded">
          Spot trading content would go here.
        </div>
      </PerpsSpotTabsContent>
    </PerpsSpotTabs>
  ),
};

export const MultipleOptions: Story = {
  render: () => (
    <PerpsSpotTabs defaultValue="perps" className="w-[500px]">
      <PerpsSpotTabsList>
        <PerpsSpotTabsTrigger value="perps">
          Perpetuals
        </PerpsSpotTabsTrigger>
        <PerpsSpotTabsTrigger value="spot">
          Spot
        </PerpsSpotTabsTrigger>
        <PerpsSpotTabsTrigger value="options">
          Options
        </PerpsSpotTabsTrigger>
      </PerpsSpotTabsList>
      <PerpsSpotTabsContent value="perps" className="mt-4">
        <div className="text-white p-4 bg-[#0A1E2D] rounded">
          Perpetuals trading content
        </div>
      </PerpsSpotTabsContent>
      <PerpsSpotTabsContent value="spot" className="mt-4">
        <div className="text-white p-4 bg-[#0A1E2D] rounded">
          Spot trading content
        </div>
      </PerpsSpotTabsContent>
      <PerpsSpotTabsContent value="options" className="mt-4">
        <div className="text-white p-4 bg-[#0A1E2D] rounded">
          Options trading content
        </div>
      </PerpsSpotTabsContent>
    </PerpsSpotTabs>
  ),
};