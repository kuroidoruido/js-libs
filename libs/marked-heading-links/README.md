# @anthonypena/marked-heading-links

Need `marked` >= 16

## Install

```Bash
npm i @anthonypena/marked-heading-links
```

## Examples

### Add the plugin to your Marked instance

```TypeScript
import { markedHeadingLinks } from '@anthonypena/marked-heading-links';
import { Marked } from 'marked';

const marked = new Marked();

marked.use(markedHeadingLinks());
```

## Transformation

From:

```Markdown
## Foo
```

to:

```Html
<h2 id="foo">Foo<a href="#foo" class="anchor" aria-label="permalink">🔗</a></h2>

```

## Docs

### Parameters

#### `prefix` (optional): id prefix

Default: ''

#### `linkClass` (optional): class to add to link

Default: 'anchor'

#### `linkLabel` (optional): label of the link

Default: '🔗'

#### `marked` (optional): a Marked instance

Default: new Marked instance
