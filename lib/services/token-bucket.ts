// Token Bucket Rate Limiter
// Implements Hyperliquid's rate limiting: 100 tokens max, 10 tokens/second refill

export class TokenBucket {
  private tokens = 50 // Start more conservatively
  private readonly maxTokens = 50 // Reduce max tokens to be safer
  private readonly refillRate = 5 // Reduce refill rate to be more conservative
  private lastRefill = Date.now()

  async waitForToken(): Promise<void> {
    this.refill()
    
    if (this.tokens <= 0) {
      const waitTime = 1000 / this.refillRate
      await new Promise(resolve => setTimeout(resolve, waitTime))
      return this.waitForToken()
    }
    
    this.tokens--
  }

  private refill(): void {
    const now = Date.now()
    const timePassed = (now - this.lastRefill) / 1000
    const tokensToAdd = Math.floor(timePassed * this.refillRate)
    
    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd)
      this.lastRefill = now
    }
  }

  getTokenCount(): number {
    this.refill()
    return this.tokens
  }

  hasTokens(): boolean {
    this.refill()
    return this.tokens > 0
  }
} 