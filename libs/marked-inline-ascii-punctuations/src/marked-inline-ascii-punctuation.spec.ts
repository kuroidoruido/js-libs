import { Marked } from 'marked';
import { describe, expect, it } from 'vitest';

import { markedInlineAsciiPunctuations } from './marked-inline-ascii-punctuation';

describe(markedInlineAsciiPunctuations.name, () => {
  it.each([
    [' -- ', '<p> — </p>\n'],
    ['a --- ', '<p>a — </p>\n'],
    ['...', '<p>…</p>\n'],
  ])('should add link to heading (md="%s" => html="%s")', (md, html) => {
    const marked = new Marked({ headerIds: false, mangle: false });
    marked.use(markedInlineAsciiPunctuations());

    expect(marked.parse(md)).toBe(html);
  });
});
