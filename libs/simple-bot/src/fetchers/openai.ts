const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

import { isNotDefined } from '@anthonypena/fp';
import { DataFetcher } from '../bot';

export type GptOption = {
  apikey?: string;
  model?: string;
  messages: GptMessage[];
};

export type GptMessageContent = string | { type: 'text'; text: string }[];

// https://platform.openai.com/docs/api-reference/chat/create#chat-create-messages
export interface GptSystemMessage {
  role: 'system';
  content: GptMessageContent;
  name?: string;
}
export interface GptUserMessage {
  role: 'user';
  content: GptMessageContent;
  name?: string;
}
export interface GptAssistantMessage {
  role: 'assistant';
  content: GptMessageContent;
  name?: string;
  refusal?: string | null;
  tool_calls?: {
    id: string;
    type: 'function';
    function: { name: string; arguments: string };
  }[];
}
export interface GptToolMessage {
  role: 'tool';
  content: GptMessageContent;
  tool_call_id: string;
}

export type GptMessage =
  | GptSystemMessage
  | GptUserMessage
  | GptAssistantMessage
  | GptToolMessage;

export function gpt({
  model = 'gpt-4o-mini',
  apikey,
  messages,
}: GptOption): DataFetcher<string> {
  return ({ env }) => {
    return fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey ?? env.OPENAI_APIKEY}`,
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
