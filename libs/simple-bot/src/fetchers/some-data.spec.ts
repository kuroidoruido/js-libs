import { describe, expect, it, vi } from 'vitest';
import { someData } from './some-data';

describe('fetchers/someData', () => {
  it('should call every sub fetcher', async () => {
    // GIVEN
    const foo = vi.fn(async () => 'foo');
    const bar = vi.fn(async () => ({ bar: 'bar' }));
    const baz = vi.fn(async () => ['baz']);
    const fetcher = someData({
      foo,
      bar,
      baz,
    });

    // WHEN
    const res = await fetcher({ botName: '', env: {} });

    // THEN
    expect(res).toStrictEqual({
      foo: 'foo',
      bar: { bar: 'bar' },
      baz: ['baz'],
    });
  });
});
