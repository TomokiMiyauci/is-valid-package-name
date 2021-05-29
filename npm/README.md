# npm

Return it's a valid npm package name or not.  
All functions never throw an error.

In Deno you can `import` as follows:

```ts
import { isValid, validate } from 'https://deno.land/x/is_valid_package_name/npm/mod.ts'
```

For `Node.js`, you can get the same functionality by looking at [here](../README.md) and installing the package.

## Overview

`isValid`:

```ts
isValid(undefined) // false
isValid(null) // false
isValid('~') // false
isValid('.hello') // false
isValid('package') // true
isValid('under_score') // true
```

`validate`:

```ts
validate(undefined) // [false, 'NAME must be a string']
validate(undefined, true) // [false, ['NAME must be a string']]
validate('node_modules') // [false, 'Name is a core module name']
validate('~') // [false, 'Name can no longer contain special characters ('~'!()*')']
```

## Naming Rules

Below is a list of rules that valid npm package name should conform to.

| rule | return value |
| --|--|
| the input type is `string` | `NAME must be a string` |
| package name length must be greater than zero. | `Name length must be greater than zero` |
| package name should not contain any leading or trailing spaces. | `Name cannot contain leading or trailing spaces` |
| package name should not start with period. | `Name cannot start with a period` |
| package name should not start with  _ .  | `Name cannot start with an underscore` |
| all the characters in the package name must be lowercase. | `Name can no longer contain capital letters` |
| package name should not contain any of the following characters: ~)('!* . | `Name can no longer contain special characters ('~'!()*')` |
| package name cannot be the same as a node.js/io.js core module nor a reserved/blacklisted name. | `Name is a core module name`|

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
isValid('_package') // false
isValid('node_modules') // false
isValid('favicon.ico') // false
isValid('is-valid-package-name') // true
```

### validate

> Returns a `boolean` and error message tuple indicating whether the value is valid as a package name.

Type Definition:

```ts
declare const validate: <T extends boolean>(val: unknown, checkAll?: T | undefined) => T extends true ? [
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
validate('.package') // [false, 'Name cannot start with an underscore']
validate(' Abc') // [false, 'Name cannot contain leading or trailing spaces']
const [result, error] = validate('fonction') // [true, '']

if(!result) {
  console.error(error)
}
```

##### checkAll?

The `checkAll` option must be `true` to return all validation errors.

```ts
validate('.package', true) // [false, ['Name cannot start with a period']]
const [result, errors] = validate(' Abc', true) // [false, ['Name cannot contain leading or trailing spaces', 'Name can no longer contain capital letters']]

if(!result){
  errors.forEach((error) => console.error(error))
}
```
