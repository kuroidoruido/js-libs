import { Marked } from 'marked';
import { describe, expect, it } from 'vitest';

import { markedBetterImage } from './marked-better-image';

describe(markedBetterImage.name, () => {
  it('should parse image without alt with simple img tag', () => {
    const marked = new Marked();
    marked.use(markedBetterImage());
    const md = `![](./foo.png)\n`;
    const html = `<img src="./foo.png" aria-hidden="true"/>\n`;
    expect(marked.parse(md)).toBe(html);
  });

  it('should parse image with alt with figure and figcaption', () => {
    const marked = new Marked();
    marked.use(markedBetterImage());
    const md = `![Alternative text](./foo.png)\n`;
    const html = `<figure>\n<img src="./foo.png" alt="Alternative text"/>\n<figcaption>Alternative text</figcaption>\n</figure>\n`;
    expect(marked.parse(md)).toBe(html);
  });

  it('should parse image with alt and title with figure and figcaption', () => {
    const marked = new Marked();
    marked.use(markedBetterImage());
    const md = `![Alternative text](./foo.png "Caption text")\n`;
    const html = `<figure>\n<img src="./foo.png" alt="Alternative text" title="Caption text"/>\n<figcaption>Caption text</figcaption>\n</figure>\n`;
    expect(marked.parse(md)).toBe(html);
  });

  it('should parse markdown in figcaption', () => {
    const marked = new Marked();
    marked.use(markedBetterImage());
    const md = `![Alternative text](./foo.png "*Caption* **text**")\n`;
    const html = `<figure>\n<img src="./foo.png" alt="Alternative text" title="*Caption* **text**"/>\n<figcaption><em>Caption</em> <strong>text</strong></figcaption>\n</figure>\n`;
    expect(marked.parse(md)).toBe(html);
  });

  it('should parse image with only title with figure and figcaption', () => {
    const marked = new Marked();
    marked.use(markedBetterImage());
    const md = `![](./foo.png "Caption text")\n`;
    const html = `<figure>\n<img src="./foo.png" alt="Caption text" title="Caption text"/>\n<figcaption>Caption text</figcaption>\n</figure>\n`;
    expect(marked.parse(md)).toBe(html);
  });

  it('should parse basic image beside other elements', () => {
    const marked = new Marked();
    marked.use(markedBetterImage());
    const md = `Some text.\n\n![](./foo.png)\n\nAnother text.`;
    const html = `<p>Some text.</p>\n<img src="./foo.png" aria-hidden="true"/>\n<p>Another text.</p>\n`;
    expect(marked.parse(md)).toBe(html);
  });

  it('should parse image beside other elements', () => {
    const marked = new Marked();
    marked.use(markedBetterImage());
    const md = `Some text.\n\n![Alternative text](./foo.png)\n\nAnother text.`;
    const html = `<p>Some text.</p>\n<figure>\n<img src="./foo.png" alt="Alternative text"/>\n<figcaption>Alternative text</figcaption>\n</figure>\n<p>Another text.</p>\n`;
    expect(marked.parse(md)).toBe(html);
  });

  it('should use custom Marked instance', () => {
    const marked = new Marked();
    marked.use({ renderer: { text: () => '🦄' } });
    marked.use(markedBetterImage({ marked }));

    const md = `Some text.\n\n![Alternative text](./foo.png)\n`;
    const html = `<p>🦄</p>\n<figure>\n<img src="./foo.png" alt="🦄"/>\n<figcaption>🦄</figcaption>\n</figure>\n`;
    expect(marked.parse(md)).toBe(html);
  });
  it('should parse image add is attribute on img tag', () => {
    const marked = new Marked();
    marked.use(markedBetterImage({ is: 'custom-component' }));
    const md = `![](./foo.png)\n`;
    const html = `<img src="./foo.png" aria-hidden="true" is="custom-component"/>\n`;
    expect(marked.parse(md)).toBe(html);
  });
});
