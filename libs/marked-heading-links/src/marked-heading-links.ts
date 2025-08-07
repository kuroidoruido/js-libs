import { Marked, MarkedExtension } from 'marked';
import { Slugger } from '@anthonypena/slugger';

export interface MarkedHeadingLinksOptions {
  prefix?: string;
  linkClass?: string;
  linkLabel?: string;
  marked?: Marked;
}

const defaultMarkedInstance = new Marked();

export function markedHeadingLinks({
  prefix = '',
  linkClass = 'anchor',
  linkLabel = '🔗',
  marked: markedInstance = defaultMarkedInstance,
}: MarkedHeadingLinksOptions = {}): MarkedExtension {
  let slugger: Slugger;
  return {
    hooks: {
      preprocess(src) {
        slugger = new Slugger(prefix);
        return src;
      },
    },
    renderer: {
      heading({ text, depth, raw }) {
        const id = slugger.slug(raw.slice(depth));
        const mdText = markedInstance.parseInline(text);
        return `<h${depth} id="${id}">${mdText}<a href="#${id}" class="${linkClass}" aria-label="permalink">${linkLabel}</a></h${depth}>\n`;
      },
    },
  };
}
