export function isEquals<T>(a: T, b: T): boolean {
  if (typeof a !== typeof b) {
    return false;
  }
  if (
    typeof a === 'boolean' ||
    typeof a === 'number' ||
    typeof a === 'function' ||
    typeof a === 'string' ||
    typeof a === 'undefined' ||
    a === null
  ) {
    return a === b;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  let aa: unknown = a;
  let bb: unknown = b;
  if (typeof a === 'bigint') {
    aa = a.toString();
  }
  if (typeof b === 'bigint') {
    bb = b.toString();
  }
  return JSON.stringify(aa) === JSON.stringify(bb);
}

export function isDifferent<T>(a: T, b: T): boolean {
  return !isEquals(a, b);
}
