import { Nullish } from './base';

export type FilterKeys<T, Condition> = {
  [K in keyof T]: K extends Condition ? K : never;
}[keyof T];

export type PickByCondition<T, Condition> = Pick<T, FilterKeys<T, Condition>>;
export type OmitByCondition<T, Condition> = Omit<T, FilterKeys<T, Condition>>;

export type NonNullableKeys<T> = OmitByCondition<T, Nullish>;
