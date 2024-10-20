/* eslint-disable @typescript-eslint/ban-types */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import * as emitters from './emitters';
import * as fetchers from './fetchers';
import * as triggers from './triggers';

const README = fs.readFileSync(
  path.resolve(process.cwd(), 'README.md'),
  'utf-8',
);

describe('Docs', () => {
  describe('triggers', () => {
    it.each(getFunctions(triggers))(
      'should have been documented %s',
      (functionName: string) => {
        expect(README).toContain(`#### \`${functionName}\``);
      },
    );
  });
  describe('fetchers', () => {
    it.each(getFunctions(fetchers, ['jsonDeserializer']))(
      'should have been documented %s',
      (functionName: string) => {
        expect(README).toContain(`#### \`${functionName}\``);
      },
    );
  });
  describe('emitters', () => {
    it.each(getFunctions(emitters))(
      'should have been documented %s',
      (functionName: string) => {
        expect(README).toContain(`#### \`${functionName}\``);
      },
    );
  });
});

function getFunctions(
  module: typeof emitters | typeof fetchers | typeof triggers,
  ignores: string[] = [],
): string[] {
  return Object.values(module)
    .filter((f) => typeof f === 'function')
    .map((f) => f.name)
    .filter((f) => !ignores.includes(f));
}
