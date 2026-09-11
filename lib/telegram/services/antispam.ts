const URL_PATTERN = /(?<![@\w])(?:https?:\/\/|www\.)[^\s<>"']+|(?<![@\w])(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?:\/[^\s<>"']*)?/gi;

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export class URLSafetyService {
  constructor(private readonly apiKey?: string, private readonly timeoutMs = 15_000) {}

  static extractUrls(text: string) {
    const urls: string[] = [];
    for (const match of text.match(URL_PATTERN) ?? []) {
      let url = match.replace(/[.,!?;:)]$/, "");
      if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
      if (!urls.includes(url)) urls.push(url);
    }
    return urls;
  }

  async isSafe(url: string): Promise<[boolean, string]> {
    if (!this.apiKey) return [false, "VirusTotal is not configured"];
    const response = await this.request("https://www.virustotal.com/api/v3/urls", {
      method: "POST",
      body: new URLSearchParams({ url }),
    });
    const data = (await response.json()) as { data: { id: string } };
    return this.poll(data.data.id);
  }

  async checkMessage(text: string): Promise<[boolean, Array<[string, string]>]> {
    const results: Array<[string, string]> = [];
    for (const url of URLSafetyService.extractUrls(text)) {
      try {
        const [safe, detail] = await this.isSafe(url);
        results.push([url, detail]);
        if (!safe) return [false, results];
      } catch {
        results.push([url, "VirusTotal check failed"]);
        return [false, results];
      }
    }
    return [true, results];
  }

  async checkFile(content: Uint8Array, filename: string, contentType?: string): Promise<[boolean, string]> {
    if (!this.apiKey) return [false, "VirusTotal is not configured"];
    const form = new FormData();
    form.append("file", new Blob([Buffer.from(content)], { type: contentType ?? "application/octet-stream" }), filename);
    const response = await this.request("https://www.virustotal.com/api/v3/files", { method: "POST", body: form });
    const data = (await response.json()) as { data: { id: string } };
    return this.poll(data.data.id);
  }

  private async poll(analysisId: string): Promise<[boolean, string]> {
    for (let attempt = 0; attempt < 15; attempt += 1) {
      const response = await this.request(`https://www.virustotal.com/api/v3/analyses/${encodeURIComponent(analysisId)}`);
      const data = (await response.json()) as { data: { attributes: { status?: string; stats?: Record<string, number> } } };
      const attributes = data.data.attributes;
      if (attributes.status === "completed") {
        const stats = attributes.stats ?? {};
        const malicious = Number(stats.malicious ?? 0);
        const suspicious = Number(stats.suspicious ?? 0);
        return [malicious + suspicious === 0, `malicious=${malicious}, suspicious=${suspicious}`];
      }
      await wait(2_000);
    }
    return [false, "VirusTotal analysis did not complete"];
  }

  private async request(url: string, init: RequestInit = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const headers = new Headers(init.headers);
      headers.set("x-apikey", this.apiKey ?? "");
      headers.set("accept", "application/json");
      const response = await fetch(url, { ...init, headers, signal: controller.signal });
      if (!response.ok) throw new Error(`VirusTotal returned ${response.status}`);
      return response;
    } finally {
      clearTimeout(timeout);
    }
  }
}