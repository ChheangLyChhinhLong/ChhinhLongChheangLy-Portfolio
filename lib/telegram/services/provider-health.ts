export class ProviderHealth {
  private readonly unavailableUntil = new Map<string, number>();

  constructor(private readonly cooldownMs = 300_000) {}

  isAvailable(provider: string) {
    const until = this.unavailableUntil.get(provider);
    if (until === undefined) return true;
    if (Date.now() >= until) {
      this.unavailableUntil.delete(provider);
      return true;
    }
    return false;
  }

  markFailed(provider: string) {
    this.unavailableUntil.set(provider, Date.now() + this.cooldownMs);
  }

  markHealthy(provider: string) {
    this.unavailableUntil.delete(provider);
  }
}