import { Marked } from 'marked';
import { describe, expect, it } from 'vitest';

import { markedHeadingLinks } from './marked-heading-links';

describe(markedHeadingLinks.name, () => {
  it.each([
    [
      '# Foo',
      '<h1 id="foo">Foo<a href="#foo" class="anchor" aria-label="permalink">🔗</a></h1>\n',
    ],
    [
      '## Foo',
      '<h2 id="foo">Foo<a href="#foo" class="anchor" aria-label="permalink">🔗</a></h2>\n',
    ],
    [
      '### Foo',
      '<h3 id="foo">Foo<a href="#foo" class="anchor" aria-label="permalink">🔗</a></h3>\n',
    ],
    [
      '#### Foo',
      '<h4 id="foo">Foo<a href="#foo" class="anchor" aria-label="permalink">🔗</a></h4>\n',
    ],
    [
      '##### Foo',
      '<h5 id="foo">Foo<a href="#foo" class="anchor" aria-label="permalink">🔗</a></h5>\n',
    ],
    [
      '###### Foo',
      '<h6 id="foo">Foo<a href="#foo" class="anchor" aria-label="permalink">🔗</a></h6>\n',
    ],
  ])('should add link to heading (md="%s")', (md, html) => {
    const marked = new Marked({ headerIds: false, mangle: false });
    marked.use(markedHeadingLinks());

    expect(marked.parse(md)).toBe(html);
  });
  it('should parse simple file', () => {
    const marked = new Marked({ headerIds: false, mangle: false });
    marked.use(markedHeadingLinks());

    const md = `This is a simple introduction\n\n## Short heading\n\nPart sentence.\nAlso in the first paragraph.\n\nAnother paragraph.`;
    const html = `<p>This is a simple introduction</p>\n<h2 id="short-heading">Short heading<a href="#short-heading" class="anchor" aria-label="permalink">🔗</a></h2>\n<p>Part sentence.\nAlso in the first paragraph.</p>\n<p>Another paragraph.</p>\n`;
    expect(marked.parse(md)).toBe(html);
  });
  it('should use custom Marked instance', () => {
    const marked = new Marked({ headerIds: false });
    marked.use({ renderer: { text: () => '🦄' } });
    marked.use(markedHeadingLinks({ marked }));

    const md = `## Short heading`;
    const html = `<h2 id="short-heading">🦄<a href="#short-heading" class="anchor" aria-label="permalink">🔗</a></h2>\n`;
    expect(marked.parse(md)).toBe(html);
  });
  it('should use prefix', () => {
    const marked = new Marked({ headerIds: false, mangle: false });
    marked.use(markedHeadingLinks({ prefix: 'foo__' }));

    const md = `## Short heading`;
    const html = `<h2 id="foo__short-heading">Short heading<a href="#foo__short-heading" class="anchor" aria-label="permalink">🔗</a></h2>\n`;
    expect(marked.parse(md)).toBe(html);
  });
  it('should use linkClass', () => {
    const marked = new Marked({ headerIds: false, mangle: false });
    marked.use(markedHeadingLinks({ linkClass: 'my-link' }));

    const md = `## Short heading`;
    const html = `<h2 id="short-heading">Short heading<a href="#short-heading" class="my-link" aria-label="permalink">🔗</a></h2>\n`;
    expect(marked.parse(md)).toBe(html);
  });
  it('should use linkLabel', () => {
    const marked = new Marked({ headerIds: false, mangle: false });
    marked.use(markedHeadingLinks({ linkLabel: 'link' }));

    const md = `## Short heading`;
    const html = `<h2 id="short-heading">Short heading<a href="#short-heading" class="anchor" aria-label="permalink">link</a></h2>\n`;
    expect(marked.parse(md)).toBe(html);
  });
});
