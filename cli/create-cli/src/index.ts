#! /usr/bin/env node
import { program } from 'commander';
import packageJson from '../package.json';
import { Args, start } from './api';

type CliArgs = Args;

export function main() {
  console.log(packageJson.name, packageJson.version, '\n');
  const { options } = defineArgs();
  start(options);
}

function defineArgs() {
  program
    .name(packageJson.name.substring(packageJson.name.indexOf('/') + 1))
    .version(packageJson.version)
    .option('--debug', 'Enable more logs.', false)
    .option('--first', 'Enable something', false)
    .option('-s, --separator <char>');

  program.parse();

  const options = program.opts<CliArgs>();
  return { program, options };
}

main();
