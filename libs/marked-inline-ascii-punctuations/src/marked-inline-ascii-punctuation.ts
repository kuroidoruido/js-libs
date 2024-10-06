import type { marked } from 'marked';
import { isNotDefined } from '@anthonypena/fp';

export interface MarkedInlineAsciiPunctuationsOptions {}

export function markedInlineAsciiPunctuations({}: MarkedInlineAsciiPunctuationsOptions = {}): marked.MarkedExtension {
  return {
    walkTokens(token) {
      if (isNotDefined(token)) {
        return;
      }
      if (
        token.type === 'blockquote' ||
        token.type === 'paragraph' ||
        token.type === 'em' ||
        token.type === 'strong' ||
        token.type === 'text'
      ) {
        token.text = apply(token.text);
      }
      if (token.type === 'image') {
        token.text = apply(token.text);
        token.title = apply(token.title);
      }
    },
  };
}

function apply(s: string): string {
  return (s ?? '')
    .replaceAll(' -- ', ' — ')
    .replaceAll(' --- ', ' — ')
    .replaceAll('...', '…');
}
