import { addTag, listTags } from './git';
import { logger } from './logger';
import { Package, listPackagesFromPnpn, pnpmPublish } from './pnpm';

export interface Args {
  debug: boolean;
  dry: boolean;
  dryPublish: boolean;
  dryTag: boolean;
  repo: string;
  tagPrefix: string;
  tagSeparator: string;
  ignore: string[];
}

export async function start(args: Args) {
  logger.level = args.debug ? 'trace' : 'info';
  logger.trace('args %o', args);

  const tags = await listReleaseTags(args);
  logger.trace('Found releases: %o', tags);
  const existingReleases = tags.map(
    parseReleaseTag(args.tagPrefix, args.tagSeparator),
  );

  const packages = listPackagesFromPnpn(args.repo);
  logger.trace('Workspace packages: %o', packages.map(formatPackageShort));
  const filteredPackages = packages.filter(
    (p) => !args.ignore.includes(p.name) && !args.ignore.includes(p.path),
  );
  logger.trace('Found packages: %o', filteredPackages.map(formatPackageShort));

  const newPackageVersions = computeNewPackages(
    existingReleases,
    filteredPackages,
  );
  logger.info(
    'New package versions: %o',
    newPackageVersions.map(formatPackageShort),
  );

  await publishPackages(newPackageVersions, args);
}

export async function listReleaseTags({
  repo,
  tagPrefix,
  tagSeparator,
}: Pick<Args, 'repo' | 'tagPrefix' | 'tagSeparator'>) {
  const fullTagPrefix = `${tagPrefix}${tagSeparator}`;
  const tags = await listTags(repo);
  logger.trace('Found tags %o', tags);
  const releaseTags = tags.filter((tag) => tag.startsWith(fullTagPrefix));
  logger.info('Found release tags %o', releaseTags);
  if (releaseTags.length === 0) {
    logger.warn('No release tags found');
  }
  return releaseTags;
}

function formatPackageShort(p: { name: string; version: string }) {
  return `${p.name}:${p.version}`;
}

interface ReleaseTag {
  tag: string;
  packageName: string;
  version: string;
}

export function parseReleaseTag(tagPrefix: string, tagSeparator: string) {
  const prefix = `${tagPrefix}${tagSeparator}`;
  return (tag: string): ReleaseTag => {
    const withoutPrefix = tag.substring(prefix.length);
    const lastSeparatorIndex = withoutPrefix.lastIndexOf(tagSeparator);
    const packageName = withoutPrefix.substring(0, lastSeparatorIndex);
    const version = withoutPrefix.substring(lastSeparatorIndex + 1);
    return { tag, packageName, version };
  };
}

export function buildReleaseTag(
  tag: Pick<ReleaseTag, 'packageName' | 'version'>,
  { tagPrefix, tagSeparator }: Pick<Args, 'tagPrefix' | 'tagSeparator'>,
): string {
  return `${tagPrefix}${tagSeparator}${tag.packageName}${tagSeparator}${tag.version}`;
}

export function computeNewPackages(
  existingReleases: ReleaseTag[],
  packages: Package[],
) {
  return packages.filter(
    (p) =>
      !existingReleases.some(
        (r) => p.name === r.packageName && p.version === r.version,
      ),
  );
}

export async function publishPackages(
  packages: Package[],
  args: Pick<
    Args,
    'dry' | 'dryPublish' | 'dryTag' | 'tagPrefix' | 'tagSeparator' | 'repo'
  >,
) {
  await Promise.all(
    packages.map((p) =>
      publishPackage(p, args).then(() =>
        publishTag(
          buildReleaseTag({ packageName: p.name, version: p.version }, args),
          args,
        ),
      ),
    ),
  );
}

export async function publishPackage(
  p: Package,
  { dry, dryPublish, repo }: Pick<Args, 'dry' | 'dryPublish' | 'repo'>,
) {
  if (dry || dryPublish) {
    logger.info('[DRY] Publish package %s', formatPackageShort(p));
    return Promise.resolve();
  }
  // TODO
  // await pnpmPack(repo, p.path);
  await pnpmPublish(repo, p.path);
  logger.info('Package %s published', formatPackageShort(p));
}

export async function publishTag(
  tag: string,
  { repo, dry, dryTag }: Pick<Args, 'repo' | 'dry' | 'dryTag'>,
) {
  if (dry || dryTag) {
    logger.info('[DRY] Add tag %s', tag);
    return Promise.resolve();
  }
  await addTag(repo, tag);
  logger.info('Tag %s added', tag);
}
