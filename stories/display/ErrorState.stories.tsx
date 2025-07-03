import type { Meta, StoryObj } from '@storybook/nextjs';
import { ErrorState } from '@/components/display/error-state';

const meta: Meta<typeof ErrorState> = {
  title: 'Display/ErrorState',
  component: ErrorState,
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
  argTypes: {
    message: {
      control: 'text',
      description: 'Error message to display',
    },
    onRetry: {
      action: 'retry clicked',
      description: 'Optional retry callback function',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Something went wrong while loading the data.',
  },
};

export const WithRetry: Story = {
  args: {
    message: 'Failed to connect to the server. Please check your internet connection.',
    onRetry: () => console.log('Retry clicked'),
  },
};

export const LongMessage: Story = {
  args: {
    message: 'A very long error message that explains in detail what went wrong and provides additional context about the error condition that occurred.',
    onRetry: () => console.log('Retry clicked'),
  },
};

export const NetworkError: Story = {
  args: {
    message: 'Network connection failed. Please check your internet connection and try again.',
    onRetry: () => console.log('Retry clicked'),
  },
};