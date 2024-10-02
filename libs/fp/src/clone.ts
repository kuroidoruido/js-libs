import { isNotDefined } from './predicates';

export function deepClone<T>(x: T): T {
  if (x instanceof Date) {
    return new Date(x.getTime()) as T;
  }
  if (typeof x === 'bigint') {
    return BigInt(x.toString()) as T;
  }
  if (
    isNotDefined(x) ||
    typeof x === 'boolean' ||
    typeof x === 'number' ||
    x === Number.NEGATIVE_INFINITY ||
    x === Number.POSITIVE_INFINITY
  ) {
    return x;
  }
  if (Array.isArray(x)) {
    return x.map(deepClone) as T;
  }
  if (typeof x === 'object') {
    return Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.entries(x as any).map(([k, v]): [typeof k, typeof v] => [
        k,
        deepClone(v),
      ]),
    ) as T;
  }
  return JSON.parse(JSON.stringify(x));
}
