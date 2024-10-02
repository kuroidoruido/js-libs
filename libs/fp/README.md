# @anthonypena/fp

## Install

```Bash
npm i @anthonypena/fp
```

## Examples

### Simple array filtering

```TypeScript
import { isDefined, isDefinedAndNotEmpty, not } from '@anthonypena/fp';

const data = [
    { id: 'A', height: 10 },
    { id: 'B', name: 'B', height: 10 },
    { id: 'C', name: 'C', height: 12 },
    { id: 'C', name: '', height: 9 },
    null
];

function isTall(x: { height: number }) {
    return x.height > 10;
}

const res = data
    .filter(isDefined)
    .filter(not(isTall))
    .map(x => x.name)
    .filter(isDefinedAndNotEmpty);
// res = [ { id: 'B', name: 'B', height: 10 } ]
```

## Docs

#### `deepClone`

This function will create a copy the passed value in most of the case.

Exception: undefined, null, number, boolean, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY

Parameters:

- `x`: any value

Exemples:

```TypeScript
deepClone(1);
deepClone(Number.NEGATIVE_INFINITY);
deepClone('A');
deepClone({ a: 1 });
deepClone({ a: { b: 'C' } });
deepClone(['A']);
deepClone([[[['A']]]]);
```

#### `identity`

This function will return the first parameter.

Parameters:

- `x`: the first parameter

Exemples:

```TypeScript
const res = identity(1); // res = 1

[1, 2, 3].map(identity); // [ 1, 2, 3 ]
```

#### `isDifferent`

This function compare two value of the same type.

Parameters:

- `a`: one value
- `b`: another value

Exemples:

```TypeScript
isDifferent(1,1) // false
isDifferent(1,2) // true
isDifferent({ a: 'A' }, { a: 'A' }) // false
isDifferent({ a: 'A' }, { a: 'B' }) // true
```

> Note: opposite of `isEqual`

#### `isDefined`

This function check passed value is defined with correct TypeScript type assertion.

Parameters:

- `x`: one value which may be undefined or null

Exemples:

```TypeScript
isDefined(1) // true
isDefined('A') // true
isDefined({ a: 'A' }) // true
isDefined([]) // true
isDefined(undefined) // false
isDefined(null) // false
```

#### `isDefinedAndNotEmpty`

This function check passed value is defined and is not empty with correct TypeScript type assertion.

Parameters:

- `x`: one value which have a length and may be undefined or null

Exemples:

```TypeScript
isDefinedAndNotEmpty('') // false
isDefinedAndNotEmpty('A') // true
isDefinedAndNotEmpty([]) // false
isDefinedAndNotEmpty(['A']) // true
isDefinedAndNotEmpty(undefined) // false
isDefinedAndNotEmpty(null) // false
```

#### `isEmpty`

This function check if passed value is empty with correct TypeScript type assertion.

Parameters:

- `x`: one value which have a length

Exemples:

```TypeScript
isEmpty([]) // true
isEmpty('') // true
isEmpty(['A']) // false
isEmpty('A') // false
```

#### `isEqual`

This function compare two value of the same type.

Parameters:

- `a`: one value
- `b`: another value

Exemples:

```TypeScript
isEqual(1,1) // true
isEqual(1,2) // false
isEqual({ a: 'A' }, { a: 'A' }) // true
isEqual({ a: 'A' }, { a: 'B' }) // false
```

#### `isNotDefined`

This function check passed value is not defined with correct TypeScript type assertion.

Parameters:

- `x`: one value which may be undefined or null

Exemples:

```TypeScript
isNotDefined(1) // false
isNotDefined('A') // false
isNotDefined({ a: 'A' }) // false
isNotDefined([]) // false
isNotDefined(undefined) // true
isNotDefined(null) // true
```

> Note: opposite of `isDefined`

#### `isNotDefinedOrEmpty`

This function check passed value is not defined or is empty with correct TypeScript type assertion.

Parameters:

- `x`: one value which have a length and may be undefined or null

Exemples:

```TypeScript
isNotDefinedOrEmpty('') // true
isNotDefinedOrEmpty('A') // false
isNotDefinedOrEmpty([]) // true
isNotDefinedOrEmpty(['A']) // false
isNotDefinedOrEmpty(undefined) // true
isNotDefinedOrEmpty(null) // true
```

#### `isNotEmpty`

This function check if passed value is not empty with correct TypeScript type assertion.

Parameters:

- `x`: one value which have a length

Exemples:

```TypeScript
isNotEmpty([]) // false
isNotEmpty('') // false
isNotEmpty(['A']) // true
isNotEmpty('A') // true
```

> Note: opposite of `isEmpty`

#### `noop`

This function do nothing.

Exemples:

```TypeScript
noop();
[1, 2, 3].forEach(noop);
```

#### `not`

This function will negate the boolean value in parameter.

Parameters:

- `x`: a boolean value

Exemples:

```TypeScript
not(true); // false
not(false); // true
```

#### `notf`

This function will negate the result of the function in parameter.

Parameters:

- `f`: a function which return boolean

Exemples:

```TypeScript
[1,2,3].map(notf(isEven)); // [true, false, true]
// or
const isOdd = notf(isEven);
[1,2,3].map(isOdd); // [true, false, true]
```
