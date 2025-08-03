export class KeyUtils {
  static collectKeys(obj: any, prefix: string, keys: Set<string>): void {
    for (const k in obj) {
      const fullKey = prefix ? `${prefix}.${k}` : k;
      if (typeof obj[k] === "object" && obj[k] !== null) {
        this.collectKeys(obj[k], fullKey, keys);
      } else {
        keys.add(fullKey);
      }
    }
  }

  static getNested(obj: any, key: string): unknown {
    return key.split(".").reduce((o, p) => (o ? o[p] : undefined), obj);
  }

  static setNested(obj: any, key: string, value: unknown): void {
    const parts: string[] = key.split(".");
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
}
