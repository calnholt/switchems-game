export class Dequeue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  pushFront(item: T): void {
    this.items.unshift(item);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  peek(): T | undefined {
    return this.items[0];
  }

  size(): number {
    return this.items.length;
  }
}
