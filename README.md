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
All major components have been showcased using Storybook for enhanced documentation.

To run Storybook:
```bash
bun run storybook
```
Open http://localhost:6006 with your browser to see the showcase of components
<img width="1920" alt="Screenshot 2025-07-03 at 19 43 08" src="https://github.com/user-attachments/assets/83e4cdd9-9a2e-4e0f-9e51-440f1df3c1d1" />

## Screenshots

<img width="1920" alt="Screenshot 2025-07-03 at 19 42 49" src="https://github.com/user-attachments/assets/2dc79a9a-31e4-48e2-86b8-b9ba1f403f71" />
<img width="389" alt="Screenshot 2025-07-03 at 19 50 18" src="https://github.com/user-attachments/assets/60021957-c970-488d-87ed-57131180a7a8" />
<img width="388" alt="Screenshot 2025-07-03 at 19 50 39" src="https://github.com/user-attachments/assets/d7906b97-cfba-4269-843d-30af7b1fc744" />
<img width="810" alt="Screenshot 2025-07-03 at 19 51 07" src="https://github.com/user-attachments/assets/be8d9e29-aac5-4caf-aaaa-e875fc41767f" />

## Future Tasks
- Add an feed from CoinGecko API / CoinMarketCap API for social +website links. The components are built as you can see from the storyboard, but social links are not supported from Hyperliquid API.

