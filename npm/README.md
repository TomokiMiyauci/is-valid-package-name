# npm

Return it's a valid npm package name or not.  
All functions never throw an error.

In Deno you can `import` as follows:

```ts
import {
  isValid,
  validate
} from "https://deno.land/x/is_valid_package_name/npm/mod.ts";
```

For `Node.js`, you can get the same functionality by looking at [here](../README.md) and installing the package.

## Overview

`isValid`:

```ts
isValid(undefined); // false
isValid(null); // false
isValid("~"); // false
isValid(".hello"); // false
isValid("package"); // true
isValid("under_score"); // true
```

`validate`:

```ts
validate(undefined); // [false, INVALID_NOT_STRING]
validate(undefined, true); // [false, [INVALID_NOT_STRING]]
validate("node_modules"); // [false, INVALID_CORE_MODULE_NAME]
validate("~"); // [false, INVALID_SPACIAL_CHAR]
```

## Naming Rules

Below is a list of rules that valid npm package name should conform to.

| Rule                                                                                            | Name                            | Return value                                               |
| ----------------------------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| The input type is `string`.                                                                     | `INVALID_NOT_STRING`            | `Name must be a string`                                    |
| Package name length must be greater than zero.                                                  | `INVALID_LENGTH_0`              | `Name length must be greater than zero`                    |
| Package name must not contain any leading or trailing spaces.                                   | `INVALID_TRIMMABLE`             | `Name cannot contain leading or trailing spaces`           |
| Package name must not start with period.                                                        | `INVALID_START_WITH_PERIOD`     | `Name cannot start with a period`                          |
| Package name should not start with underscore.                                                  | `INVALID_START_WITH_UNDERSCORE` | `Name cannot start with an underscore`                     |
| Package name must be lowercase.                                                                 | `INVALID_LETTER_CASE`           | `Name can no longer contain capital letters`               |
| Package name should not contain any of the following characters: ~)('!\* .                      | `INVALID_SPACIAL_CHAR`          | `Name can no longer contain special characters ('~'!()*')` |
| Package name cannot be the same as a node.js/io.js core module nor a reserved/blacklisted name. | `INVALID_CORE_MODULE_NAME`      | `Name is a core module name`                               |

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
isValid("_package"); // false
isValid("node_modules"); // false
isValid("favicon.ico"); // false
isValid("is-valid-package-name"); // true
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
validate(".package"); // [false, INVALID_START_WITH_UNDERSCORE]
validate(" Abc"); // [false, INVALID_TRIMMABLE]
const [result, error] = validate("fonction"); // [true, '']

if (!result) {
  console.error(error);
}
```

##### checkAll?

The `checkAll` option must be `true` to return all validation errors.

```ts
validate(".package", true); // [false, [INVALID_START_WITH_PERIOD]]
const [result, errors] = validate(" Abc", true); // [false, [INVALID_TRIMMABLE, INVALID_LETTER_CASE, INVALID_SPACIAL_CHAR]]

if (!result) {
  errors.forEach(error => console.error(error));
}
```
