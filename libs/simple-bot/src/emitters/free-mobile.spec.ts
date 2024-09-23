import { describe, expect, it, vi } from 'vitest';
import { freeMobile } from './free-mobile';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('emitters/freeMobile', () => {
  it('should emit the message', async () => {
    // GIVEN
    const emitters = freeMobile({
      login: '11223344',
      apiKey: 'AOco7hqQyq8g7S',
    });
    mockFetch.mockReturnValue(
      Promise.resolve({ json: () => Promise.resolve('') }),
    );

    // WHEN
    const res = await emitters({
      botName: '',
      env: {},
      message: "Ça c'est un message avec des caractères spéciaux <>[]^$",
    });

    // THEN
    expect(res).toStrictEqual({ status: 'OK' });
    expect(mockFetch).toHaveBeenCalledWith(
      "https://smsapi.free-mobile.fr/sendmsg?user=11223344&pass=AOco7hqQyq8g7S&msg=%C3%87a%20c'est%20un%20message%20avec%20des%20caract%C3%A8res%20sp%C3%A9ciaux%20%3C%3E%5B%5D%5E$",
      {},
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
