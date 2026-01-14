import { marked } from 'marked';
import {
  isDefined,
  isDefinedAndNotEmpty,
  isNotDefined,
  isNotDefinedOrEmpty,
} from '@anthonypena/fp';

export type SeriesDef = Record<string, SerieDef>;

export interface MarkedTocForSeriesOptions {
  title?: string | undefined | null;
  series: SeriesDef;
  minEntryCount?: number;
}

export interface SerieDef {
  articles: ArticleDef[];
}

export interface ArticleDef {
  label: string;
  url: string;
}

export function markedTocForSeries({
  title,
  series,
  minEntryCount = 1,
}: MarkedTocForSeriesOptions): marked.MarkedExtension {
  return {
    extensions: [
      {
        name: 'tocForSeries',
        level: 'block',
        start(src) {
          return src.match(/<!-- TOC-SERIE:.* -->/)?.index;
        },
        tokenizer(src): TocForSeriesToken | undefined {
          const match = /^<!-- TOC-SERIE:(.*) -->?/.exec(src);
          if (isDefined(match)) {
            const type = 'tocForSeries';
            const raw = src.slice(0, src.indexOf('-->') + 3);
            const serieId = match?.[1];
            const token: TocForSeriesToken = { type, raw, serieId };
            return token;
          }
          return undefined;
        },
        renderer(token) {
          if (!isTocForSeriesToken(token)) {
            return false;
          }
          const serie = series[token.serieId];
          if (
            isNotDefined(serie) ||
            isNotDefinedOrEmpty(serie.articles) ||
            serie.articles.length < minEntryCount
          ) {
            return '';
          }

          const titleHtml = isDefinedAndNotEmpty(title)
            ? `<h2>${title}</h2>`
            : undefined;
          return rows(
            `<nav data-serie="${token.serieId}">`,
            titleHtml,
            '<ul>',
            ...serie.articles.map(
              (article) =>
                `<li><a href="${article.url}">${article.label}</a></li>`,
            ),
            '</ul>',
            '</nav>',
          );
        },
      },
    ],
  };
}

interface TocForSeriesToken extends marked.Tokens.Generic {
  type: 'tocForSeries';
  serieId: string;
  raw: string;
}

export function isTocForSeriesToken(
  token: TocForSeriesToken | { type: unknown },
): token is TocForSeriesToken {
  return token.type === 'tocForSeries';
}

function rows(...s: (string | undefined | null)[]): string {
  return s.filter(isDefinedAndNotEmpty).join('\n') + '\n';
}
