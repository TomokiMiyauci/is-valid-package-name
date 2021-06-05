// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  isValid,
  validate,
  validateAll,
  validateFailFast
} from "./validate.ts";
import { assertEquals } from "../dev_deps.ts";
import {
  INVALID_GREATER_THEN_40,
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_CHAR,
  INVALID_TRIMMABLE
} from "../_shared/constants.ts";
import {
  INVALID_CORE_MODULE_NAME,
  INVALID_LESS_THEN_2,
  INVALID_RESERVED_NAME
} from "./_constants.ts";
const lengthOf = (val: number): string => new Array(val).fill("a").join("");

Deno.test("validateAll", () => {
  const table: [unknown, [boolean, string[]]][] = [
    [undefined, [false, [INVALID_NOT_STRING]]],
    [
      "",
      [false, [INVALID_LENGTH_0, INVALID_LESS_THEN_2, INVALID_SPECIAL_CHAR]]
    ],
    [" hello", [false, [INVALID_TRIMMABLE, INVALID_SPECIAL_CHAR]]],
    ["a", [false, [INVALID_LESS_THEN_2]]],
    [lengthOf(41), [false, [INVALID_GREATER_THEN_40]]],
    [lengthOf(40), [true, []]],
    ["A", [false, [INVALID_LESS_THEN_2, INVALID_SPECIAL_CHAR]]],
    ["Abc", [false, [INVALID_SPECIAL_CHAR]]],
    ["@@", [false, [INVALID_SPECIAL_CHAR]]],
    ["fff fff", [false, [INVALID_SPECIAL_CHAR]]],
    ["?hogehoge", [false, [INVALID_SPECIAL_CHAR]]],
    ["console", [false, [INVALID_CORE_MODULE_NAME]]],
    ["fonction", [true, []]]
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      validateAll(val),
      expected,
      `validateAll(${val}) -> ${expected}`
    );
  });
});

Deno.test("validateFailFast", () => {
  const table: [unknown, [boolean, string]][] = [
    [undefined, [false, INVALID_NOT_STRING]],
    ["", [false, INVALID_LENGTH_0]],
    [" hello", [false, INVALID_TRIMMABLE]],
    ["a", [false, INVALID_LESS_THEN_2]],
    [lengthOf(41), [false, INVALID_GREATER_THEN_40]],
    [lengthOf(40), [true, ""]],
    ["A", [false, INVALID_LESS_THEN_2]],
    ["Abc", [false, INVALID_SPECIAL_CHAR]],
    ["@@", [false, INVALID_SPECIAL_CHAR]],
    ["fff fff", [false, INVALID_SPECIAL_CHAR]],
    ["?hogehoge", [false, INVALID_SPECIAL_CHAR]],
    ["console", [false, INVALID_CORE_MODULE_NAME]],
    ["libre", [false, INVALID_RESERVED_NAME]],
    ["fonction", [true, ""]]
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      validateFailFast(val),
      expected,
      `validateFailFast(${val}) -> ${expected}`
    );
  });
});

Deno.test("isValid", () => {
  const table: [unknown, boolean][] = [
    [undefined, false],
    ["", false],
    [" ", false],
    ["@", false],
    [" hello", false],
    ["a", false],
    [lengthOf(41), false],
    [lengthOf(40), true],
    ["A", false],
    ["Abc", false],
    ["@@", false],
    ["fff fff", false],
    ["?hogehoge", false],
    ["console", false],
    ["fonction", true],
    ["libre", false]
  ];

  table.forEach(([val, expected]) => {
    assertEquals(isValid(val), expected, `isValid(${val}) -> ${expected}`);
  });
});

Deno.test("validate", () => {
  const table: [unknown, boolean, [boolean, string | string[]]][] = [
    [undefined, false, [false, INVALID_NOT_STRING]],
    [undefined, true, [false, [INVALID_NOT_STRING]]],
    ["", false, [false, INVALID_LENGTH_0]],
    [
      "",
      true,
      [false, [INVALID_LENGTH_0, INVALID_LESS_THEN_2, INVALID_SPECIAL_CHAR]]
    ],
    [" hello", false, [false, INVALID_TRIMMABLE]],
    [" hello", true, [false, [INVALID_TRIMMABLE, INVALID_SPECIAL_CHAR]]],
    ["a", false, [false, INVALID_LESS_THEN_2]],
    ["a", true, [false, [INVALID_LESS_THEN_2]]],
    [lengthOf(41), false, [false, INVALID_GREATER_THEN_40]],
    [lengthOf(41), true, [false, [INVALID_GREATER_THEN_40]]],
    [lengthOf(40), false, [true, ""]],
    [lengthOf(40), true, [true, []]],
    ["A", false, [false, INVALID_LESS_THEN_2]],
    ["A", true, [false, [INVALID_LESS_THEN_2, INVALID_SPECIAL_CHAR]]],
    ["Abc", false, [false, INVALID_SPECIAL_CHAR]],
    ["Abc", true, [false, [INVALID_SPECIAL_CHAR]]],
    ["@@", false, [false, INVALID_SPECIAL_CHAR]],
    ["@@", true, [false, [INVALID_SPECIAL_CHAR]]],
    ["fff fff", false, [false, INVALID_SPECIAL_CHAR]],
    ["fff fff", true, [false, [INVALID_SPECIAL_CHAR]]],
    ["?hogehoge", false, [false, INVALID_SPECIAL_CHAR]],
    ["?hogehoge", true, [false, [INVALID_SPECIAL_CHAR]]],
    ["console", false, [false, INVALID_CORE_MODULE_NAME]],
    ["console", true, [false, [INVALID_CORE_MODULE_NAME]]],
    ["libre", true, [false, [INVALID_RESERVED_NAME]]],
    ["fonction", false, [true, ""]],
    ["fonction", true, [true, []]]
  ];

  table.forEach(([val, checkAll, expected]) => {
    assertEquals(
      validate(val, checkAll),
      expected,
      `validate(${val}, ${checkAll}) -> ${expected}`
    );
  });
});
