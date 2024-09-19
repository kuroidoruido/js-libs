import { describe, expect, it, vi } from 'vitest';
import { http } from './http';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('fetchers/http', () => {
  it('should make a fetch with just url and deserialize as json', async () => {
    // GIVEN
    const url = 'http://example.com/foo.json';
    const fetcher = http({ url });
    mockFetch.mockReturnValue(
      Promise.resolve({ json: () => Promise.resolve({ foo: 'bar' }) }),
    );

    // WHEN
    const res = await fetcher({ botName: '', env: {} });

    // THEN
    expect(res).toStrictEqual({ foo: 'bar' });
    expect(mockFetch).toHaveBeenCalledWith(url, {});
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
