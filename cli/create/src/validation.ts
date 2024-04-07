import anthonypenaFp from '@anthonypena/fp';
import { TEMPLATES } from './template.data';
import type { Args } from './api';
import { logger } from './logger';
const { isNotDefinedOrEmpty } = anthonypenaFp;

export function isArgsValid(args: Args): boolean {
  const availableTemplates = TEMPLATES.map((t) => t.name);
  if (
    isNotDefinedOrEmpty(args.template) ||
    !availableTemplates.includes(args.template)
  ) {
    logger.error(
      'You should select a template from this list: %s',
      availableTemplates.join(' '),
    );
    return false;
  }
  if (isNotDefinedOrEmpty(args.name)) {
    logger.error('You should specify a project name.');
    return false;
  }
  if (isNotDefinedOrEmpty(args.root)) {
    logger.error('You should specify a root directory.');
    return false;
  }
  return true;
}
