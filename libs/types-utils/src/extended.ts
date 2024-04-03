export type OptionalExceptFor<T, TRequiredKeys extends keyof T> = Partial<T> &
  Pick<T, TRequiredKeys>;
export type ReadonlyExceptFor<T, TReadWriteKeys extends keyof T> = Readonly<T> &
  Pick<T, TReadWriteKeys>;
export type RequiredExceptFor<T, TOptionalKeys extends keyof T> = Required<T> &
  Pick<T, TOptionalKeys>;

export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P];
};
export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends object ? PartialDeep<T[P]> : T[P];
};
