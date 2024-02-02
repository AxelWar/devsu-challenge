export class LocalStorageMock {
  private store: { [key: string]: string } = {};

  clear(): void {
    this.store = {
      originalProductData:
        '{"id":"tarj-001","name":"tarj-001","description":"tarj-00001","logo":"https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg","date_release":"2024-02-01T00:00:00.000+00:00","date_revision":"2025-02-01T00:00:00.000+00:00"}',
      productEditState: 'true',
      productFormData:
        '{"name":"tarj-001","description":"tarj-00001","logo":"https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg","date_release":"2024-02-01","date_revision":"2025-02-01","id":"tarj-001"}',
    };
  }

  getItem(key: string): string | null {
    return key in this.store ? this.store[key] : null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return index < keys.length ? keys[index] : null;
  }

  get length(): number {
    return Object.keys(this.store).length;
  }
}
