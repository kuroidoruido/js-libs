import { EmitterResult, MessageEmitter } from '../bot';
import { internalSendWithFetch } from './send-with-fetch';

export interface GoogleChatOption {
  spaceUrl: string;
}

export function googleChat({ spaceUrl }: GoogleChatOption): MessageEmitter {
  const internal = internalSendWithFetch({
    reqBuilder({ message }) {
      return {
        url: spaceUrl,
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ text: handleMdFormatting(message) }),
      };
    },
  });
  return async (context) => {
    const { botName } = context;
    console.log(
      `[${botName}]{googleChat}: WIll send message to Google Chat ${spaceUrl.slice(0, 45)}...`,
    );
    return internal(context)
      .then((res): EmitterResult => {
        console.log(`[${botName}]{googleChat}: OK`);
        return res;
      })
      .catch((error) => {
        console.error(`[${botName}]{googleChat}: error ${error}`);
        return Promise.reject(error);
      });
  };
}

const LINK_PATTERN = /!\[([^\]]*)]\(([^\)]*)\)/g;

function handleMdFormatting(message: string): string {
  return message.replaceAll(LINK_PATTERN, '<$2|$1>');
}
