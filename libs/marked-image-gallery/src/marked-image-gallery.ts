import { marked, Marked, type MarkedExtension, Tokens } from 'marked';
import { Slugger } from '@anthonypena/slugger';
import { isDefinedAndNotEmpty } from '@anthonypena/fp';
import { figcaption, figure, img } from './html.utils';

export interface MarkedImageGalleryOptions {
  marked?: Marked;
  idPrefix?: string;
}

const defaultMarkedInstance = new Marked();

const IMAGE_GALLERY_TYPE = 'imageGallery';

interface ImageGalleryToken {
  raw: string;
  type: typeof IMAGE_GALLERY_TYPE;
  images: Tokens.Image[];
}

export function markedImageGallery({
  idPrefix = 'image-gallery-',
  marked: markedInstance = defaultMarkedInstance,
}: MarkedImageGalleryOptions = {}): MarkedExtension {
  let slugger: Slugger;
  function beforeStartNewDocument() {
    slugger = new Slugger(idPrefix);
  }
  return {
    extensions: [
      {
        name: IMAGE_GALLERY_TYPE,
        level: 'block',
        tokenizer(src, tokens): ImageGalleryToken | undefined {
          if ((tokens ?? []).length === 0) {
            beforeStartNewDocument();
          }
          const blockEndIndex = src.indexOf('\n\n');
          const raw = src.substring(
            0,
            blockEndIndex === -1 ? undefined : blockEndIndex,
          );
          if (!isImageGalleryBlock(raw)) {
            return;
          }
          const rawParagraphToken = marked.lexer(raw)[0]!;
          const rawImagesTokens =
            rawParagraphToken?.type === 'paragraph'
              ? (rawParagraphToken.tokens ?? [])
              : [];
          const images = rawImagesTokens.filter(
            (t): t is Tokens.Image => t.type === 'image',
          );

          if (images.length <= 1) {
            return;
          }

          return {
            raw,
            type: IMAGE_GALLERY_TYPE,
            images,
          };
        },
        renderer(token: Tokens.Generic | ImageGalleryToken) {
          if (!isImageGalleryToken(token)) {
            return false;
          }
          const galleryTitle = token.images[0]!.title ?? token.images[0]!.text;
          return (
            figure(
              {
                id: slugger.slug(galleryTitle),
                className: 'marked-image-gallery',
              },
              ...token.images.map((image) =>
                img(image.href, { alt: image.text }),
              ),
              figcaption(markedInstance, galleryTitle),
            ) + '\n'
          );
        },
      },
    ],
  };
}

function isImageGalleryBlock(src: string): boolean {
  return src
    .split('\n')
    .filter(isDefinedAndNotEmpty)
    .every((row) => row.startsWith('!['));
}

function isImageGalleryToken(
  token: ImageGalleryToken | { type: unknown },
): token is ImageGalleryToken {
  return token.type === IMAGE_GALLERY_TYPE;
}
