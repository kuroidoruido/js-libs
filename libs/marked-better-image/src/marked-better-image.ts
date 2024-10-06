import { isDefinedAndNotEmpty, isNotDefinedOrEmpty } from '@anthonypena/fp';
import { marked, Marked } from 'marked';
import { figcaption, figure, img } from './html.utils';

export interface MarkedBetterImageOptions {
  marked?: Marked;
}

const defaultMarkedInstance = new Marked();
defaultMarkedInstance.setOptions({ mangle: false, headerIds: false });

const BETTER_IMAGE_TYPE = 'betterImage';

export function markedBetterImage({
  marked: markedInstance = defaultMarkedInstance,
}: MarkedBetterImageOptions = {}): marked.MarkedExtension {
  return {
    extensions: [
      {
        name: BETTER_IMAGE_TYPE,
        level: 'block',
        tokenizer(src) {
          const raw = src.slice(0, src.indexOf('\n\n'));
          const found = marked.lexer(raw);
          if (found.length === 1) {
            const paragraph = found[0]!;
            if (
              paragraph.type === 'paragraph' &&
              paragraph.tokens.length === 1 &&
              paragraph.tokens[0]!.type === 'image'
            ) {
              return { ...paragraph.tokens[0]!, type: BETTER_IMAGE_TYPE };
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
            ? markedInstance.parseInline(token.title)
            : token.title;
          const alt = isDefinedAndNotEmpty(token.text)
            ? markedInstance.parseInline(token.text)
            : token.text;

          if (isNotDefinedOrEmpty(href)) {
            return false;
          }
          if (isDefinedAndNotEmpty(title) && isDefinedAndNotEmpty(alt)) {
            return (
              figure(
                {},
                img(href, { title, alt }),
                figcaption(markedInstance, title),
              ) + '\n'
            );
          }
          if (isDefinedAndNotEmpty(title)) {
            return (
              figure(
                {},
                img(href, { title, alt: title }),
                figcaption(markedInstance, caption),
              ) + '\n'
            );
          }
          if (isDefinedAndNotEmpty(alt)) {
            return (
              figure({}, img(href, { alt }), figcaption(markedInstance, alt)) +
              '\n'
            );
          }
          return img(href, { ariaHidden: true }) + '\n';
        },
      },
    ],
  };
}

type BetterImageToken = Omit<marked.Tokens.Image, 'type'> & {
  type: typeof BETTER_IMAGE_TYPE;
};

export function isBetterImageToken(
  token: marked.Tokens.Generic | BetterImageToken,
): token is BetterImageToken {
  return token.type === BETTER_IMAGE_TYPE;
}
