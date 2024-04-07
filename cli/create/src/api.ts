import nodePath from 'node:path';
import { logger } from './logger';
import { generateTasks } from './generate-tasks';
import { isArgsValid } from './validation';
import { applyTasks } from './apply-tasks';

export interface Args {
  debug: boolean;
  dry: boolean;
  template: string;
  name: string;
  root: string;
}

export function start(args: Args) {
  logger.level = args.debug ? 'trace' : 'info';
  if (args.name === '<folder name>') {
    args.name = nodePath.basename(args.root);
  }
  logger.trace('args %o', args);

  if (!isArgsValid(args)) {
    return;
  }

  applyTasks(generateTasks(args), args);
  logger.info(`Project ${args.name} created in ${args.root}!`);
}
