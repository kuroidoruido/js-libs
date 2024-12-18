# @anthonypena/marked-styled-image

## Install

```Bash
npm i @anthonypena/marked-styled-image
```

## Examples

### Add the plugin to your Marked instance

```TypeScript
import { markedStyledImage } from '@anthonypena/marked-styled-image';
import { Marked } from 'marked';

const marked = new Marked();

marked.use(markedStyledImage({ knownStyles: ['bg', 'w-100'] }));
```

## Transformation

From:

```Markdown
![](./img/foo.jpg "bg w-100")
```

to:

```Html
<img src="./img/foo.jpg" alt="" class="bg w-100"/>
```
