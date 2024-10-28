import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { createBot, BotSpace } from '.';
import { googleChat } from './emitters';
import { http, nothing, someData } from './fetchers';
import { always } from './triggers';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('space', () => {
  beforeEach(() => {
    mockFetch.mockImplementation(() => Promise.resolve(new Response()));
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  test('Readme bot', async () => {
    const staticBot = createBot({
      name: 'The Static Bot 🤖',
      trigger: always(),
      data: nothing(),
      message: () => 'This is a static message!',
      emitter: googleChat({ spaceUrl: 'https://chat.googleapis.com/...' }),
    });

    await new BotSpace({ env: {} }).addBots(staticBot).run();

    expect(mockFetch).toBeCalledTimes(1);
  });
  test('Multiple bots', async () => {
    const aBot = createBot({
      name: 'Multi bots',
      trigger: always(),
      data: someData({ a: http({ url: '' }) }),
      message: () => 'This is a static message!',
      emitter: googleChat({ spaceUrl: 'https://chat.googleapis.com/...' }),
    });
    const bBot = createBot({
      name: 'Multi bots',
      trigger: always(),
      data: someData({ b: http({ url: '' }) }),
      message: () => 'This is a static message!',
      emitter: googleChat({ spaceUrl: 'https://chat.googleapis.com/...' }),
    });
    const cBot = createBot({
      name: 'Multi bots',
      trigger: always(),
      data: someData({ c: http({ url: '' }) }),
      message: () => 'This is a static message!',
      emitter: googleChat({ spaceUrl: 'https://chat.googleapis.com/...' }),
    });

    await new BotSpace({ env: {} }).addBots(aBot, bBot).addBots(cBot).run();

    expect(mockFetch).toBeCalledTimes(6);
  });
});
