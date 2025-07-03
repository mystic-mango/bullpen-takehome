# Bullpen Takehome Project

July 2025

## API & WS Architecture

This application uses a real-time data feed that combines HTTP API calls with WebSocket streams from the [Hyperliquid API](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api).

### Overview

The data flow is as follows:
1. **Initial Load**: HTTP API fetches market data
2. **Real-time Updates**: WebSocket streams provide live price updates
3. **Caching & Deduplication**: Smart caching prevents unnecessary API calls
4. **Rate Limiting**: Weighted token bucket prevents API abuse

### Core Components

**WebSocket Manager** (`lib/services/websocket-manager.ts`) - Centralized WebSocket connection management 


#### Data Services
Two main services handle market data:

**1 . PerpDataService** (`lib/services/perp-data-service.ts`)
- Manages perpetual futures market data
- Fetches initial data via HTTP API
- Subscribes to WebSocket `allMids` for real-time price updates
- Implements 30-second caching with request deduplication

**2. SpotDataService** (`lib/services/spot-data-service.ts`)
- Manages spot market data
- Similar architecture to PerpDataService
- Filters spot markets exceeding $10k in 24-hour trading volume.

#### Rate Limiting (`lib/services/token-bucket.ts`)
Implements weight-based token bucket algorithm matching [Hyperliquid's exact API limits](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/rate-limits-and-user-limits):
- **1200 weight maximum** per minute (Hyperliquid's actual limit)
- **20 weight/second refill rate** (1200 per 60 seconds)
- **Weight-based requests**: Different request types have different weights:
  - `allMids`, `l2Book`, etc.: weight 2
  - Most info requests: weight 20
  - Explorer requests: weight 40
  - `userRole` requests: weight 60


#### API Client (`lib/services/hyperliquid-api.ts`)
HTTP client for Hyperliquid REST API:
- **Built-in rate limiting** using token bucket
- **Timeout handling** (10 seconds)
- **Error handling** with custom error types
- **Asset name mapping** for display purposes

### Features

#### Request Deduplication
- **Promise Sharing**: Multiple simultaneous requests for the same data share a single promise
- **Cache Validation**: 30-second cache prevents unnecessary API calls
- **Memory Efficiency**: Services reuse existing data when possible

#### Real-time Updates
- **WebSocket Streams**: Live price updates via `allMids` subscription
- **Automatic Reconnection**: Handles network failures gracefully
- **Status Indicators**: Live indicator shows connection status (initializing/live/stale) (`components/display/live-indicator.tsx`)

#### Error Handling
- **Rate Limit Protection**: Token bucket prevents 429 errors
- **Network Failures**: Automatic retry with exponential backoff
- **Graceful Degradation**: Falls back to cached data when possible


### Design System 

Refer to `Figma.fig`

- **Global colors**: Defined in OKLCH converted from Figma hex for consistency (improved consistency across devices compared to hex)
- **Typography**: Custom fonts defined in `fonts.css`
- **Icons**: Custom icon components in `/components/icons`
- **Components**: Documented in Storybook for showcase and development
- **State Management**: Persistent tab state using router.replace (no history additions)


## Getting Started

First, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Storybook

To run Storybook:
```bash
bun run storybook
```
Open http://localhost:6006 with your browser to see the showcase of components



## Future Tasks
- Add an feed from CoinGecko API / CoinMarketCap API for social +website links. The components are built as you can see from the storyboard, but social links are not supported from Hyperliquid API.

