// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  hasSpecialCharacter,
  isBlacklistName,
  isEqualNormalizedName,
  isLowerCase,
  validate,
  validateAll,
  validateFailFast,
} from "./validate.ts";
import { normalize } from "./_utils.ts";
import { assertEquals } from "../dev_deps.ts";
import {
  INVALID_BLACKLIST,
  INVALID_LETTER_CASE,
  INVALID_SPACIAL_CHAR,
  INVALID_START_WITH_,
  INVALID_START_WITH_DOT,
} from "./_constants.ts";
import {
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_TRIMABLE,
} from "../shared/message.ts";

const emptyString = "";

Deno.test("isLowerCase", () => {
  const table: [string, boolean][] = [
    [emptyString, true],
    ["a", true],
    [
      "hoge",
      true,
    ],
    ["Hello", false],
    ["heLlo", false],
    ["hello Everyone", false],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isLowerCase(val),
      expected,
      `isLowerCase(${val}) -> ${expected}`,
    );
  });
});

Deno.test("hasSpecialCharacter", () => {
  const table: [string, boolean][] = [
    [emptyString, false],
    ["a", false],
    [
      "hoge",
      false,
    ],
    [
      "~",
      true,
    ],
    [
      "'",
      true,
    ],
    [
      "!",
      true,
    ],
    [
      "(",
      true,
    ],
    [
      ")",
      true,
    ],
    [
      "*",
      true,
    ],
    [
      "~'!()*",
      true,
    ],
    [
      "~'!()*xxxxxxx",
      true,
    ],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      hasSpecialCharacter(val),
      expected,
      `hasSpecialCharacter(${val}) -> ${expected}`,
    );
  });
});

Deno.test("isBlacklistName", () => {
  const table: [string, boolean][] = [
    [emptyString, false],
    ["hello", false],
    ["node_modules", true],
    ["favicon.ico", true],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isBlacklistName(val),
      expected,
      `isBlacklistName(${val}) -> ${expected}`,
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

    [" hello", [false, INVALID_TRIMABLE]],
    ["A", [false, INVALID_LETTER_CASE]],
    ["Abc", [false, INVALID_LETTER_CASE]],
    ["~", [false, INVALID_SPACIAL_CHAR]],
    ["_hello", [false, INVALID_START_WITH_]],
    [".hello", [false, INVALID_START_WITH_DOT]],
    ["fonction", [true, ""]],
  ];
  table.forEach(([val, expected]) => {
    assertEquals(
      validateFailFast(val),
      expected,
      `validateFailFast(${val}) -> ${expected}`,
    );
  });
});

Deno.test("validateAll", () => {
  const table: [unknown, [boolean, string[]]][] = [
    [undefined, [false, [INVALID_NOT_STRING]]],
    ["", [false, [
      INVALID_LENGTH_0,
    ]]],

    [" hello", [false, [INVALID_TRIMABLE]]],
    ["A", [false, [INVALID_LETTER_CASE]]],
    ["Abc", [false, [INVALID_LETTER_CASE]]],
    ["~", [false, [INVALID_SPACIAL_CHAR]]],
    ["_hello", [false, [INVALID_START_WITH_]]],
    [".hello", [false, [INVALID_START_WITH_DOT]]],
    ["fonction", [true, []]],
  ];
  table.forEach(([val, expected]) => {
    assertEquals(
      validateAll(val),
      expected,
      `validateCheckAll(${val}) -> ${expected}`,
    );
  });
});

Deno.test("validate", () => {
  const table: [unknown, boolean, [boolean, string | string[]]][] = [
    [undefined, false, [false, INVALID_NOT_STRING]],
    [undefined, true, [false, [INVALID_NOT_STRING]]],
    [emptyString, false, [false, INVALID_LENGTH_0]],
    [emptyString, true, [false, [INVALID_LENGTH_0]]],
    ["A", false, [false, INVALID_LETTER_CASE]],
    ["A", true, [false, [INVALID_LETTER_CASE]]],
    [" hello", false, [false, INVALID_TRIMABLE]],
    [" hello", true, [false, [INVALID_TRIMABLE]]],
    ["~", false, [false, INVALID_SPACIAL_CHAR]],
    ["~", true, [false, [INVALID_SPACIAL_CHAR]]],
    ["_hello", false, [false, INVALID_START_WITH_]],
    ["_hello", true, [false, [INVALID_START_WITH_]]],
    [".hello", false, [false, INVALID_START_WITH_DOT]],
    [".hello", true, [false, [INVALID_START_WITH_DOT]]],
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
      validate(val, checkAll),
      expected,
      `validate(${val}, ${checkAll}) -> ${expected}`,
    );
  });
});
