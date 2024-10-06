# @anthonypena/slugger

## Install

```Bash
npm i @anthonypena/slugger
```

## Examples

```TypeScript
import { createBot, createBotSpace } from '@anthonypena/slugger'

const slugger = new Slugger();
slugger.slug('Short heading'); // short-heading
slugger.slug('A longer (sentence)[to slug]'); // a-longer-sentenceto-slug
slugger.slug('Handle double entry too'); // handle-double-entry-too
slugger.slug('Handle double entry too'); // handle-double-entry-too-1
slugger.slug('Ça va Gérôme ? Là ?'); // ca-va-gerome--la-
```

## Docs

### `new Slugger()`

Create a Slugger instance. Any slug from one instance will be unique.

Parameters:

- `prefix` (optional) : any string

Exemples:

```TypeScript
const slugger = new Slugger();
const sluggerWithPrefix = new Slugger('my-slug-prefix-');
```

### `Slugger.slug`

Build one unique slug from given string.

This function will remove every special characters, accents, etc. and keep only lower case letters and numbers.

Parameters:

- `s`: any string

Exemples:

```TypeScript
slugger.slug('Ça va Gérôme ? Là ?'); // ca-va-gerome--la-
```
