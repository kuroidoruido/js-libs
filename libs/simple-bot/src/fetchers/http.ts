import { DataFetcher } from '../bot';

export function http<TFetchedData>(
  { url, ...req }: RequestInit & { url: string },
  deserializer: HttpDeserializer<TFetchedData> = jsonDeserializer,
): DataFetcher<TFetchedData> {
  return () => fetch(url, req).then(deserializer);
}

export interface HttpDeserializer<T> {
  (res: Response): Promise<T>;
}

export async function jsonDeserializer<T>(res: Response): Promise<T> {
  return res.json();
}
