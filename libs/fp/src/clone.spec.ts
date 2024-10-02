import { expect, describe, it } from 'vitest';
import { deepClone } from './clone';

describe(deepClone.name, () => {
  it('should work on primitive values', () => {
    expect(deepClone(1)).toBeDefined();
    expect(deepClone(500)).toBeDefined();
    expect(deepClone(true)).toBeDefined();
    expect(deepClone(false)).toBeDefined();
    expect(deepClone(Number.NEGATIVE_INFINITY)).toBeDefined();
    expect(deepClone(Number.POSITIVE_INFINITY)).toBeDefined();
    expect(deepClone(undefined)).toBe(undefined);
    expect(deepClone(null)).toBe(null);
  });
  it('should cloned simple object', () => {
    const a = { a: 'A' };
    const b = deepClone(a);
    expect(a).toStrictEqual(b);
    a.a = 'B';
    expect(a).not.toBe(b);
  });
  it('should cloned deep object', () => {
    const a = { a: { b: { c: { d: 'E' } } } };
    const b = deepClone(a);
    expect(a).toStrictEqual(b);
    a.a.b.c.d = 'Z';
    expect(a).not.toStrictEqual(b);
  });
  it('should cloned simple array', () => {
    const a = ['A'];
    const b = deepClone(a);
    expect(a).toStrictEqual(b);
    a[0] = 'B';
    expect(a).not.toBe(b);
  });
  it('should cloned deep array', () => {
    const a = [[[[[[[['A']]]]]]]];
    const b = deepClone(a);
    expect(a).toStrictEqual(b);
    a[0][0][0][0][0][0][0][0] = 'Z';
    expect(a).not.toStrictEqual(b);
  });
});
