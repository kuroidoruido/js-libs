export function isDefined<T>(x: T | null | undefined): x is T {
  return x != undefined;
}

export function isNotDefined<T>(
  x: T | null | undefined,
): x is null | undefined {
  return x == undefined;
}

export type ObjectWithLength = { length: number };

export function isEmpty<T extends ObjectWithLength>(x: T): boolean {
  return x.length === 0;
}

export function isNotEmpty<T extends ObjectWithLength>(x: T): boolean {
  return x.length > 0;
}

export function isDefinedAndNotEmpty<T extends ObjectWithLength>(
  x: T | null | undefined,
): x is T {
  return isDefined(x) && isNotEmpty(x);
}

export function isNotDefinedOrEmpty<T extends ObjectWithLength>(
  x: T | null | undefined,
): x is null | undefined {
  return isNotDefined(x) || isEmpty(x);
}
