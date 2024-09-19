import { describe, expect, it } from 'vitest';
import { dispatch } from './dispatch';
import { EmitterResult, MessageEmitter } from '../bot';

function buildOK(): MessageEmitter {
  return async () => ({ status: 'OK' });
}
let ko = 0;
function buildKO(): MessageEmitter {
  return async () => ({ status: 'KO', errors: [`Error ${++ko}`] });
}

describe('emitters/dispatch', () => {
  it('should return OK status when every emitter return OK status', async () => {
    // GIVEN
    const emitters = dispatch(buildOK(), buildOK(), buildOK());

    // WHEN
    const res = await emitters({ botName: '', env: {}, message: 'MESSAGE' });

    // THEN
    expect(res).toStrictEqual({ status: 'OK' } satisfies EmitterResult);
  });

  it('should return KO status when every emitter return KO status', async () => {
    // GIVEN
    const emitters = dispatch(buildKO(), buildKO(), buildKO());

    // WHEN
    const res = await emitters({ botName: '', env: {}, message: 'MESSAGE' });

    // THEN
    expect(res).toStrictEqual({
      status: 'KO',
      errors: ['Error 1', 'Error 2', 'Error 3'],
    } satisfies EmitterResult);
  });

  it('should return PARTIAL status when some emitter return OK and some other return KO status', async () => {
    // GIVEN
    const emitters = dispatch(buildOK(), buildOK(), buildKO());

    // WHEN
    const res = await emitters({ botName: '', env: {}, message: 'MESSAGE' });

    // THEN
    expect(res).toStrictEqual({
      status: 'PARTIAL',
      details: ['OK', 'OK', 'KO => ["Error 4"]'],
    } satisfies EmitterResult);
  });
});
