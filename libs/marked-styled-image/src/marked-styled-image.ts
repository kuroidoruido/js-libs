import type { marked } from 'marked';
import { isDefinedAndNotEmpty, isNotDefinedOrEmpty } from '@anthonypena/fp';

export interface MarkedStyledImageOptions {
  knownStyles: string[];
}

export function markedStyledImage({
  knownStyles,
}: MarkedStyledImageOptions): marked.MarkedExtension {
  return {
    renderer: {
      image(href, title, text) {
        if (isNotDefinedOrEmpty(title)) {
          return `<img src="${href}" alt="${text}"/>`;
        }
        const titleParts = (title ?? '').split(' ');
        const styles = titleParts.filter((s) => knownStyles.includes(s));
        const cleanTitle = titleParts.filter((s) => !styles.includes(s));
        const attributes = [
          `src="${href}"`,
          ` alt="${text}"`,
          appendAttr('title', cleanTitle),
          appendAttr('class', styles),
        ].join('');
        return `<img ${attributes}/>`;
      },
    },
  };
}

function appendAttr(attr: string, list: string[]): string {
  if (isDefinedAndNotEmpty(list)) {
    return ` ${attr}="${list.join(' ')}"`;
  }
  return '';
}
