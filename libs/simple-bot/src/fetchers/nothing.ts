import { DataFetcher } from '../bot';

export function nothing(): DataFetcher<Record<string, never>> {
  return async () => ({ status: 'OK', data: {} });
}
