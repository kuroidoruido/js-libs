import { Marked } from 'marked';
import { describe, expect, it } from 'vitest';

import { markedDjotDiv } from './marked-djot-div';

describe(markedDjotDiv.name, () => {
  it.each([
    [
      ':::\nfirst\n\nsecond\n:::',
      '<div>\n<p>first</p>\n<p>second</p>\n</div>\n',
    ],
    [
      '::: flex\nfirst\n\nsecond\n:::',
      '<div class="flex">\n<p>first</p>\n<p>second</p>\n</div>\n',
    ],
    [
      '::: flex\nfirst\n\nsecond\n',
      '<div class="flex">\n<p>first</p>\n<p>second</p>\n</div>\n',
    ],
    [
      '::: flex\nfirst\n\nsecond',
      '<div class="flex">\n<p>first</p>\n<p>second</p>\n</div>\n',
    ],
  ])('should create div group "%s"', (md, html) => {
    const marked = new Marked({ headerIds: false, mangle: false });
    marked.use(markedDjotDiv());

    expect(marked.parse(md)).toBe(html);
  });
});
