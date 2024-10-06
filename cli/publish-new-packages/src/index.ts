#! /usr/bin/env node
import { program } from 'commander';
import packageJson from '../package.json';
import { Args, start } from './api';

type CliArgs = Omit<Args, 'ignore'> & { ignore: string };

export async function main() {
  console.log(packageJson.name, packageJson.version, '\n');
  const { options } = defineArgs();
  await start({
    ...options,
    ignore:
      typeof options.ignore === 'string'
        ? options.ignore.split(',')
        : (options.ignore ?? []),
  });
}

function defineArgs() {
  program
    .name(packageJson.name.substring(packageJson.name.indexOf('/') + 1))
    .version(packageJson.version)
    .description(
      `This CLI will publish every new packages.
To make that, it will compare current package version (using the package.json) and already published version (using git tags).

By default tags will be "releases:<packageName>:<version>"`,
    )
    .option('--debug', 'Enable more logs.', false)
    .option(
      '--dry',
      'Compute changes to made, print them in the console but do nothing. (Same as --dry-publish and --dry-tag)',
      false,
    )
    .option(
      '--dry-publish',
      'Do not publish, only print which package should be publish.',
      false,
    )
    .option(
      '--dry-tag',
      'Do not create tags, only print which tags should be made.',
      false,
    )
    .option('--repo <path>', 'The repo path.', '.')
    .option('-i, --ignore <package>[,<package>[...]]', 'Packages to ignore.')
    .option(
      '--tag-prefix <prefix>',
      'The tag prefix which will be used.',
      'releases',
    )
    .option(
      '--tag-separator <prefix>',
      'The tag separator which will be used.',
      '/',
    );

  program.parse();

  const options = program.opts<CliArgs>();
  return { program, options };
}

await main();
