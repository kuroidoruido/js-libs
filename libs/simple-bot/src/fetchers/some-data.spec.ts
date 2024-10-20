import { describe, expect, it, vi } from 'vitest';
import { someData } from './some-data';
import { DataFetcher, FetcherResult } from '../bot';

type FooBarBaz = {
  foo: string;
  bar: { bar: string };
  baz: string[];
};
type FooBarBazFetcherResult = FetcherResult<FooBarBaz>;

describe('fetchers/someData', () => {
  it('should call every sub fetcher', async () => {
    // GIVEN
    const foo = vi.fn((async () => ({
      status: 'OK',
      data: 'foo',
    })) satisfies DataFetcher<FooBarBaz['foo']>);
    const bar = vi.fn((async () => ({
      status: 'OK',
      data: { bar: 'bar' },
    })) satisfies DataFetcher<FooBarBaz['bar']>);
    const baz = vi.fn((async () => ({
      status: 'OK',
      data: ['baz'],
    })) satisfies DataFetcher<FooBarBaz['baz']>);
    const fetcher = someData({
      foo,
      bar,
      baz,
    });

    // WHEN
    const res = await fetcher({ botName: '', env: {} });

    // THEN
    expect(res).toStrictEqual({
      status: 'OK',
      data: {
        foo: 'foo',
        bar: { bar: 'bar' },
        baz: ['baz'],
      },
    } satisfies FooBarBazFetcherResult);
  });
  it('should handle correctly when everything is KO', async () => {
    // GIVEN
    const foo = vi.fn((async () => ({
      status: 'KO',
      errors: ['💔'],
    })) satisfies DataFetcher<FooBarBaz['foo']>);
    const bar = vi.fn((async () => ({
      status: 'KO',
      errors: ['😵‍💫'],
    })) satisfies DataFetcher<FooBarBaz['bar']>);
    const baz = vi.fn((async () => ({
      status: 'KO',
      errors: ['✖️'],
    })) satisfies DataFetcher<FooBarBaz['baz']>);
    const fetcher = someData({
      foo,
      bar,
      baz,
    });

    // WHEN
    const res = await fetcher({ botName: '', env: {} });

    // THEN
    expect(res).toStrictEqual({
      status: 'KO',
      errors: ['💔', '😵‍💫', '✖️'],
    } satisfies FooBarBazFetcherResult);
  });
  it('should handle correctly when some fetcher are KO', async () => {
    // GIVEN
    const foo = vi.fn((async () => ({
      status: 'OK',
      data: 'foo',
    })) satisfies DataFetcher<FooBarBaz['foo']>);
    const bar = vi.fn((async () => ({
      status: 'KO',
      errors: ['😵‍💫'],
    })) satisfies DataFetcher<FooBarBaz['bar']>);
    const baz = vi.fn((async () => ({
      status: 'KO',
      errors: ['✖️'],
    })) satisfies DataFetcher<FooBarBaz['baz']>);
    const fetcher = someData({
      foo,
      bar,
      baz,
    });

    // WHEN
    const res = await fetcher({ botName: '', env: {} });

    // THEN
    expect(res).toStrictEqual({
      status: 'PARTIAL',
      details: ['OK', '😵‍💫', '✖️'],
      data: {
        foo: 'foo',
      },
    } satisfies FooBarBazFetcherResult);
  });
});
