import nodeFs from 'node:fs';
import nodePath from 'node:path';
import shelljs from 'shelljs';
import type { Args } from './api';
import { logger } from './logger';

export function generateTasks(
  args: Pick<Args, 'name' | 'root' | 'template'>,
): Task[] {
  const rootProjectDir = nodePath.resolve(process.cwd(), args.root);
  const templateRootPath = nodePath.resolve('templates', args.template);
  const templateFiles = shelljs.find(templateRootPath);
  logger.trace(
    'templates files %o',
    JSON.stringify(templateFiles, undefined, 2),
  );

  return templateFiles.flatMap((path): Task[] => {
    const relativePath = nodePath.relative(templateRootPath, path);
    const targetFullPath = nodePath.join(rootProjectDir, relativePath);
    if (nodeFs.statSync(path).isDirectory()) {
      return [createDirTask(targetFullPath)];
    } else {
      return [
        copyFileTask(path, targetFullPath),
        ...(isFileIncludeATemplateString(path)
          ? [replaceTemplateTask(targetFullPath)]
          : []),
      ];
    }
  });
}

export type CopyFileTask = { type: 'copy-file'; from: string; to: string };
function copyFileTask(from: string, to: string): CopyFileTask {
  return { type: 'copy-file', from, to };
}

export type CreateDirectoryTask = { type: 'create-directory'; path: string };
function createDirTask(path: string): CreateDirectoryTask {
  return { type: 'create-directory', path };
}

export type ReplaceTemplateTask = { type: 'replace-template'; path: string };
function replaceTemplateTask(path: string): ReplaceTemplateTask {
  return { type: 'replace-template', path };
}

export type Task = CopyFileTask | CreateDirectoryTask | ReplaceTemplateTask;

function isFileIncludeATemplateString(path: string): boolean {
  return nodeFs.readFileSync(path, 'utf-8').includes('<<template:');
}
