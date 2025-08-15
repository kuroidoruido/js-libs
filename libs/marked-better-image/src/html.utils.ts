import { isDefinedAndNotEmpty } from '@anthonypena/fp';
import type { Marked } from 'marked';

export type FigureOptions = { id?: string; className?: string };
export function figure(
  { id, className }: FigureOptions,
  ...childrens: string[]
) {
  return `<figure${id ? ` id="${id}"` : ''}${className ? ` class="${className}"` : ''}>\n${childrens.join('\n')}\n</figure>`;
}

export function figcaption(markedInstance: Marked, ...childrens: string[]) {
  return `<figcaption>${markedInstance.parseInline(childrens.join('\n'))}</figcaption>`;
}

export type ImgOptions = { ariaHidden?: boolean; title?: string; alt?: string };
export function img(href: string, { ariaHidden, title, alt }: ImgOptions = {}) {
  const attributes = [
    // aria-hidden
    ariaHidden ? 'aria-hidden="true"' : undefined,
    // alt
    isDefinedAndNotEmpty(alt) ? `alt="${alt}"` : undefined,
    // title
    isDefinedAndNotEmpty(title) ? `title="${title}"` : undefined,
  ]
    .filter(isDefinedAndNotEmpty)
    .join(' ');
  return `<img src="${href}" ${attributes}/>`;
}
