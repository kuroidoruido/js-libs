export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;
export type Falsy = false | '' | 0 | 0n | null | undefined;
export type Truthy<T> = T extends Falsy ? never : T;
export type Nullish = null | undefined;
