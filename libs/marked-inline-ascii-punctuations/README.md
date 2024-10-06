# @anthonypena/marked-inline-ascii-punctuations

## Install

```Bash
npm i @anthonypena/marked-inline-ascii-punctuations
```

## Examples

### Add the plugin to your Marked instance

```TypeScript
import { markedInlineAsciiPunctuations } from '@anthonypena/marked-inline-ascii-punctuations';
import { Marked } from 'marked';

const marked = new Marked();

marked.use(markedInlineAsciiPunctuations());
```

## Transformation

From:

```Markdown
This is a sentence... with an -- exergue.
```

to:

```Html
<p>This is a sentence… with an — exergue.</p>
```

## Docs

Supported punctuations:

- ' -- ' ⟹ ' — '
- ' --- ' ⟹ ' — '
- '...' ⟹ '…'
