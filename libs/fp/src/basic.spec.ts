import { expect, describe, it } from 'vitest';
import { not, notf } from './basic';

describe(not.name, () => {
  it('should return false for true value', () => {
    expect(not(true)).toBeFalsy();
  });
  it('should return true for false value', () => {
    expect(not(false)).toBeTruthy();
  });
});

describe(notf.name, () => {
  it('should return false for true value', () => {
    expect(
      notf(
        (a: number, b: number, c: number, d: number, e: number) =>
          a + b + c + d + e === 15,
      )(1, 2, 3, 4, 5),
    ).toBeFalsy();
  });
  it('should return true for false value', () => {
    expect(
      notf(
        (a: number, b: number, c: number, d: number, e: number) =>
          a + b + c + d + e !== 15,
      )(1, 2, 3, 4, 5),
    ).toBeTruthy();
  });
});
