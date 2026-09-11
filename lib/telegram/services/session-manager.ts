export class SessionManager {
  private readonly lastActive = new Map<number, number>();

  constructor(private readonly timeoutSeconds = 180) {}

  isNewSession(userId: number, now = Date.now()) {
    const last = this.lastActive.get(userId);
    return last === undefined || (now - last) / 1000 > this.timeoutSeconds;
  }

  touch(userId: number, now = Date.now()) {
    this.lastActive.set(userId, now);
  }

  isNewAndTouch(userId: number, now = Date.now()) {
    const isNew = this.isNewSession(userId, now);
    this.touch(userId, now);
    return isNew;
  }
}