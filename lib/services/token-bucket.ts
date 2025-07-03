/**
 * Token Bucket Rate Limiter for Hyperliquid API
 * 
 * Implements Hyperliquid's rate limiting rules:
 * - REST requests share an aggregated weight limit of 1200 per minute per IP
 * - Different request types have different weights:
 *   - Exchange API requests: weight 1 + floor(batch_length / 40)
 *   - Info requests (allMids, l2Book, etc.): weight 2
 *   - Most other info requests: weight 20
 *   - Explorer API requests: weight 40
 *   - userRole requests: weight 60
 * 
 * This implementation uses a conservative approach with weight-based tokens.
 */

export type RequestType = 'allMids' | 'l2Book' | 'clearinghouseState' | 'orderStatus' | 
                         'spotClearinghouseState' | 'exchangeStatus' | 'userRole' | 
                         'exchange' | 'info' | 'explorer'

export class TokenBucket {
  private tokens = 1000 // Start with most of the capacity (conservative)
  private readonly maxTokens = 1200 // Hyperliquid's actual limit: 1200 weight per minute
  private readonly refillRate = 20 // 1200 tokens per 60 seconds = 20 tokens per second
  private lastRefill = Date.now()

  /**
   * Get the weight for a specific request type
   */
  private getRequestWeight(requestType: RequestType, batchLength = 1): number {
    switch (requestType) {
      case 'allMids':
      case 'l2Book':
      case 'clearinghouseState':
      case 'orderStatus':
      case 'spotClearinghouseState':
      case 'exchangeStatus':
        return 2
      
      case 'userRole':
        return 60
      
      case 'exchange':
        return 1 + Math.floor(batchLength / 40)
      
      case 'explorer':
        return 40
      
      case 'info':
      default:
        return 20
    }
  }

  /**
   * Wait for sufficient tokens for a specific request type
   */
  async waitForTokens(requestType: RequestType = 'info', batchLength = 1): Promise<void> {
    const requiredWeight = this.getRequestWeight(requestType, batchLength)
    
    this.refill()
    
    if (this.tokens < requiredWeight) {
      // Calculate wait time based on how many tokens we need
      const tokensNeeded = requiredWeight - this.tokens
      const waitTime = (tokensNeeded / this.refillRate) * 1000 // Convert to milliseconds
      
      console.log(`Rate limit: waiting ${Math.ceil(waitTime)}ms for ${requiredWeight} tokens (${requestType})`)
      
      await new Promise(resolve => setTimeout(resolve, Math.ceil(waitTime)))
      return this.waitForTokens(requestType, batchLength)
    }
    
    this.tokens -= requiredWeight
    console.log(`Used ${requiredWeight} tokens for ${requestType}, ${this.tokens} remaining`)
  }

  /**
   * Legacy method for backward compatibility
   */
  async waitForToken(): Promise<void> {
    return this.waitForTokens('info')
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

  /**
   * Check if we have enough tokens for a request
   */
  hasTokensFor(requestType: RequestType = 'info', batchLength = 1): boolean {
    this.refill()
    const requiredWeight = this.getRequestWeight(requestType, batchLength)
    return this.tokens >= requiredWeight
  }

  /**
   * Get current token count
   */
  getTokenCount(): number {
    this.refill()
    return this.tokens
  }

  /**
   * Get the maximum capacity
   */
  getMaxTokens(): number {
    return this.maxTokens
  }

  /**
   * Get the refill rate per second
   */
  getRefillRate(): number {
    return this.refillRate
  }

  /**
   * Legacy method for backward compatibility
   */
  hasTokens(): boolean {
    return this.hasTokensFor('info')
  }
} 