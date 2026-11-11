/**
 * No conoce ningún modelo concreto.
 * Puede almacenar cualquier tipo de dato.
 */
export interface Storage {
  get<T>(key: string): T | null;

  set<T>(key: string, value: T): void;

  remove(key: string): void;

  clear(): void;
}
