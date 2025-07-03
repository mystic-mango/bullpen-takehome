import type { Meta, StoryObj } from '@storybook/nextjs'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const meta: Meta<typeof Table> = {
  title: 'shadcn/ui/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const TradingTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead className="text-left">Token</TableHead>
          <TableHead className="text-right">Last Price</TableHead>
          <TableHead className="text-right">24h Change</TableHead>
          <TableHead className="text-right">Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="hover:bg-accent/10">
          <TableCell className="text-left">BTC/USDC</TableCell>
          <TableCell className="text-right text-white">$45,234.56</TableCell>
          <TableCell className="text-right text-[#4FFFAB]">+2.34%</TableCell>
          <TableCell className="text-right text-white">$1.2B</TableCell>
        </TableRow>
        <TableRow className="hover:bg-accent/10">
          <TableCell className="text-left">ETH/USDC</TableCell>
          <TableCell className="text-right text-white">$2,834.67</TableCell>
          <TableCell className="text-right text-[#F34C68]">-1.23%</TableCell>
          <TableCell className="text-right text-white">$854M</TableCell>
        </TableRow>
        <TableRow className="hover:bg-accent/10">
          <TableCell className="text-left">SOL/USDC</TableCell>
          <TableCell className="text-right text-white">$98.45</TableCell>
          <TableCell className="text-right text-[#4FFFAB]">+5.67%</TableCell>
          <TableCell className="text-right text-white">$432M</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of how the table looks in a trading context with hover effects and colored data.',
      },
    },
  },
}

export const WithoutCaption: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const EmptyTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="text-center p-8">
            <div className="text-[#b3b9be]">No data available</div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state of a table with centered message.',
      },
    },
  },
}