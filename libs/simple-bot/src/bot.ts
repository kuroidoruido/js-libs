import { Nullish } from '@anthonypena/types-utils';

export interface Bot<
  TFetchedData extends Record<string, unknown> = Record<string, never>,
> {
  name: string;
  /**
   * Defines if the bot should run.
   */
  trigger: Trigger;
  /**
   * Defines which data you need.
   */
  data: DataFetcher<TFetchedData>;
  /**
   * Defines a builder for your message.
   */
  message: MessageBuilder<TFetchedData>;
  /**
   * Defines how you want to diffuse your message.
   */
  emitter: MessageEmitter;
}

export interface BaseContext {
  botName: string;
  env: Record<string, string>;
}

export interface Trigger {
  (context: BaseContext): Promise<boolean>;
}

export type OkFetcherResult<TFetchedData> = {
  status: 'OK';
  data: TFetchedData;
};
export type PartialFetcherResult<TFetchedData> = {
  status: 'PARTIAL';
  details: string[];
  data: Partial<TFetchedData>;
};
export type ErrorFetcherResult = { status: 'KO'; errors?: string[] };
export type FetcherResult<TFetchedData> =
  | OkFetcherResult<TFetchedData>
  | PartialFetcherResult<TFetchedData>
  | ErrorFetcherResult;

export interface DataFetcher<TFetchedData> {
  (context: BaseContext): Promise<FetcherResult<TFetchedData>>;
}

export interface MessageBuilder<TFetchedData> {
  (
    context: BaseContext & { data: FetcherResult<TFetchedData> },
  ): Nullish | string | Promise<string>;
}

export type OkEmitterResult = { status: 'OK' };
export type PartialEmitterResult = { status: 'PARTIAL'; details: string[] };
export type ErrorEmitterResult = { status: 'KO'; errors?: string[] };
export type EmitterResult =
  | OkEmitterResult
  | PartialEmitterResult
  | ErrorEmitterResult;

export type MessageEmitterContext = BaseContext & { message: string };
export interface MessageEmitter {
  (context: MessageEmitterContext): Promise<EmitterResult>;
}

export function createBot<
  TFetchedData extends Record<string, unknown> = Record<string, never>,
>(bot: Bot<TFetchedData>) {
  return bot;
}
