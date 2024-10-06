# @anthonypena/marked-image-gallery

## Install

```Bash
npm i @anthonypena/marked-image-gallery
```

## Examples

### Add the plugin to your Marked instance

```TypeScript
import { markedImageGallery } from '@anthonypena/marked-image-gallery';
import { Marked } from 'marked';

const marked = new Marked();

marked.use(markedImageGallery());
```

## Transformation

From:

```Markdown
![Alternative text](./foo.png)
![Alternative text](./bar.png)
![Alternative text](./baz.png)
```

to:

```Html
<figure id="image-gallery-alternative-text" class="marked-image-gallery">
    <img src="./foo.png" alt="Alternative text"/>
    <img src="./bar.png" alt="Alternative text"/>
    <img src="./baz.png" alt="Alternative text"/>
    <figcaption>Alternative text</figcaption>
</figure>
```

## Docs

### Parameters

#### `idPrefix` (optional): an id prefix

Default: ''

#### `marked` (optional): a Marked instance

Default: new Marked instance
