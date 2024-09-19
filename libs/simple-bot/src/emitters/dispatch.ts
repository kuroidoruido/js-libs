import { EmitterResult, ErrorEmitterResult, MessageEmitter } from '../bot';

export function dispatch(...emitters: MessageEmitter[]): MessageEmitter {
  return (context) =>
    Promise.all(emitters.map((emitter) => emitter(context))).then(
      (res): EmitterResult => {
        if (res.every((r) => r.status === 'OK')) {
          return { status: 'OK' };
        } else if (res.every((r) => r.status === 'KO')) {
          return {
            status: 'KO',
            errors: res.flatMap((r) => (r as ErrorEmitterResult).errors ?? []),
          };
        } else {
          return {
            status: 'PARTIAL',
            details: res.map((r) => {
              if (r.status === 'OK') {
                return 'OK';
              } else if (r.status === 'KO') {
                return `KO => ${JSON.stringify(r.errors)}`;
              } else {
                return `PARTIAL => ${JSON.stringify(r.details)}`;
              }
            }),
          };
        }
      },
    );
}
