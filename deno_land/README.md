# deno.land

Return it's a valid deno.land package name or not.  
All functions never throw an error.

In Deno you can `import` as follows:

```ts
import {
  isValidDenoLand,
  validateDenoLand
} from "https://deno.land/x/is_valid_package_name/deno_land/mod.ts";
```

For `Node.js`, you can get the same functionality by looking at [here](../README.md) and installing the package.

## Overview

`isValidDenoLand`:

```ts
isValidDenoLand(undefined); // false
isValidDenoLand(null); // false
isValidDenoLand("~"); // false
isValidDenoLand("is-valid-package-name"); // false
isValidDenoLand("Abc"); // false
isValidDenoLand("?hogehoge"); // false
```

`validateDenoLand`:

```ts
validateDenoLand(undefined); // [false, INVALID_NOT_STRING]
validateDenoLand(undefined, true); // [false, [INVALID_NOT_STRING]]
validateDenoLand("ab"); // [false, INVALID_LESS_THAN_3]
validateDenoLand("is_valid_package_name"); // [true, '']
```

## Naming Rules

Below is a list of rules that valid npm package name should conform to.

The rules from [source code](https://github.com/denoland/deno_registry2/blob/main/api/webhook/github.ts#L536).

| Rule                                                            | Name                      | Return value                                       |
| --------------------------------------------------------------- | ------------------------- | -------------------------------------------------- |
| The input type is `string`.                                     | `INVALID_NOT_STRING`      | `Name must be a string`                            |
| Package name length must be greater than zero.                  | `INVALID_LENGTH_0`        | `Name length must be greater than zero`            |
| Package name should not contain any leading or trailing spaces. | `INVALID_TRIMMABLE`       | `Name cannot contain leading or trailing spaces`   |
| Package name length should be greater equal than 3              | `INVALID_LESS_THAN_3`     | `Name length must be greater than 2`               |
| Package name length should be less than 41                      | `INVALID_GREATER_THAN_40` | `Name length must be less than 41`                 |
| Package name should only the characters a-z, 0-9 and \_ .       | `INVALID_SPECIAL_CHAR`    | `Name contains only the characters a-z, 0-9 and _` |

## API

### isValidDenoLand

> Returns whether the value is valid as a package name.

Type Definition:

```ts
declare const isValidDenoLand: (val: unknown) => boolean;
```

#### Example

```ts
isValidDenoLand(0); // false
isValidDenoLand({}); // false
isValidDenoLand("favicon.ico"); // false
isValidDenoLand("is-valid-package-name"); // false
isValidDenoLand("_package"); // true
isValidDenoLand("node_modules"); // true
```

### validateDenoLand

> Returns a `boolean` and error message tuple indicating whether the value is valid as a package name.

Type Definition:

```ts
declare const validateDenoLand: <T extends boolean = false>(
  val: unknown,
  checkAll?: T | undefined
) => T extends true ? [boolean, string[]] : [boolean, string];
```

#### Example

By default, it returns a result as soon as a validation error occurs.

```ts
validateDenoLand(".package"); // [false, INVALID_SPECIAL_CHAR]
validateDenoLand(" Abc"); // [false, INVALID_TRIMMABLE]
const [result, error] = validateDenoLand("fonction"); // [true, '']

if (!result) {
  console.error(error);
}
```

##### checkAll?

The `checkAll` option must be `true` to return all validation errors.

```ts
const [result, errors] = validateDenoLand("", true); // [false, [INVALID_LENGTH_0, INVALID_LESS_THAN_3, INVALID_SPECIAL_CHAR]]

if (!result) {
  errors.forEach(error => console.error(error));
}
```
