import { MessageEmitter } from '../bot';

export function printInConsole(): MessageEmitter {
  return async ({ message }) => {
    console.log(`\n"""\n${message}\n"""\n`);
    return { status: 'OK' };
  };
}
