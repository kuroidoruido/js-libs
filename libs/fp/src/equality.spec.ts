import { expect, describe, it } from 'vitest';
import { isDifferent, isEqual } from './equality';
import { deepClone } from './clone';

const SAME: unknown[] = [
  null,
  undefined,
  '',
  'A',
  {},
  [],
  [[[[[[[[[[[['A']]]]]]]]]]]],
  ['A'],
  { a: 'A' },
  {
    a: 'A',
    b: {
      c: 'C',
      d: { e: 'E' },
      f: { g: 'G', h: { i: 'I', j: { k: 'K', l: { m: 'M', n: {} } } } },
    },
  },
  new Date(),
  1,
  Number.MAX_SAFE_INTEGER,
  Number.MIN_SAFE_INTEGER,
  Number.POSITIVE_INFINITY,
  Number.NEGATIVE_INFINITY,
  true,
  false,
  BigInt('0x1fffffffffffff'),
];
const DIFF_SAME_TYPE: [unknown, unknown][] = [
  ...combineDifferents([null, undefined]),
  ...combineDifferents(['', 'A', 'B']),
  ...combineDifferents([[], ['A'], [['B']], [[]], [[['C']]]]),
  ...combineDifferents([
    {},
    { a: 'A' },
    { a: 'A', b: 'B' },
    { a: 'A', b: { c: 'C' } },
    {
      a: 'A',
      b: {
        c: 'C',
        d: { e: 'E' },
        f: { g: 'G', h: { i: 'I', j: { k: 'K', l: { m: 'M', n: {} } } } },
      },
    },
  ]),
  ...combineDifferents([
    new Date(),
    new Date(new Date().getTime() + 10),
    new Date(0),
  ]),
  ...combineDifferents([
    0,
    1,
    2,
    Number.MAX_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ]),
];
const DIFF_DIFFERENT_TYPES: [unknown, unknown][] = combineDifferents([
  null,
  undefined,
  'A',
  ['A'],
  { a: 'A' },
  new Date(),
  1,
  true,
  BigInt('0x1fffffffffffff'),
]);

describe(isEqual.name, () => {
  it.each(SAME)('should true for same ref <%o>', (input: unknown) => {
    expect(isEqual(input, input)).toBe(true);
  });
  it.each(SAME)(
    'should true for any value and a clone of it <%o>',
    (input: unknown) => {
      expect(isEqual(input, deepClone(input))).toBe(true);
    },
  );
  it.each(DIFF_SAME_TYPE)(
    'should return false for different objects <%o> === <%o>',
    (a: unknown, b: unknown) => {
      expect(isEqual(a, b)).toBe(false);
    },
  );
  it.each(DIFF_DIFFERENT_TYPES)(
    'should return false for objects with different type <%o> === <%o>',
    (a: unknown, b: unknown) => {
      expect(isEqual(a, b)).toBe(false);
    },
  );
});

describe(isDifferent.name, () => {
  it.each(DIFF_SAME_TYPE)(
    'should return true for different objects <%o> === <%o>',
    (a: unknown, b: unknown) => {
      expect(isDifferent(a, b)).toBe(true);
    },
  );
  it.each(DIFF_DIFFERENT_TYPES)(
    'should return true for objects with different type <%o> === <%o>',
    (a: unknown, b: unknown) => {
      expect(isDifferent(a, b)).toBe(true);
    },
  );
  it.each(SAME)('should false for same ref <%o>', (input: unknown) => {
    expect(isDifferent(input, input)).toBe(false);
  });
  it.each(SAME)(
    'should false for any value and a clone of it <%o>',
    (input: unknown) => {
      expect(isDifferent(input, deepClone(input))).toBe(false);
    },
  );
});

function combineDifferents(arr: unknown[]): [unknown, unknown][] {
  return arr.flatMap((x, xi, arr) =>
    arr.filter((_, yi) => yi !== xi).map((y): [unknown, unknown] => [x, y]),
  );
}
