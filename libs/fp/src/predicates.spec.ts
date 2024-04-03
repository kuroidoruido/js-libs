import { expect, describe, it } from 'vitest';
import {
  isDefined,
  isDefinedAndNotEmpty,
  isEmpty,
  isNotDefined,
  isNotEmpty,
  isNotDefinedOrEmpty,
  ObjectWithLength,
} from './predicates';

describe(isDefined.name, () => {
  it.each([
    '',
    1,
    {},
    { a: 1 },
    [],
    [1],
    [''],
    [[]],
    ['A', 'B'],
    ['A', 1],
    true,
    false,
    Symbol(),
    new Date(),
  ])('should return true <%s>', (input: unknown) => {
    expect(isDefined(input)).toBe(true);
  });
  it.each([null, undefined, void 0, , new Array(1)[0]])(
    'should return false <%s>',
    (input: unknown) => {
      expect(isDefined(input)).toBe(false);
    },
  );
});

describe(isNotDefined.name, () => {
  it.each([null, undefined, void 0, , new Array(1)[0]])(
    'should return true <%s>',
    (input: unknown) => {
      expect(isNotDefined(input)).toBe(true);
    },
  );
  it.each([
    '',
    1,
    {},
    { a: 1 },
    [],
    [1],
    [''],
    [[]],
    ['A', 'B'],
    ['A', 1],
    true,
    false,
    Symbol(),
    new Date(),
  ])('should return false <%s>', (input: unknown) => {
    expect(isNotDefined(input)).toBe(false);
  });
});

describe(isEmpty.name, () => {
  it.each(['', [], new Array(0), [], { length: 0 }])(
    'should return true <%s>',
    (input: ObjectWithLength) => {
      expect(isEmpty(input)).toBe(true);
    },
  );
  it.each(['A', [[]], [''], { length: 1 }])(
    'should return false <%s>',
    (input: ObjectWithLength) => {
      expect(isEmpty(input)).toBe(false);
    },
  );
});

describe(isNotEmpty.name, () => {
  it.each(['A', [[]], [''], { length: 1 }])(
    'should return true <%s>',
    (input: ObjectWithLength) => {
      expect(isNotEmpty(input)).toBe(true);
    },
  );
  it.each(['', [], new Array(0), [], { length: 0 }])(
    'should return false <%s>',
    (input: ObjectWithLength) => {
      expect(isNotEmpty(input)).toBe(false);
    },
  );
});

describe(isDefinedAndNotEmpty.name, () => {
  it.each(['A', [[]], [''], { length: 1 }])(
    'should return true <%s>',
    (input: ObjectWithLength) => {
      expect(isDefinedAndNotEmpty(input)).toBe(true);
    },
  );
  it.each([
    null,
    undefined,
    void 0,
    ,
    new Array(1)[0],
    '',
    [],
    new Array(0),
    [],
    { length: 0 },
  ])('should return false <%s>', (input: ObjectWithLength) => {
    expect(isDefinedAndNotEmpty(input)).toBe(false);
  });
});

describe(isNotDefinedOrEmpty.name, () => {
  it.each(['', [], new Array(0), [], { length: 0 }])(
    'should return true <%s>',
    (input: ObjectWithLength) => {
      expect(isNotDefinedOrEmpty(input)).toBe(true);
    },
  );
  it.each([[1], [''], [[]], ['A', 'B'], ['A', 1], 'A', { length: 1 }])(
    'should return false <%s>',
    (input: ObjectWithLength | undefined | null) => {
      expect(isNotDefinedOrEmpty(input)).toBe(false);
    },
  );
});
