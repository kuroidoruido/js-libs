# @anthonypena/types-utils

## Install

```Bash
npm i @anthonypena/types-utils
```

## Docs

### Brand

```TypeScript
import { Brand, BrandBase, brandKit } from '@anthonypena/types-utils';


type PersonId = Brand<string, 'PersonId'>;
const { fromBrand: fromPersonId, makeBrand: makePersonId } = brandKit<PersonId>((x) => {
    if (!x?.startsWith('P')) {
        throw new Error('Invalid Person id: ' + x);
    }
});

const id1 = makeSpecificId('id1');
const id1str = fromSpecificId(id1);

type AccountId = Brand<string, 'AccountId'>;
const { fromBrand: fromAccountId, makeBrand: makeAccountId } = brandKit<AccountId>();

function doSomethingWithPerson(id: PersonId) {}
function doSomethingWithAccount(id: AccountId) {}

const a1 = makeAccountId('A');
const p1 = makePersonId('P1');

doSomethingWithAccount(a1); // compile time TypeScript error
doSomethingWithPerson(p1); // compile time TypeScript error

const p2 = makePersonId('2'); // runtime error

type SpecificIdInner = BrandBase<typeof id1>; // SpecificIdInner = string
```
