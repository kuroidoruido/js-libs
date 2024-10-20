import {
  DataFetcher,
  ErrorFetcherResult,
  FetcherResult,
  OkFetcherResult,
} from '../bot';

export function someData<
  TFetchedData extends Record<string, unknown> = Record<string, never>,
>(fetchers: {
  [key in keyof TFetchedData]: DataFetcher<TFetchedData[key]>;
}): DataFetcher<TFetchedData> {
  return async (context) => {
    const results = await Promise.all(
      Object.entries(fetchers).map(
        ([key, fetcher]: [string, DataFetcher<unknown>]): Promise<
          [string, FetcherResult<unknown>]
        > => fetcher(context).then((res) => [key, res]),
      ),
    );

    if (results.every(([, r]) => r.status === 'OK')) {
      return {
        status: 'OK',
        data: Object.fromEntries(
          results.map(([k, v]) => [k, (v as OkFetcherResult<unknown>).data]),
        ) as TFetchedData,
      };
    } else if (results.every(([, r]) => r.status === 'KO')) {
      return {
        status: 'KO',
        errors: results.map(([, v]) =>
          String((v as ErrorFetcherResult).errors),
        ),
      };
    } else {
      return {
        status: 'PARTIAL',
        details: results.map(([, v]) =>
          v.status === 'OK' ? 'OK' : String((v as ErrorFetcherResult).errors),
        ),
        data: Object.fromEntries(
          results
            .filter(([, v]) => v.status === 'OK')
            .map(([k, v]) => [k, (v as OkFetcherResult<unknown>).data]),
        ) as TFetchedData,
      };
    }
  };
}
