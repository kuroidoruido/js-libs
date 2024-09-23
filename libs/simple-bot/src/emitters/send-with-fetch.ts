import { EmitterResult, MessageEmitter, MessageEmitterContext } from '../bot';

export interface SendWithFetchOption {
  reqBuilder(context: MessageEmitterContext): RequestInit & { url: string };
}

export function sendWithFetch(opt: SendWithFetchOption): MessageEmitter {
  return internalSendWithFetch(opt);
}

export function internalSendWithFetch({
  reqBuilder,
}: SendWithFetchOption): MessageEmitter {
  return async (context) => {
    const { url, ...req } = reqBuilder(context);
    return fetch(url, req)
      .then((): EmitterResult => ({ status: 'OK' }))
      .catch((error) => {
        return Promise.resolve({
          status: 'KO',
          errors: [`${error}`],
        } satisfies EmitterResult);
      });
  };
}
