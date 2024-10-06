# @anthonypena/marked-better-image

## Install

```Bash
npm i @anthonypena/marked-better-image
```

## Examples

### Add the plugin to your Marked instance

```TypeScript
import { markedBetterImage } from '@anthonypena/marked-better-image';
import { Marked } from 'marked';

const marked = new Marked();

marked.use(markedBetterImage());
```

## Transformation

From:

```Markdown
![Alternative text](./foo.png)

![Alternative text](./foo.png "Caption text")

![Alternative text](./foo.png "*Caption* **text**")
```

to:

```Html
<figure>
    <img src="./foo.png" alt="Alternative text"/>
    <figcaption>Alternative text</figcaption>
</figure>

<figure>
    <img src="./foo.png" alt="Alternative text" title="Caption text"/>
    <figcaption>Caption text</figcaption>
</figure>

<figure>
    <img src="./foo.png" alt="Alternative text" title="*Caption* **text**"/>
    <figcaption><em>Caption</em> <strong>text</strong></figcaption>
</figure>
```

## Docs

### Parameters

#### `marked` (optional): a Marked instance

Default: new Marked instance
