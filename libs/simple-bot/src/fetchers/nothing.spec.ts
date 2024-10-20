import { describe, expect, it, vi } from 'vitest';
import { nothing } from './nothing';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('fetchers/nothing', () => {
  it('should return empty object', async () => {
    // GIVEN
    const fetcher = nothing();

    // WHEN
    const res = await fetcher({ botName: '', env: {} });

    // THEN
    expect(res).toStrictEqual({ status: 'OK', data: {} });
  });
});
