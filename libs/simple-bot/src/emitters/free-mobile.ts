import { EmitterResult, MessageEmitter } from '../bot';
import { internalSendWithFetch } from './send-with-fetch';

export interface FreeMobileOption {
  login: string;
  apiKey: string;
}

export function freeMobile({
  login,
  apiKey,
}: FreeMobileOption): MessageEmitter {
  const internal = internalSendWithFetch({
    reqBuilder({ message }) {
      const msg = encodeURI(message);
      return {
        url: `https://smsapi.free-mobile.fr/sendmsg?user=${login}&pass=${apiKey}&msg=${msg}`,
      };
    },
  });
  return async (context) => {
    const { botName } = context;
    console.log(`[${botName}]{freeMobile}: WIll send sms to ${login}`);
    return internal(context)
      .then((res): EmitterResult => {
        console.log(`[${botName}]{freeMobile}: OK`);
        return res;
      })
      .catch((error) => {
        console.error(`[${botName}]{freeMobile}: error ${error}`);
        return Promise.reject(error);
      });
  };
}
