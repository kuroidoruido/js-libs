import { EmitterResult, MessageEmitter } from '../bot';

export interface GoogleChatOption {
  spaceUrl: string;
}

export function googleChat({ spaceUrl }: GoogleChatOption): MessageEmitter {
  return async ({ message }) =>
    fetch(spaceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ text: message }),
    })
      .then((): EmitterResult => ({ status: 'OK' }))
      .catch((error) =>
        Promise.resolve({
          status: 'KO',
          errors: [`${error}`],
        } satisfies EmitterResult),
      );
}
