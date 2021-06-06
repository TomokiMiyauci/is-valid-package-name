<p align="center">
  <img alt="logo image" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1622961448/projects/is-valid-package-name/logo.png" />
  <h1 align="center">is-valid-package-name</h1>
</p>

<p align="center">
Validation for package name
</p>

<div align="center">

[![test](https://github.com/TomokiMiyauci/is-valid-package-name/actions/workflows/test.yml/badge.svg)](https://github.com/TomokiMiyauci/is-valid-package-name/actions/workflows/test.yml)
[![GitHub release](https://img.shields.io/github/release/TomokiMiyauci/is-valid-package-name.svg)](https://github.com/TomokiMiyauci/is-valid-package-name/releases)
[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno&labelColor=black)](https://deno.land/x/is_valid_package_name)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/is_valid_package_name)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/is_valid_package_name/mod.ts)
[![deno version](https://img.shields.io/badge/deno-^1.6.0-lightgrey?logo=deno)](https://github.com/denoland/deno)
![node support version](https://img.shields.io/badge/node-%5E14.16.0-yellow)
![npm download](https://img.shields.io/npm/dw/is-valid-package-name?color=blue)

![GitHub (Pre-)Release Date](https://img.shields.io/github/release-date-pre/TomokiMiyauci/is-valid-package-name)
[![dependencies Status](https://status.david-dm.org/gh/TomokiMiyauci/is-valid-package-name.svg)](https://david-dm.org/TomokiMiyauci/is-valid-package-name)
[![codecov](https://codecov.io/gh/TomokiMiyauci/is-valid-package-name/branch/main/graph/badge.svg?token=SPAi5Pv2wd)](https://codecov.io/gh/TomokiMiyauci/is-valid-package-name)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f43b1c317e11445399d85ce6efc06504)](https://www.codacy.com/gh/TomokiMiyauci/is-valid-package-name/dashboard?utm_source=github.com&utm_medium=referral&utm_content=TomokiMiyauci/is-valid-package-name&utm_campaign=Badge_Grade)
![npm type definitions](https://img.shields.io/npm/types/is-valid-package-name)
![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)
![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat)
![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

A validator collection of package names for each package registry

## :sparkles: Features

- :zap: Multi runtime support (`Deno`, `Node.js`)
- :books: Pure TypeScript and provides type definition
- :package: Optimized, super slim size
- :page_facing_up: TSDoc-style comments

Currently providing validators for the following package registries:
Check each for detailed validation rules.

- [npm](./npm/README.md)  
- [deno.land](./deno_land/README.md)  
- [nest.land](./nest_land/README.md)  

## :zap: Overview

### isValid

The `isValid` function returns a boolean if the package name is valid as a package.

```ts
isValidNpm('is-valid-package-name') // true
isValidNpm('node_modules') // false

isValidDenoLand('is_valid') // true
isValidDenoLand('is-valid') // false

isValidNestLand('oak') // true
isValidNestLand('o') // false
```

### validate

The `validate` function returns tuple of boolean and error message.

```ts
validateNpm('is-valid-package-name') // [ true, "" ]
validateNpm('node_modules') // [ false, "Name is blacklisted" ]

validateDenoLand('is_valid') // [ true, "" ]
validateDenoLand('is-valid') // [ false, "Name contains only the characters a-z, 0-9 and _" ]

validateNestLand('oak') // [ true, "" ]
validateNestLand('o') // [ false, "Name length must be greater than 1" ]
```

## :dizzy: Usage

`is-valid-package-name` provides multi platform modules.

### 🦕 Deno

#### [deno.land](https://deno.land/x/is_valid_package_name)

```ts
import { isValidNpm ,validateNpm, isValidDenoLand, validateDenoLand, isValidNestLand, validateNestLand } from "https://deno.land/x/is_valid_package_name/mod.ts";
```

#### [nest.land](https://nest.land/package/is_valid_package_name)

```ts
import { isValidNpm ,validateNpm, isValidDenoLand, validateDenoLand, isValidNestLand, validateNestLand } from "https://x.nest.land/is_valid_package_name/mod.ts";
```

### :package: Node.js

#### Install

```bash
npm i is-valid-package-name
or
yarn add is-valid-package-name
```

#### ES modules

```ts
import { isValidNpm ,validateNpm, isValidDenoLand, validateDenoLand, isValidNestLand, validateNestLand } from "is-valid-package-name";
```

#### Commonjs

```ts
const { isValidNpm ,validateNpm, isValidDenoLand, validateDenoLand, isValidNestLand, validateNestLand } = require("is-valid-package-name");
```

### :globe_with_meridians: Browser

The module that bundles the dependencies is obtained from [skypack](https://www.skypack.dev/view/is-valid-package-name).

```html
<script type="module">
  import { isValidNpm ,validateNpm, isValidDenoLand, validateDenoLand, isValidNestLand, validateNestLand } from "https://cdn.skypack.dev/is-valid-package-name";
</script>
```

## :green_heart: Support

> ie is no longer supported to reduce bundle size.

The TypeScript version must be `4.1.0` or higher.

This project provides `ES modules` and `Commonjs`.

If you have an opinion about what to support, you can open an
[issue](https://github.com/TomokiMiyauci/equal/issues) to discuss it.

The `browserslist` has the following settings.

```text
defaults
last 8 version
not IE <= 11
not ie_mob <= 11
node 6
```

| <img width="30px" height="30px" alt="Deno" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/deno.svg"></br>Deno | <img width="24px" height="24px" alt="Node.js" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/nodejs.svg"></br>Node.js | <img width="24px" height="24px" alt="IE / Edge" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png"></br>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /></br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" /></br>iOS Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /></br>Samsung | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /></br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `^1.6.0`                                                                                                                                | `^6.17.0`                                                                                                                                       | `^83`                                                                                                                                                | `^78`                                                                                                                                                         | `^83`                                                                                                                                                     | `^11`                                                                                                                                                     | `^12.0`                                                                                                                                                                   | `^7.2`                                                                                                                                                                          | `^68`                                                                                                                                                 |

## :handshake: Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues](https://github.com/TomokiMiyauci/is-valid-pacakge-name/issues).

## :seedling: Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/tomoki_miyauci">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## :bulb: License

Copyright © 2021-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
