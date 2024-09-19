import { DataFetcher } from '../bot';

export function someData<
  TFetchedData extends Record<string, unknown> = Record<string, never>,
>(fetchers: {
  [key in keyof TFetchedData]: DataFetcher<TFetchedData[key]>;
}): DataFetcher<TFetchedData> {
  return async (context) => {
    return Object.fromEntries(
      await Promise.all(
        Object.entries(fetchers).map(
          ([key, fetcher]: [string, DataFetcher<unknown>]) =>
            fetcher(context).then((res) => [key, res]),
        ),
      ),
    ) as TFetchedData;
  };
}
