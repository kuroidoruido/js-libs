# @anthonypena/marked-toc-for-series

## Install

```Bash
npm i @anthonypena/marked-toc-for-series
```

## Examples

### Add the plugin to your Marked instance

```TypeScript
import { markedDjotDiv } from '@anthonypena/marked-toc-for-series';
import { Marked } from 'marked';

const marked = new Marked();

marked.use(markedTocForSeries({
    title: 'Série',
    series: {
        'this-is-the-serie-id': {
            articles: [
                { label: 'First one', url: 'https://example.com/first-one' },
                { label: 'Second one', url: '/second-one' },
            ]
        },
        'another-serie': {
            // ...
        }
    }
}));
```

## Transformation

From:

```Markdown
# Title

<!-- TOC-SERIE:this-is-the-serie-id -->

Some content...
```

to:

```Html
<h1>Title</h1>

<nav data-serie="this-is-the-serie-id">
    <h2>Série</h2>
    <ul>
        <li><a href="https://example.com/first-one">First one</a></li>
        <li><a href="/second-one">Second one</a></li>
    </ul>
</nav>

<p>Some content...</p>
```

> Note: This package does not provide build in style. You need to implement yourself style associated to classes you define.

## Docs

### Parameters

#### `title` (optional): the title you wan

Default: undefined

If defined, a title with an `<h2>` tag will be added, if not defined (undefined or null or empty) no title will be present.

#### `series`: the series definition

A dictionnary of serie definition.
