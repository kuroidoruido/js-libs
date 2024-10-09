const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

import { isNotDefined } from '@anthonypena/fp';
import { DataFetcher } from '../bot';

export type GptOption = {
  apikey: string;
  model?: string;
  messages: GptMessage[];
};

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
  apikey,
  messages,
}: GptOption): DataFetcher<string> {
  return () => {
    return fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    })
      .then((res) => res.json())
      .then((res): string => {
        const content = res.choices?.[0]?.message?.content;
        if (isNotDefined(content)) {
        }
        return typeof content === 'string' ? content : content[0].text;
      });
  };
}
