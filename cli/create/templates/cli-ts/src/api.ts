import { logger } from './logger';

export interface Args {
  debug: boolean;
}

export async function start(args: Args) {
  logger.level = args.debug ? 'trace' : 'info';
  logger.trace('args %o', args);
}
