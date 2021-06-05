# nest.land

Return it's a valid nest.land package name or not.  
All functions never throw an error.

In Deno you can `import` as follows:

```ts
import {
  isValid,
  validate
} from "https://deno.land/x/is_valid_package_name/nest_land/mod.ts";
```

For `Node.js`, you can get the same functionality by looking at [here](../README.md) and installing the package.

## Overview

`isValid`:

```ts
isValid(undefined); // false
isValid(null); // false
isValid("~"); // false
isValid("is-valid-package-name"); // false
isValid("Abc"); // false
isValid("?hogehoge"); // false
```

`validate`:

```ts
validate(undefined); // [false, INVALID_NOT_STRING]
validate(undefined, true); // [false, [INVALID_NOT_STRING]]
validate("a"); // [false, INVALID_LESS_THAN_2]
validate("is_valid_package_name"); // [true, '']
```

## Naming Rules

Below is a list of rules that valid npm package name should conform to.

The rules from [source code](https://github.com/nestdotland/x/blob/master/src/routes/package.ts#L94).

| Rule                                                            | Name                       | Return value                                       |
| --------------------------------------------------------------- | -------------------------- | -------------------------------------------------- |
| The input type is `string`.                                     | `INVALID_NOT_STRING`       | `Name must be a string`                            |
| Package name length must be greater than zero.                  | `INVALID_LENGTH_0`         | `Name length must be greater than zero`            |
| Package name should not contain any leading or trailing spaces. | `INVALID_TRIMMABLE`        | `Name cannot contain leading or trailing spaces`   |
| Package name length should be greater than 1.                   | `INVALID_LESS_THAN_2`      | `Name length must be greater than 1`               |
| Package name length should be less than 41.                     | `INVALID_GREATER_THAN_40`  | `Name length must be less than 41`                 |
| Package name should only the characters a-z, 0-9 and \_ .       | `INVALID_SPECIAL_CHAR`     | `Name contains only the characters a-z, 0-9 and _` |
| Package name cannot be the same as core module name.            | `INVALID_CORE_MODULE_NAME` | `Name is standard module name`                     |
| Package name cannot be the same as reserved name.               | `INVALID_RESERVED_NAME`    | `Name is reserved name`                            |

core module and reserved name is [here](./_constants.ts#L7).

## API

### isValid

> Returns whether the value is valid as a package name.

Type Definition:

```ts
declare const isValid: (val: unknown) => boolean;
```

#### Example

```ts
isValid(0); // false
isValid({}); // false
isValid("favicon.ico"); // false
isValid("is-valid-package-name"); // false
isValid("node"); // false
isValid("_package"); // true
```

### validate

> Returns a `boolean` and error message tuple indicating whether the value is valid as a package name.

Type Definition:

```ts
declare const validate: <T extends boolean = false>(
  val: unknown,
  checkAll?: T | undefined
) => T extends true ? [boolean, string[]] : [boolean, string];
```

#### Example

By default, it returns a result as soon as a validation error occurs.

```ts
validate(".package"); // [false, INVALID_SPECIAL_CHAR]
validate(" Abc"); // [false, INVALID_TRIMMABLE]
const [result, error] = validate("fonction"); // [true, '']

if (!result) {
  console.error(error);
}
```

##### checkAll?

The `checkAll` option must be `true` to return all validation errors.

```ts
const [result, errors] = validate("", true); // [false, [INVALID_LENGTH_0, INVALID_LESS_THAN_2, INVALID_SPECIAL_CHAR]]

if (!result) {
  errors.forEach(error => console.error(error));
}
```
