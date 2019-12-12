// test implementation
export class InMemoryStorage implements Storage {
  private items: { [name: string]: string | null } = {};

  readonly length: number = Object.keys(this.items).length;

  clear(): void {
    this.items = {};
  }

  getItem(key: string): string | null {
    return this.items[key] === undefined ? null : this.items[key];
  }

  key(index: number): string | null {
    const key = Object.keys(this.items)[index];
    return key === undefined ? null : key;
  }

  removeItem(key: string): void {
    delete this.items[key];
  }

  setItem(key: string, value: string): void {
    this.items[key] = value;
  }

}
