import yaml from 'js-yaml';
import childProcess from 'node:child_process';
import nodeFs from 'node:fs';
import nodePath from 'node:path';
import { logger } from './logger';

interface PnpmLockDep {
  specifier: string;
  version: string;
}

interface PnpmLockFile {
  importers: Record<
    string,
    { dependencies: PnpmLockDep[]; devDependencies: PnpmLockDep[] }
  >;
}

export interface PackageDep {
  name: string;
  version: string;
  inWorkspace: boolean;
}

export interface Package {
  name: string;
  version: string;
  path: string;
  private: boolean;
  dependencies: PackageDep[];
  devDependencies: PackageDep[];
}

export function listPackagesFromPnpn(repo: string) {
  const pnpmLockPath = nodePath.resolve(process.cwd(), repo, 'pnpm-lock.yaml');
  logger.trace('Will use %s to resolve packages', pnpmLockPath);
  const pnpmLockAsString = nodeFs.readFileSync(pnpmLockPath, {
    encoding: 'utf-8',
  });
  const pnpmLock = yaml.load(pnpmLockAsString) as PnpmLockFile;
  return Object.entries(pnpmLock.importers)
    .filter(([key]) => key !== '.')
    .map(([path, { dependencies, devDependencies }]): Package => {
      const packageJsonPath = nodePath.resolve(
        process.cwd(),
        repo,
        path,
        'package.json',
      );
      logger.trace('Have resolve %s for package %s', packageJsonPath, path);
      const packageJson = JSON.parse(
        nodeFs.readFileSync(packageJsonPath, { encoding: 'utf-8' }),
      );
      return {
        name: packageJson.name,
        path,
        private: packageJson.private,
        version: packageJson.version,
        dependencies: Object.entries(dependencies ?? {}).map(
          ([name, { specifier }]) => ({
            name,
            version: specifier,
            inWorkspace: specifier.startsWith('workspace:'),
          }),
        ),
        devDependencies: Object.entries(devDependencies ?? {}).map(
          ([name, { specifier }]) => ({
            name,
            version: specifier,
            inWorkspace: specifier.startsWith('workspace:'),
          }),
        ),
      };
    });
}

async function pnpmExec(repo: string, packagePath: string, command: string) {
  const libDir = nodePath.resolve(process.cwd(), repo, packagePath);
  logger.trace('Will run command %s in directory %s', command, libDir);
  return new Promise((resolve, reject) => {
    childProcess.exec(
      command,
      {
        cwd: libDir,
        env: {
          ...process.env,
          NODE_OPTIONS:
            (process.env.NODE_OPTIONS + ' ' ?? '') + '--trace-uncaught',
        },
      },
      (err, stdout, stderr) => {
        if (err) {
          reject(stderr);
          logger.error('%o', err);
          logger.error(stderr);
        } else {
          resolve(stdout);
          logger.trace(stdout);
        }
      },
    );
  });
}

export async function pnpmPack(repo: string, packagePath: string) {
  return pnpmExec(repo, packagePath, 'pnpm pack');
}

export async function pnpmPublish(
  repo: string,
  packagePath: string,
  packageVersion: string,
) {
  return pnpmExec(
    repo,
    packagePath,
    'pnpm publish --no-git-checks --access=public' +
      (packageVersion.includes('-beta.') ? ' --tag beta' : ''),
  );
}
