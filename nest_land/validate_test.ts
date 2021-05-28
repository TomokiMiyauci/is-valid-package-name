// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  isValid,
  validate,
  validateCheckAll,
  validateFailFast,
} from "./validate.ts";
import { assertEquals } from "../dev_deps.ts";
import {
  INVALID_GREATER_THEN_40,
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_LETTER,
  INVALID_TRIMABLE,
} from "../shared/message.ts";
import {
  INVALID_LESS_THEN_2,
  INVALID_RESERVED_NAME,
} from "./constants/message.ts";
const lengthOf = (val: number): string => new Array(val).fill("a").join("");

Deno.test("validateCheckAll", () => {
  const table: [unknown, [boolean, string[]]][] = [
    [undefined, [false, [INVALID_NOT_STRING]]],
    ["", [false, [
      INVALID_LENGTH_0,
      INVALID_LESS_THEN_2,
      INVALID_SPECIAL_LETTER,
    ]]],
    [" hello", [false, [INVALID_TRIMABLE, INVALID_SPECIAL_LETTER]]],
    ["a", [false, [INVALID_LESS_THEN_2]]],
    [lengthOf(41), [false, [INVALID_GREATER_THEN_40]]],
    [lengthOf(40), [true, []]],
    ["A", [false, [INVALID_LESS_THEN_2, INVALID_SPECIAL_LETTER]]],
    ["Abc", [false, [INVALID_SPECIAL_LETTER]]],
    ["@@", [false, [INVALID_SPECIAL_LETTER]]],
    ["fff fff", [false, [INVALID_SPECIAL_LETTER]]],
    ["?hogehoge", [false, [INVALID_SPECIAL_LETTER]]],
    ["console", [false, [INVALID_RESERVED_NAME]]],
    ["fonction", [true, []]],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      validateCheckAll(val),
      expected,
      `validateCheckAll(${val}) -> ${expected}`,
    );
  });
});

Deno.test("validateFailFast", () => {
  const table: [unknown, [boolean, string]][] = [
    [undefined, [false, INVALID_NOT_STRING]],
    ["", [false, INVALID_LENGTH_0]],
    [" hello", [false, INVALID_TRIMABLE]],
    ["a", [false, INVALID_LESS_THEN_2]],
    [lengthOf(41), [false, INVALID_GREATER_THEN_40]],
    [lengthOf(40), [true, ""]],
    ["A", [false, INVALID_LESS_THEN_2]],
    ["Abc", [false, INVALID_SPECIAL_LETTER]],
    ["@@", [false, INVALID_SPECIAL_LETTER]],
    ["fff fff", [false, INVALID_SPECIAL_LETTER]],
    ["?hogehoge", [false, INVALID_SPECIAL_LETTER]],
    ["console", [false, INVALID_RESERVED_NAME]],
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

Deno.test("isValid", () => {
  const table: [unknown, boolean][] = [
    [undefined, false],
    ["", false],
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
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isValid(val),
      expected,
      `isValid(${val}) -> ${expected}`,
    );
  });
});

Deno.test("validate", () => {
  const table: [unknown, boolean, [boolean, string | string[]]][] = [
    [undefined, false, [false, INVALID_NOT_STRING]],
    [undefined, true, [false, [INVALID_NOT_STRING]]],
    ["", false, [false, INVALID_LENGTH_0]],
    ["", true, [false, [
      INVALID_LENGTH_0,
      INVALID_LESS_THEN_2,
      INVALID_SPECIAL_LETTER,
    ]]],
    [" hello", false, [false, INVALID_TRIMABLE]],
    [" hello", true, [false, [INVALID_TRIMABLE, INVALID_SPECIAL_LETTER]]],
    ["a", false, [false, INVALID_LESS_THEN_2]],
    ["a", true, [false, [INVALID_LESS_THEN_2]]],
    [lengthOf(41), false, [false, INVALID_GREATER_THEN_40]],
    [lengthOf(41), true, [false, [INVALID_GREATER_THEN_40]]],
    [lengthOf(40), false, [true, ""]],
    [lengthOf(40), true, [true, []]],
    ["A", false, [false, INVALID_LESS_THEN_2]],
    ["A", true, [false, [INVALID_LESS_THEN_2, INVALID_SPECIAL_LETTER]]],
    ["Abc", false, [false, INVALID_SPECIAL_LETTER]],
    ["Abc", true, [false, [INVALID_SPECIAL_LETTER]]],
    ["@@", false, [false, INVALID_SPECIAL_LETTER]],
    ["@@", true, [false, [INVALID_SPECIAL_LETTER]]],
    ["fff fff", false, [false, INVALID_SPECIAL_LETTER]],
    ["fff fff", true, [false, [INVALID_SPECIAL_LETTER]]],
    ["?hogehoge", false, [false, INVALID_SPECIAL_LETTER]],
    ["?hogehoge", true, [false, [INVALID_SPECIAL_LETTER]]],
    ["console", false, [false, INVALID_RESERVED_NAME]],
    ["console", true, [false, [INVALID_RESERVED_NAME]]],
    ["fonction", false, [true, ""]],
    ["fonction", true, [true, []]],
  ];

  table.forEach(([val, checkAll, expected]) => {
    assertEquals(
      validate(val, checkAll),
      expected,
      `validate(${val}, ${checkAll}) -> ${expected}`,
    );
  });
});
