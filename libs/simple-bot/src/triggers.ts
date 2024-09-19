import { identity, isDefinedAndNotEmpty } from '@anthonypena/fp';
import { Trigger } from './bot';

/* LOGICAL TRIGGERS */

export function always(): Trigger {
  return async () => true;
}

export function never(): Trigger {
  return async () => false;
}

function resolveAllTriggers(
  triggers: Trigger[],
  triggerContext: Parameters<Trigger>[0],
): Promise<boolean[]> {
  return Promise.all(triggers.map((t) => t(triggerContext)));
}

export function anyTrigger(...triggers: Trigger[]): Trigger {
  return async (triggerContext) => {
    return (await resolveAllTriggers(triggers, triggerContext)).some(identity);
  };
}

export function allTrigger(...triggers: Trigger[]): Trigger {
  return async (triggerContext) => {
    return (await resolveAllTriggers(triggers, triggerContext)).every(identity);
  };
}

/* BUSINESS TRIGGERS */

export function whenEnvIsDefined(envVar: string): Trigger {
  return async ({ env }) => isDefinedAndNotEmpty(env[envVar]);
}
