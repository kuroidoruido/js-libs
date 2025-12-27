import { Marked } from 'marked';
import { describe, expect, it } from 'vitest';

import { markedTocForSeries } from './marked-toc-for-series';

describe(markedTocForSeries.name, () => {
  it.each([
    [
      '<!-- TOC-SERIE:some -->',
      undefined,
      {
        some: {
          articles: [
            { label: 'foo', url: 'http://example.com/foo' },
            { label: 'bar baz', url: 'http://example.com/bar-baz' },
          ],
        },
      },
      '<nav data-serie="some">\n<ul>\n<li><a href="http://example.com/foo">foo</a></li>\n<li><a href="http://example.com/bar-baz">bar baz</a></li>\n</ul>\n</nav>\n',
    ],
    [
      '<!-- TOC-SERIE:serie-id-with-dash -->',
      'Serie',
      {
        'serie-id-with-dash': {
          articles: [
            { label: 'foo', url: 'http://example.com/foo' },
            { label: 'bar baz', url: 'http://example.com/bar-baz' },
          ],
        },
      },
      '<nav data-serie="serie-id-with-dash">\n<h2>Serie</h2>\n<ul>\n<li><a href="http://example.com/foo">foo</a></li>\n<li><a href="http://example.com/bar-baz">bar baz</a></li>\n</ul>\n</nav>\n',
    ],
    [
      '<!-- TOC-SERIE:serie_id_with_underscore -->',
      'Série',
      {
        serie_id_with_underscore: {
          articles: [
            { label: 'foo', url: 'http://example.com/foo' },
            { label: 'bar baz', url: 'http://example.com/bar-baz' },
          ],
        },
      },
      '<nav data-serie="serie_id_with_underscore">\n<h2>Série</h2>\n<ul>\n<li><a href="http://example.com/foo">foo</a></li>\n<li><a href="http://example.com/bar-baz">bar baz</a></li>\n</ul>\n</nav>\n',
    ],
    ['<!-- TOC-SERIE:empty -->', 'Yolo', { empty: { articles: [] } }, ''],
    ['<!-- TOC-SERIE:not-existing -->', '', { some: { articles: [] } }, ''],
  ])('should create TOC "%s"', (md, title, series, html) => {
    const marked = new Marked({ headerIds: false, mangle: false });
    marked.use(markedTocForSeries({ title, series }));

    expect(marked.parse(md)).toBe(html);
  });
});
