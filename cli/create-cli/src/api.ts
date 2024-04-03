import { logger } from './logger';

export interface Args {
  debug: boolean;
  first: boolean;
  separator: string;
}

export function start(args: Args) {
  console.log(args);
  logger.level = args.debug ? 'trace' : 'warn';
}
