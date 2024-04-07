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
    .description(`Create a new project from template.`)
    .option('--debug', 'Enable more logs.', false)
    .option('--dry', 'Enable dry mode.', false)
    .option(
      '-t, --template <template name>',
      'One of the available template',
      '',
    )
    .option('-n, --name <project name>', 'The project name', '<folder name>')
    .option(
      '-r, --root <path to output>',
      'Where to generate the project',
      '.',
    );

  program.parse();

  const options = program.opts<CliArgs>();
  return { program, options };
}

main();
