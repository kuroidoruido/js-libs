import { Marked } from 'marked';
import { describe, expect, it } from 'vitest';

import { markedImageGallery } from './marked-image-gallery';

const marked = new Marked({ headerIds: false, mangle: false });
marked.use(markedImageGallery());

describe(markedImageGallery.name, () => {
  it('should parse simple image gallery', () => {
    const md = `![Alternative text](./foo.png)\n![Alternative text](./bar.png)\n![Alternative text](./baz.png)\n`;
    const html =
      `<figure id="image-gallery-alternative-text" class="marked-image-gallery">\n` +
      `<img src="./foo.png" alt="Alternative text"/>\n` +
      `<img src="./bar.png" alt="Alternative text"/>\n` +
      `<img src="./baz.png" alt="Alternative text"/>\n` +
      `<figcaption>Alternative text</figcaption>\n` +
      `</figure>\n`;
    expect(marked.parse(md)).toBe(html);
  });
  it('should parse image gallery beside other elements', () => {
    const md = `## Heading\n\n![Alternative text](./foo.png)\n![Alternative text](./bar.png)\n![Alternative text](./baz.png)\n\nSome text.`;
    const html =
      `<h2>Heading</h2>\n` +
      `<figure id="image-gallery-alternative-text" class="marked-image-gallery">\n` +
      `<img src="./foo.png" alt="Alternative text"/>\n` +
      `<img src="./bar.png" alt="Alternative text"/>\n` +
      `<img src="./baz.png" alt="Alternative text"/>\n` +
      `<figcaption>Alternative text</figcaption>\n` +
      `</figure>\n` +
      `<p>Some text.</p>\n`;
    expect(marked.parse(md)).toBe(html);
  });
  it('should parse image gallery beside other elements', () => {
    const md = `## Heading\n\n![Alternative text 1](./foo.png "Gallery title")\n![Alternative text 2](./bar.png "Gallery title")\n![Alternative text 3](./baz.png "Gallery title")\n\nSome text.`;
    const html =
      `<h2>Heading</h2>\n` +
      `<figure id="image-gallery-gallery-title" class="marked-image-gallery">\n` +
      `<img src="./foo.png" alt="Alternative text 1"/>\n` +
      `<img src="./bar.png" alt="Alternative text 2"/>\n` +
      `<img src="./baz.png" alt="Alternative text 3"/>\n` +
      `<figcaption>Gallery title</figcaption>\n` +
      `</figure>\n` +
      `<p>Some text.</p>\n`;
    expect(marked.parse(md)).toBe(html);
  });
});
