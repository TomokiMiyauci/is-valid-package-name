# nest.land

Return it's a valid nest.land package name or not.  
All functions never throw an error.

In Deno you can `import` as follows:

```ts
import { isValid, validate } from 'https://deno.land/x/is_valid_package_name/nest_land/mod.ts'
```

For `Node.js`, you can get the same functionality by looking at [here](../README.md) and installing the package.

## Overview

`isValid`:

```ts
isValid(undefined) // false
isValid(null) // false
isValid('~') // false
isValid('is-valid-package-name') // false
isValid('Abc') // false
isValid('?hogehoge') // false
```

`validate`:

```ts
validate(undefined) // [false, 'Name must be a string']
validate(undefined, true) // [false, ['Name must be a string']]
validate('ab') // [false, 'Name length must be greater equal than 3']
validate('is_valid_package_name') // [true, '']
```

## Naming Rules

Below is a list of rules that valid npm package name should conform to.

| rule | return value |
| --|--|
| the input type is `string` | `Name must be a string` |
| package name length must be greater than zero. | `Name length must be greater than zero` |
| package name should not contain any leading or trailing spaces. | `Name cannot contain leading or trailing spaces` |
| package name length should be greater equal than 2 | `Name length must be greater equal than 2`|
| package name length should be less equal than 40 | `Name length must be less equal than 40` |
| package name should only the characters a-z, 0-9 and _ . | `Name contains only the characters a-z, 0-9 and _` |
| package name cannot be the same as core module nor a reserved/blacklisted name.| `Name is standard package name or reserved name`|

reserved/blacklisted name is [here](./_constants.ts#L7).

## API

### isValid

> Returns whether the value is valid as a package name.

Type Definition:

```ts
declare const isValid: (val: unknown) => boolean;
```

#### Example

```ts
isValid(0) // false
isValid({}) // false
isValid('favicon.ico') // false
isValid('is-valid-package-name') // false
isValid('node') // false
isValid('_package') // true
```

### validate

> Returns a `boolean` and error message tuple indicating whether the value is valid as a package name.

Type Definition:

```ts
declare const validate: <T extends boolean = false>(val: unknown, checkAll?: T | undefined) => T extends true ? [
    boolean,
    string[]
] : [
    boolean,
    string
];
```

#### Example

By default, it returns a result as soon as a validation error occurs.

```ts
validate('.package') // [false, 'Name contains only the characters a-z, 0-9 and _']
validate(' Abc') // [false, 'Name cannot contain leading or trailing spaces']
const [result, error] = validate('fonction') // [true, '']

if(!result) {
  console.error(error)
}
```

##### checkAll?

The `checkAll` option must be `true` to return all validation errors.

```ts
const [result, errors] = validate('', true) // [false, ['Name length must be greater than zero, 'Name length must be greater equal than 2', 'Name contains only the characters a-z, 0-9 and _']]

if(!result){
  errors.forEach((error) => console.error(error))
}
```
