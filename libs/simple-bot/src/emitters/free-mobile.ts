import { EmitterResult, MessageEmitter } from '../bot';
import { internalSendWithFetch } from './send-with-fetch';

export interface FreeMobileOption {
  login?: string;
  apiKey?: string;
}

export function freeMobile({
  login,
  apiKey,
}: FreeMobileOption = {}): MessageEmitter {
  const internal = internalSendWithFetch({
    reqBuilder({ message, env }) {
      const user = login ?? env.FREEMOBILE_LOGIN;
      const pass = apiKey ?? env.FREEMOBILE_APIKEY;
      const msg = encodeURI(message);
      return {
        url: `https://smsapi.free-mobile.fr/sendmsg?user=${user}&pass=${pass}&msg=${msg}`,
      };
    },
  });
  return async (context) => {
    const { botName, env } = context;
    const user = login ?? env.FREEMOBILE_LOGIN;
    console.log(`[${botName}]{freeMobile}: WIll send sms to ${user}`);
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
