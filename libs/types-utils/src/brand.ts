export type Brand<T, B> = T & { __brand: B };

export function toBrand<T extends Brand<TInner, TBrand>, TInner, TBrand>(
  x: TInner,
): T {
  return x as unknown as T;
}

export function fromBrand<T extends Brand<TInner, TBrand>, TInner, TBrand>(
  x: T,
): TInner {
  return x as unknown as TInner;
}
