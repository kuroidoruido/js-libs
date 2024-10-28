import { isDefined } from '@anthonypena/fp';
import { BaseContext, Bot } from './bot';
import { printInConsole } from './emitters/print-in-console';
import { env } from './env';

export interface SpaceConfig {
  env: Record<string, string | undefined>;
}

export type BotModel = Record<string, unknown>;
export interface BotBuilder<
  TFetchedData extends BotModel = Record<string, never>,
> {
  (config: SpaceConfig): Bot<TFetchedData>;
}

export type BotInit<T extends BotModel> = Bot<T> | BotBuilder<T>;

export class BotSpace {
  private bots: Bot<BotModel>[] = [];

  constructor(private config: SpaceConfig) {
    this.config.env = env(this.config.env);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addBots(...bots: BotInit<any>[]): BotSpace {
    this.bots.push(
      ...(bots as BotInit<BotModel>[]).map((bot) =>
        typeof bot === 'function' ? bot(this.config) : bot,
      ),
    );
    return this;
  }

  async run() {
    const { env } = this.config;
    for (const bot of this.bots) {
      const baseContext: BaseContext = { botName: bot.name, env };
      if (await bot.trigger(baseContext)) {
        console.log(`[${bot.name}] Start`);

        console.log(`[${bot.name}] Start data fetching`);
        const data = await bot.data(baseContext);
        console.log(`[${bot.name}] End data fetching`);
        console.log(`[${bot.name}] Start building message`);
        const message = await bot.message({ ...baseContext, data });
        console.log(`[${bot.name}] End building message`);
        if (isDefined(message)) {
          if (env.DRY === 'true') {
            console.log(`[${bot.name}] Start sending message (DRY=true)`);
            await printInConsole()({ ...baseContext, message });
            console.log(`[${bot.name}] End sending message (DRY=true)`);
          } else {
            console.log(`[${bot.name}] Start sending message`);
            await bot.emitter({ ...baseContext, message });
            console.log(`[${bot.name}] End sending message`);
          }
        } else {
          console.log(`[${bot.name}] No message to send`);
        }

        console.log(`[${bot.name}] End`);
      } else {
        console.log(`[${bot.name}] Will not run`);
      }
    }
  }
}
