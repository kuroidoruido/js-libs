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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function notf<TFunction extends (...args: any[]) => boolean>(
  f: TFunction,
): TFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((...args: Parameters<TFunction>): boolean => not(f(...args))) as any;
}
