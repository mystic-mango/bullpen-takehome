import type { Preview } from '@storybook/nextjs'
import React from 'react'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#06121B',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    layout: 'centered',
    docs: {
      theme: undefined,
    },
  },
  decorators: [
    (Story) => (
      <div className="dark font-favorit bg-background text-foreground p-8 ">
        <Story />
      </div>
    ),
  ],
};

export default preview;