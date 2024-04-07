import { match } from 'ts-pattern';
import nodeFs from 'node:fs';
import shelljs from 'shelljs';
import { Args } from './api';
import {
  CopyFileTask,
  CreateDirectoryTask,
  ReplaceTemplateTask,
  Task,
} from './generate-tasks';
import { logger } from './logger';

export function applyTasks(tasks: Task[], args: Pick<Args, 'name' | 'dry'>) {
  for (const task of tasks) {
    match(task)
      .with({ type: 'create-directory' }, applyCreateDirectyTask(args))
      .with({ type: 'copy-file' }, applyCopyFileTask(args))
      .with({ type: 'replace-template' }, applyReplaceTemplateTask(args));
  }
}

type TaskHandler<TTask extends Task> = (task: TTask) => void;

function applyCreateDirectyTask(
  args: Pick<Args, 'dry'>,
): TaskHandler<CreateDirectoryTask> {
  if (args.dry) {
    return (task) => logger.info(`[DRY] Create directory ${task.path}`);
  } else {
    return (task) => {
      logger.trace(`Will create directory ${task.path}`);
      shelljs.mkdir(task.path);
      logger.trace(`Has created directory ${task.path}`);
    };
  }
}

function applyCopyFileTask(args: Pick<Args, 'dry'>): TaskHandler<CopyFileTask> {
  if (args.dry) {
    return (task) => logger.info(`[DRY] Copy ${task.from} to ${task.to}`);
  } else {
    return (task) => {
      logger.trace(`Will copy ${task.from} to ${task.to}`);
      shelljs.cp(task.from, task.to);
      logger.trace(`Has copied ${task.from} to ${task.to}`);
    };
  }
}

function applyReplaceTemplateTask(
  args: Pick<Args, 'name' | 'dry'>,
): TaskHandler<ReplaceTemplateTask> {
  if (args.dry) {
    return (task) =>
      logger.info(`[DRY] Replace templates from file ${task.path}`);
  } else {
    return (task) => {
      logger.trace(`Will replace templates from file ${task.path}`);
      const fileContent = nodeFs.readFileSync(task.path, 'utf-8');
      const nameTemplate = /<<template:name>>/g;
      const newFileContent = fileContent.replaceAll(nameTemplate, args.name);
      nodeFs.writeFileSync(task.path, newFileContent, 'utf-8');
      logger.trace(`Has replaced templates from file ${task.path}`);
    };
  }
}
