import { isDefinedAndNotEmpty, isNotDefinedOrEmpty } from '@anthonypena/fp';
import { marked, Marked, type MarkedExtension, type Tokens } from 'marked';
import { figcaption, figure, img } from './html.utils';

export interface MarkedBetterImageOptions {
  marked?: Marked;
  is?: string;
}

const defaultMarkedInstance = new Marked();

const BETTER_IMAGE_TYPE = 'betterImage';

export function markedBetterImage({
  marked: markedInstance = defaultMarkedInstance,
  is,
}: MarkedBetterImageOptions = {}): MarkedExtension {
  return {
    extensions: [
      {
        name: BETTER_IMAGE_TYPE,
        level: 'block',
        tokenizer(src) {
          const raw = src.slice(0, src.indexOf('\n\n'));
          const found = marked.lexer(raw);
          if (found.length === 1) {
            const element = found[0]!;
            if (
              element.type === 'paragraph' &&
              element.tokens?.length === 1 &&
              element.tokens[0]!.type === 'image'
            ) {
              return { ...element.tokens[0]!, type: BETTER_IMAGE_TYPE };
            } else if (element.type === 'blockquote') {
              if (
                element.tokens?.some(
                  (t) =>
                    t.type === 'paragraph' &&
                    t.tokens?.length === 1 &&
                    t.tokens[0]!.type === 'image',
                )
              ) {
                return {
                  ...element,
                  tokens: element.tokens.map((t) => {
                    if (
                      t.type === 'paragraph' &&
                      t.tokens?.length === 1 &&
                      t.tokens[0]!.type === 'image'
                    ) {
                      return { ...t.tokens[0], type: BETTER_IMAGE_TYPE };
                    }

                    return t;
                  }),
                };
              }
            }
          }
          return;
        },
        renderer(token) {
          if (!isBetterImageToken(token)) {
            return false;
          }
          const { href, title } = token;
          const caption = isDefinedAndNotEmpty(token.title)
            ? markedInstance.parseInline(token.title, { async: false })
            : token.title;
          const alt = isDefinedAndNotEmpty(token.text)
            ? markedInstance.parseInline(token.text, { async: false })
            : token.text;

          if (isNotDefinedOrEmpty(href)) {
            return false;
          }
          if (isDefinedAndNotEmpty(title) && isDefinedAndNotEmpty(alt)) {
            return (
              figure(
                {},
                img(href, { title, alt, is }),
                figcaption(markedInstance, title),
              ) + '\n'
            );
          }
          if (isDefinedAndNotEmpty(title)) {
            return (
              figure(
                {},
                img(href, { title, alt: title, is }),
                figcaption(markedInstance, caption!),
              ) + '\n'
            );
          }
          if (isDefinedAndNotEmpty(alt)) {
            return (
              figure(
                {},
                img(href, { alt, is }),
                figcaption(markedInstance, alt),
              ) + '\n'
            );
          }
          return img(href, { ariaHidden: true, is }) + '\n';
        },
      },
    ],
  };
}

type BetterImageToken = Omit<Tokens.Image, 'type'> & {
  type: typeof BETTER_IMAGE_TYPE;
};

export function isBetterImageToken(
  token: Tokens.Generic | BetterImageToken,
): token is BetterImageToken {
  return token.type === BETTER_IMAGE_TYPE;
}
