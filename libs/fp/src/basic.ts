export function noop() {}

export function identity<T>(x: T): T {
  return x;
}

export function not(x: false): true;
export function not(x: true): false;
export function not(x: boolean): boolean;
export function not(x: boolean): boolean {
  return !x;
}
