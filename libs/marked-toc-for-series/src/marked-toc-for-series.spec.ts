import { Marked } from 'marked';
import { describe, expect, it } from 'vitest';

import {
  markedTocForSeries,
  MarkedTocForSeriesOptions,
} from './marked-toc-for-series';

describe(markedTocForSeries.name, () => {
  it.each([
    [
      '<!-- TOC-SERIE:some -->',
      {
        title: undefined,
        series: {
          some: {
            articles: [
              { label: 'foo', url: 'http://example.com/foo' },
              { label: 'bar baz', url: 'http://example.com/bar-baz' },
            ],
          },
        },
      },
      '<nav data-serie="some">\n<ul>\n<li><a href="http://example.com/foo">foo</a></li>\n<li><a href="http://example.com/bar-baz">bar baz</a></li>\n</ul>\n</nav>\n',
    ],
    [
      '<!-- TOC-SERIE:serie-id-with-dash -->',
      {
        title: 'Serie',
        series: {
          'serie-id-with-dash': {
            articles: [
              { label: 'foo', url: 'http://example.com/foo' },
              { label: 'bar baz', url: 'http://example.com/bar-baz' },
            ],
          },
        },
      },
      '<nav data-serie="serie-id-with-dash">\n<h2>Serie</h2>\n<ul>\n<li><a href="http://example.com/foo">foo</a></li>\n<li><a href="http://example.com/bar-baz">bar baz</a></li>\n</ul>\n</nav>\n',
    ],
    [
      '<!-- TOC-SERIE:serie_id_with_underscore -->',
      {
        title: 'Série',
        series: {
          serie_id_with_underscore: {
            articles: [
              { label: 'foo', url: 'http://example.com/foo' },
              { label: 'bar baz', url: 'http://example.com/bar-baz' },
            ],
          },
        },
      },
      '<nav data-serie="serie_id_with_underscore">\n<h2>Série</h2>\n<ul>\n<li><a href="http://example.com/foo">foo</a></li>\n<li><a href="http://example.com/bar-baz">bar baz</a></li>\n</ul>\n</nav>\n',
    ],
    [
      '<!-- TOC-SERIE:empty -->',
      { title: 'Yolo', series: { empty: { articles: [] } } },
      '',
    ],
    [
      '<!-- TOC-SERIE:not-existing -->',
      { title: '', series: { some: { articles: [] } } },
      '',
    ],
    [
      '<!-- TOC-SERIE:under-min-0-2 -->',
      {
        title: '',
        series: { 'under-min-0-2': { articles: [] } },
        minEntryCount: 2,
      },
      '',
    ],
    [
      '<!-- TOC-SERIE:under-min-1-2 -->',
      {
        title: 'Série',
        series: {
          'under-min-1-2': {
            articles: [{ label: 'foo', url: 'http://example.com/foo' }],
          },
        },
        minEntryCount: 2,
      },
      '',
    ],
    [
      '<!-- TOC-SERIE:equal-min-2-2 -->',
      {
        title: 'Série',
        series: {
          'equal-min-2-2': {
            articles: [
              { label: 'foo', url: 'http://example.com/foo' },
              { label: 'bar baz', url: 'http://example.com/bar-baz' },
            ],
          },
        },
        minEntryCount: 2,
      },
      '<nav data-serie="equal-min-2-2">\n<h2>Série</h2>\n<ul>\n<li><a href="http://example.com/foo">foo</a></li>\n<li><a href="http://example.com/bar-baz">bar baz</a></li>\n</ul>\n</nav>\n',
    ],
    [
      '<!-- TOC-SERIE:over-min-3-2 -->',
      {
        title: 'Série',
        series: {
          'over-min-3-2': {
            articles: [
              { label: 'foo', url: 'http://example.com/foo' },
              { label: 'bar baz', url: 'http://example.com/bar-baz' },
              { label: 'baz', url: 'http://example.com/baz' },
            ],
          },
        },
        minEntryCount: 2,
      },
      '<nav data-serie="over-min-3-2">\n<h2>Série</h2>\n<ul>\n<li><a href="http://example.com/foo">foo</a></li>\n<li><a href="http://example.com/bar-baz">bar baz</a></li>\n<li><a href="http://example.com/baz">baz</a></li>\n</ul>\n</nav>\n',
    ],
  ])(
    'should create TOC "%s"',
    (md: string, options: MarkedTocForSeriesOptions, html: string) => {
      const marked = new Marked({ headerIds: false, mangle: false });
      marked.use(markedTocForSeries(options));

      expect(marked.parse(md)).toBe(html);
    },
  );
});
