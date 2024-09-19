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

export interface DataFetcher<TFetchedData> {
  (context: BaseContext): Promise<TFetchedData>;
}

export interface MessageBuilder<TFetchedData> {
  (context: BaseContext & { data: TFetchedData }): string;
}

export type OkEmitterResult = { status: 'OK' };
export type PartialEmitterResult = { status: 'PARTIAL'; details: string[] };
export type ErrorEmitterResult = { status: 'KO'; errors?: string[] };
export type EmitterResult =
  | OkEmitterResult
  | PartialEmitterResult
  | ErrorEmitterResult;

export interface MessageEmitter {
  (context: BaseContext & { message: string }): Promise<EmitterResult>;
}

export function createBot<
  TFetchedData extends Record<string, unknown> = Record<string, never>,
>(bot: Bot<TFetchedData>) {
  return bot;
}
