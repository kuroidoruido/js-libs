# @anthonypena/marked-djot-div

## Install

```Bash
npm i @anthonypena/marked-djot-div
```

## Examples

### Add the plugin to your Marked instance

```TypeScript
import { markedDjotDiv } from '@anthonypena/marked-djot-div';
import { Marked } from 'marked';

const marked = new Marked();

marked.use(markedDjotDiv());
```

## Transformation

From:

```Markdown
:::
first paragraph

second paragraph
:::

::: flex
first column

second column
:::


```

to:

```Html
<div>
    <p>first paragraph</p>
    <p>second paragraph</p>
</div>
<div class="flex">
    <p>first column</p>
    <p>second column</p>
</div>
```

> Note: This package does not provide build in style. You need to implement yourself style associated to classes you define.
