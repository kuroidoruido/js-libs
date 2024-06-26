import anthonypenaFp from '@anthonypena/fp';
import nodePath from 'node:path';
import { simpleGit } from 'simple-git';

const { noop } = anthonypenaFp;

function git(rootDir: string) {
  return simpleGit({ baseDir: nodePath.resolve(process.cwd(), rootDir) });
}

export async function listTags(rootDir: string): Promise<string[]> {
  return (await git(rootDir).tags()).all;
}

export async function addTag(rootDir: string, tag: string): Promise<void> {
  return (await git(rootDir)).addTag(tag).then(noop);
}
