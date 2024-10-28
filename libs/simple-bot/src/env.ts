export function env<TEnv extends Record<string, string | undefined>>(
  env: TEnv,
): TEnv {
  return Object.fromEntries(
    Object.entries(env).map(([k, v]) => [k, decodeIfNeeded(v)]),
  ) as TEnv;
}

function decodeIfNeeded(v: string | undefined): string | undefined {
  if (v?.startsWith('base64:')) {
    return decodeBase64(v);
  }
  return v;
}

function decodeBase64(v: string): string {
  const vWithoutPrefix = v.slice(v.indexOf(':') + 1);
  return atob(vWithoutPrefix);
}
