import { Marked } from 'marked';
import { describe, expect, it } from 'vitest';

import { markedStyledImage } from './marked-styled-image';

describe(markedStyledImage.name, () => {
  it.each([
    ['![](./img/foo.jpg)', '<p><img src="./img/foo.jpg" alt=""/></p>\n'],
    [`![](./img/foo.jpg "")`, '<p><img src="./img/foo.jpg" alt=""/></p>\n'],
    [
      `![](./img/foo.jpg "bg")`,
      '<p><img src="./img/foo.jpg" alt="" class="bg"/></p>\n',
    ],
    [
      `![](./img/foo.jpg "bg w-100")`,
      '<p><img src="./img/foo.jpg" alt="" class="bg w-100"/></p>\n',
    ],
    [
      `![](./img/foo.jpg "this is a title")`,
      '<p><img src="./img/foo.jpg" alt="" title="this is a title"/></p>\n',
    ],
    [
      `![](./img/foo.jpg "this is a title bg")`,
      '<p><img src="./img/foo.jpg" alt="" title="this is a title" class="bg"/></p>\n',
    ],
    [
      `![](./img/foo.jpg "this is a title bg w-100")`,
      '<p><img src="./img/foo.jpg" alt="" title="this is a title" class="bg w-100"/></p>\n',
    ],
    [
      `Should also work ![](./img/foo.jpg "this is a title bg w-100") inside a paragraph.`,
      '<p>Should also work <img src="./img/foo.jpg" alt="" title="this is a title" class="bg w-100"/> inside a paragraph.</p>\n',
    ],
  ])('should add defined class (md="%s" => html="%s")', (md, html) => {
    const marked = new Marked({ headerIds: false, mangle: false });
    marked.use(markedStyledImage({ knownStyles: ['bg', 'w-100'] }));

    expect(marked.parse(md)).toBe(html);
  });
});
