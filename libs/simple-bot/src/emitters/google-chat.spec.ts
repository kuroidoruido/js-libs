import { afterEach, describe, expect, it, vi } from 'vitest';
import { googleChat } from './google-chat';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('emitters/googleChat', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should emit the message', async () => {
    // GIVEN
    const spaceUrl = 'https://chat.googleapis.com/...';
    const emitters = googleChat({ spaceUrl });
    mockFetch.mockReturnValue(
      Promise.resolve({ json: () => Promise.resolve('') }),
    );

    // WHEN
    const res = await emitters({ botName: '', env: {}, message: 'MESSAGE' });

    // THEN
    expect(res).toStrictEqual({ status: 'OK' });
    expect(mockFetch).toHaveBeenCalledWith(spaceUrl, {
      method: 'POST',
      body: '{"text":"MESSAGE"}',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
  it('should handle link formatting', async () => {
    // GIVEN
    const spaceUrl = 'https://chat.googleapis.com/...';
    const emitters = googleChat({ spaceUrl });
    mockFetch.mockReturnValue(
      Promise.resolve({ json: () => Promise.resolve('') }),
    );

    // WHEN
    const res = await emitters({
      botName: '',
      env: {},
      message: 'Foo ![ici](https://example.com)',
    });

    // THEN
    expect(res).toStrictEqual({ status: 'OK' });
    expect(mockFetch).toHaveBeenCalledWith(spaceUrl, {
      method: 'POST',
      body: '{"text":"Foo <https://example.com|ici>"}',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
  it('should handle multiple links formatting', async () => {
    // GIVEN
    const spaceUrl = 'https://chat.googleapis.com/...';
    const emitters = googleChat({ spaceUrl });
    mockFetch.mockReturnValue(
      Promise.resolve({ json: () => Promise.resolve('') }),
    );

    // WHEN
    const res = await emitters({
      botName: '',
      env: {},
      message:
        'Foo ![ici](https://example.com) and ![there](https://example2.com)',
    });

    // THEN
    expect(res).toStrictEqual({ status: 'OK' });
    expect(mockFetch).toHaveBeenCalledWith(spaceUrl, {
      method: 'POST',
      body: '{"text":"Foo <https://example.com|ici> and <https://example2.com|there>"}',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
