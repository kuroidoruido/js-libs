import { describe, expect, it } from 'vitest';

import { env } from './env';

describe(env.name, () => {
  it('should do nothing on basic variables', () => {
    const input = { FOO: 'https://www.exemple.com' };
    expect(env(input)).toStrictEqual(input);
  });
  it('should decode base64 values', () => {
    const input = { FOO: 'base64:' + btoa('https://www.exemple.com') };
    const output = { FOO: 'https://www.exemple.com' };
    expect(env(input)).toStrictEqual(output);
  });
});
