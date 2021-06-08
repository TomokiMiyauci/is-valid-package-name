// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  hasSpecialCharacter,
  isEqualNormalizedName,
  isValidNpm,
  validateAll,
  validateFailFast,
  validateNpm,
} from "./validate.ts";
import { normalize } from "./_utils.ts";
import { assertEquals } from "../dev_deps.ts";
import {
  INVALID_BLACKLIST,
  INVALID_CORE_MODULE_NAME,
  INVALID_GREATER_THAN_214,
  INVALID_LETTER_CASE,
  INVALID_SPACIAL_CHAR,
  INVALID_START_WITH_PERIOD,
  INVALID_START_WITH_UNDERSCORE,
} from "./_constants.ts";
import {
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_TRIMMABLE,
} from "../_shared/constants.ts";

const emptyString = "";

Deno.test("hasSpecialCharacter", () => {
  const table: [string, boolean][] = [
    [emptyString, false],
    [" ", false],
    ["a b", false],
    [" a b ", false],
    ["hello", true],
    ["\ud800", false],
    ["\uD800", false],
    ["\uDFFF", false],
    ["A", false],
    ["abc123", true],
    ["fonction", true],
    ["-", true],
    ["_", true],
    [".", true],
    ["!", false],
    ["|", false],
    ["~", false],
    ["*", false],
    ["'", false],
    ["(", false],
    [")", false],
    ["#", false],
    ['"', false],
    [";", false],
    [",", false],
    ["/", false],
    ["?", false],
    [":", false],
    ["@", false],
    ["&", false],
    ["=", false],
    ["+", false],
    ["$", false],
    ["[", false],
    ["<", false],
    [",", false],
    [">", false],
    ["}", false],
    ["{", false],
    ["]", false],
    ["]", false],
    ["^", false],
    ["%", false],
    ["`", false],
    ["\\", false],
    ["\uD800\uDFFF", false],
    ["\uD800\uDFFF", false],
    ["!|~*'()#;,/?:@&=+$[<,>}{]]^%`", false],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      hasSpecialCharacter(val),
      expected,
      `hasSpecialCharacter(${val}) -> ${expected}`,
    );
  });
});

Deno.test("isEqualNormalizedName", () => {
  const table: [string, string, boolean][] = [
    ["", "", true],
    ["fonction", "fonction", true],
    ["name-able", "nameable", true],
    ["nameable", "nameable", true],
    ["name-able", "n-a-m-e-a-b-l-e", true],
    ["n.a.m-e..a-b-le", "na.m.e.a.ble", true],
    ["nameable", "nnamebale", false],
    ["n-a--m-e-a-b-l_e", "n-a-m_e._a.b.le", true],
  ];

  table.forEach(([name, packageName, expected]) => {
    assertEquals(
      isEqualNormalizedName(normalize(name))(packageName),
      expected,
      `isEqualNormalizedName(${name})(${packageName}) -> ${expected}`,
    );
  });
});

Deno.test("validateFailFast", () => {
  const table: [unknown, [boolean, string]][] = [
    [undefined, [false, INVALID_NOT_STRING]],
    ["", [false, INVALID_LENGTH_0]],
    [new Array(214).fill("a").join(""), [true, ""]],
    [new Array(215).fill("a").join(""), [false, INVALID_GREATER_THAN_214]],
    [" hello", [false, INVALID_TRIMMABLE]],
    ["A", [false, INVALID_LETTER_CASE]],
    [" Abc", [false, INVALID_TRIMMABLE]],
    ["Abc", [false, INVALID_LETTER_CASE]],
    ["~", [false, INVALID_SPACIAL_CHAR]],
    ["_hello", [false, INVALID_START_WITH_UNDERSCORE]],
    [".hello", [false, INVALID_START_WITH_PERIOD]],
    ["fonction", [true, ""]],
    ["v8", [false, INVALID_CORE_MODULE_NAME]],
  ];
  table.forEach(([val, expected]) => {
    assertEquals(
      validateFailFast(val),
      expected,
      `validateFailFast(${val}) -> ${expected}`,
    );
  });
});

Deno.test("isValidNpm", () => {
  const table: [unknown, boolean][] = [
    [undefined, false],
    ["", false],
    [new Array(214).fill("a").join(""), true],
    [new Array(215).fill("a").join(""), false],
    [" hello", false],
    ["A", false],
    ["Abc", false],
    ["~", false],
    ["_hello", false],
    [".hello", false],
    ["fonction", true],
    ["assert", false],
  ];
  table.forEach(([val, expected]) => {
    assertEquals(
      isValidNpm(val),
      expected,
      `isValidNpm(${val}) -> ${expected}`,
    );
  });
});

Deno.test("validateAll", () => {
  const table: [unknown, [boolean, string[]]][] = [
    [undefined, [false, [INVALID_NOT_STRING]]],
    ["", [false, [INVALID_LENGTH_0, INVALID_SPACIAL_CHAR]]],
    [new Array(214).fill("a").join(""), [true, []]],
    [new Array(215).fill("a").join(""), [false, [INVALID_GREATER_THAN_214]]],
    [" hello", [false, [INVALID_TRIMMABLE, INVALID_SPACIAL_CHAR]]],
    [
      " Abc",
      [false, [INVALID_TRIMMABLE, INVALID_LETTER_CASE, INVALID_SPACIAL_CHAR]],
    ],
    ["A", [false, [INVALID_LETTER_CASE, INVALID_SPACIAL_CHAR]]],
    ["Abc", [false, [INVALID_LETTER_CASE, INVALID_SPACIAL_CHAR]]],
    ["~", [false, [INVALID_SPACIAL_CHAR]]],
    ["_hello", [false, [INVALID_START_WITH_UNDERSCORE]]],
    [".hello", [false, [INVALID_START_WITH_PERIOD]]],
    ["fonction", [true, []]],
    ["http2", [false, [INVALID_CORE_MODULE_NAME]]],
  ];
  table.forEach(([val, expected]) => {
    assertEquals(
      validateAll(val),
      expected,
      `validateAll(${val}) -> ${expected}`,
    );
  });
});

Deno.test("validateNpm", () => {
  const table: [unknown, boolean, [boolean, string | string[]]][] = [
    [undefined, false, [false, INVALID_NOT_STRING]],
    [undefined, true, [false, [INVALID_NOT_STRING]]],
    [emptyString, false, [false, INVALID_LENGTH_0]],
    [emptyString, true, [false, [INVALID_LENGTH_0, INVALID_SPACIAL_CHAR]]],
    ["A", false, [false, INVALID_LETTER_CASE]],
    ["A", true, [false, [INVALID_LETTER_CASE, INVALID_SPACIAL_CHAR]]],
    [" hello", false, [false, INVALID_TRIMMABLE]],
    [" hello", true, [false, [INVALID_TRIMMABLE, INVALID_SPACIAL_CHAR]]],
    ["~", false, [false, INVALID_SPACIAL_CHAR]],
    ["~", true, [false, [INVALID_SPACIAL_CHAR]]],
    ["_hello", false, [false, INVALID_START_WITH_UNDERSCORE]],
    ["_hello", true, [false, [INVALID_START_WITH_UNDERSCORE]]],
    [".hello", false, [false, INVALID_START_WITH_PERIOD]],
    [".hello", true, [false, [INVALID_START_WITH_PERIOD]]],
    ["fonction", false, [true, ""]],
    ["fonction", true, [true, []]],
    ["fonction~", false, [false, INVALID_SPACIAL_CHAR]],
    ["fonction~", true, [false, [INVALID_SPACIAL_CHAR]]],
    ["node_modules", false, [false, INVALID_BLACKLIST]],
    ["node_modules", true, [false, [INVALID_BLACKLIST]]],
    ["favicon.ico", false, [false, INVALID_BLACKLIST]],
    ["favicon.ico", true, [false, [INVALID_BLACKLIST]]],
  ];

  table.forEach(([val, checkAll, expected]) => {
    assertEquals(
      validateNpm(val, checkAll),
      expected,
      `validateNpm(${val}, ${checkAll}) -> ${expected}`,
    );
  });
});
