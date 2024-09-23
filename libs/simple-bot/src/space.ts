import { BaseContext, Bot } from './bot';
import { printInConsole } from './emitters/print-in-console';

export interface SpaceConfig {
  env: Record<string, string>;
}

export function createBotSpace<T extends Record<string, unknown>>(
  bots: Bot<T>[],
  { env }: SpaceConfig,
) {
  return {
    async run() {
      for (const bot of bots) {
        const baseContext: BaseContext = { botName: bot.name, env };
        if (await bot.trigger(baseContext)) {
          console.log(`[${bot.name}] Start`);

          console.log(`[${bot.name}] Start data fetching`);
          const data = await bot.data(baseContext);
          console.log(`[${bot.name}] End data fetching`);
          console.log(`[${bot.name}] Start building message`);
          const message = await bot.message({ ...baseContext, data });
          console.log(`[${bot.name}] End building message`);
          if (env.DRY === 'true') {
            console.log(`[${bot.name}] Start sending message (DRY=true)`);
            await printInConsole()({ ...baseContext, message });
            console.log(`[${bot.name}] End sending message (DRY=true)`);
          } else {
            console.log(`[${bot.name}] Start sending message`);
            await bot.emitter({ ...baseContext, message });
            console.log(`[${bot.name}] End sending message`);
          }

          console.log(`[${bot.name}] End`);
        } else {
          console.log(`[${bot.name}] Will not run`);
        }
      }
    },
  };
}
