# @anthonypena/simple-bot

## Install

```Bash
npm i @anthonypena/simple-bot
```

## Examples

### Push to Google Chat

Every time the script will be run, it will trigger the bot, build the static message and emit the message to the specified Google Chat space.

```TypeScript
import { createBot, createBotSpace } from '@anthonypena/simple-bot'
import { dispatch, googleChat } from '@anthonypena/simple-bot/emitters'
import { http, nothing, someData } from '@anthonypena/simple-bot/fetchers'
import { always } from '@anthonypena/simple-bot/triggers'

const speakerBot = createBot({
    name: 'The Static Bot 🤖',
    trigger: always(),
    data: nothing(),
    message: () => 'This is a static message!',
    emitter: dispatch(googleChat({ spaceUrl: 'https://chat.googleapis.com/...' }))
})

createBotSpace([
    speakerBot
], { env: process.env }).run()
```

## Docs

### Triggers

#### `allTrigger`

Trigger the bot when every triggers in parameter are triggered.

Parameters:

- `triggers`: a list of Trigger

Exemple:

```TypeScript
const bot = createBot({
    trigger: allTrigger(always(), whenEnvIsDefined('FOO')),
    // ...
})
```

#### `always`

Trigger the bot when every time.

Exemple:

```TypeScript
const bot = createBot({
    trigger: always(),
    // ...
})
```

#### `anyTrigger`

Trigger the bot when any number (at least one) of the trigger in parameter is triggered.

Parameters:

- `triggers`: a list of Trigger

Exemple:

```TypeScript
const bot = createBot({
    trigger: anyTrigger(whenEnvIsDefined('FOO'), whenEnvIsDefined('BAR')),
    // ...
})
```

#### `never`

Never trigger the bot.

Exemple:

```TypeScript
const bot = createBot({
    trigger: never(),
    // ...
})
```

#### `whenEnvIsDefined`

Trigger the bot if the environment variable in parameter is defined.

Parameters:

- `envVar`: a string with the name of an environnement variable.

Exemple:

```TypeScript
const bot = createBot({
    trigger: whenEnvIsDefined('FOO'),
    // ...
})
```

### Fetchers

#### `gpt`

Ask OpenAI/GPT something.

Parameters:

- `messages`: the message to build chat initialization. [See official documentation for more details.](https://platform.openai.com/docs/api-reference/chat/create#chat-create-messages)
- `model` (optional): the model to use. [See official documentation to get available values (check /v1/chat/completion)](https://platform.openai.com/docs/models/model-endpoint-compatibility) (default: 'gpt-4o-mini')
- `apikey` (optional): an OpenAI API Key. (default: env.OPENAI_APIKEY)

Exemple:

```TypeScript
const bot = createBot({
    data: gpt({ messages:  [{
                role: 'user',
                content: 'Tell me joke',
            }]
        }),
    // ...
})
```

#### `http`

Get some data with an HTTP call through `fetch`.

Parameters:

- `request`: same as `fetch` parameter `RequestInit` with mandatory `url` field.
- `deserializer` (optional): specify what to extract from http call response (default: extract body as json and deserialize it)

Exemple:

```TypeScript
const bot = createBot({
    data: http({ url: 'http://example.com', headers: { 'Authorization': 'Bearer some-token' } }),
    // ...
})
```

#### `nothing`

Return an empty object.

Exemple:

```TypeScript
const bot = createBot({
    data: nothing(),
    // ...
})
```

#### `someData`

Combine the result of multiple Fetchers as one unique object.

Parameters:

- `fetchers`: a dictionary of Fetcher

Exemple:

```TypeScript
const bot = createBot({
    data: someData({ foo: http({ url: 'http://foo.com' }), bar: http({ url: 'http://bar.com' }) }),
    // ...
})
```

### Emitters

#### `dispatch`

Emit the message to every Emitters in parameters.

Parameters:

- `emitters`: every emitters you want to use.

Exemple:

```TypeScript
const bot = createBot({
    emitter: dispatch(
        googleChat({ spaceUrl: 'https://chat.googleapis.com/...' }),
        googleChat({ spaceUrl: 'https://chat.googleapis.com/...' }),
        printInConsole(),
    ),
    // ...
})
```

#### `googleChat`

Emit the message to a Google Chat space.

Parameters:

- `{spaceUrl}`: the webhook URL of the chat.

Exemple:

```TypeScript
const bot = createBot({
    emitter: googleChat({ spaceUrl: 'https://chat.googleapis.com/...' }),
    // ...
})
```

#### `printInConsole`

Emit the message in the console.

Exemple:

```TypeScript
const bot = createBot({
    emitter: printInConsole(),
    // ...
})
```

### Environment Variables

- `DRY`: force dry mode. When `DRY=true`, replace the emitters with the `printInConsole` emitter.
