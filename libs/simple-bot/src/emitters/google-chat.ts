import { EmitterResult, MessageEmitter } from '../bot';

export interface GoogleChatOption {
  spaceUrl: string;
}

export function googleChat({ spaceUrl }: GoogleChatOption): MessageEmitter {
  return async ({ botName, message }) => {
    console.log(
      `[${botName}]{googleChat}: WIll send message to Google Chat ${spaceUrl.slice(0, 45)}...`,
    );
    return fetch(spaceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ text: message }),
    })
      .then((res): EmitterResult => {
        res.json().then((json) => {
          console.log(`[${botName}]{googleChat}: ${res.status} ${json}`);
        });
        return { status: 'OK' };
      })
      .catch((error) => {
        console.error(`[${botName}]{googleChat}: error ${error}`);
        return Promise.resolve({
          status: 'KO',
          errors: [`${error}`],
        } satisfies EmitterResult);
      });
  };
}
