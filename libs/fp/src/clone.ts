export function deepClone<T>(x: T): T {
  if (x instanceof Date) {
    return new Date(x.getTime()) as T;
  }
  if (typeof x === 'bigint') {
    return BigInt(x.toString()) as T;
  }
  if (typeof x === 'undefined') {
    return x;
  }
  if (x === Number.NEGATIVE_INFINITY || x === Number.POSITIVE_INFINITY) {
    return x;
  }
  return JSON.parse(JSON.stringify(x));
}
