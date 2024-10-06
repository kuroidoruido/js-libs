import { Marked, type marked } from 'marked';
import { Slugger } from '@anthonypena/slugger';

export interface MarkedHeadingLinksOptions {
  prefix?: string;
  linkClass?: string;
  linkLabel?: string;
  marked?: Marked;
}

const defaultMarkedInstance = new Marked();
defaultMarkedInstance.setOptions({ mangle: false, headerIds: false });

export function markedHeadingLinks({
  prefix = '',
  linkClass = 'anchor',
  linkLabel = '🔗',
  marked: markedInstance = defaultMarkedInstance,
}: MarkedHeadingLinksOptions = {}): marked.MarkedExtension {
  let slugger: Slugger;
  return {
    headerIds: false,
    hooks: {
      preprocess(src) {
        slugger = new Slugger(prefix);
        return src;
      },
    },
    renderer: {
      heading(text, level, raw) {
        const id = slugger.slug(raw);
        const mdText = markedInstance.parseInline(text);
        return `<h${level} id="${id}">${mdText}<a href="#${id}" class="${linkClass}" aria-label="permalink">${linkLabel}</a></h${level}>\n`;
      },
    },
  };
}
