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

          const data = await bot.data(baseContext);
          const message = await bot.message({ ...baseContext, data });
          if (env.DRY === 'true') {
            await printInConsole();
          } else {
            await bot.emitter({ ...baseContext, message });
          }

          console.log(`[${bot.name}] End`);
        } else {
          console.log(`[${bot.name}] Will not run`);
        }
      }
    },
  };
}
