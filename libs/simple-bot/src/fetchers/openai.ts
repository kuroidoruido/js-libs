const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

import { DataFetcher } from '../bot';

export type GptOption = {
  apikey: string;
  model?: string;
  messages: GptMessage[];
} & ({ format?: 'text'; schema: never } | { format: 'json'; schema: unknown });

export interface GptMessage {
  role: 'system' | 'user' | 'assistant';
  content:
    | string
    | {
        type: 'text';
        text: string;
      }[];
}

export function gpt({
  model = 'gpt-4o-mini',
  format = 'text',
  schema,
  apikey,
  messages,
}: GptOption): DataFetcher<{ message: GptMessage }[]> {
  return () => {
    const responseFormat =
      format === 'json'
        ? {
            response_format: {
              type: 'json_schema',
              json_schema: schema,
            },
          }
        : {};

    return fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        ...responseFormat,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.choices);
  };
}
