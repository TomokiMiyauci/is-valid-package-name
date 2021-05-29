// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  isValid,
  validate,
  validateAll,
  validateFailFast,
} from "./validate.ts";
import { assertEquals } from "../dev_deps.ts";
import {
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_LETTER,
  INVALID_TRIMABLE,
} from "../_shared/constants.ts";
import {
  INVALID_GREATER_THEN_40,
  INVALID_LESS_THEN_3,
} from "../_shared/constants.ts";
const lengthOf = (val: number): string => new Array(val).fill("a").join("");

Deno.test("validate", () => {
  const table: [unknown, boolean, [boolean, string | string[]]][] = [
    [undefined, false, [false, INVALID_NOT_STRING]],
    [undefined, true, [false, [INVALID_NOT_STRING]]],
    ["", false, [false, INVALID_LENGTH_0]],
    ["", true, [false, [
      INVALID_LENGTH_0,
      INVALID_LESS_THEN_3,
      INVALID_SPECIAL_LETTER,
    ]]],
    [" hello", false, [false, INVALID_TRIMABLE]],
    [" hello", true, [false, [INVALID_TRIMABLE, INVALID_SPECIAL_LETTER]]],
    ["aa", false, [false, INVALID_LESS_THEN_3]],
    ["aa", true, [false, [INVALID_LESS_THEN_3]]],
    ["a", false, [false, INVALID_LESS_THEN_3]],
    ["a", true, [false, [INVALID_LESS_THEN_3]]],
    [lengthOf(41), false, [false, INVALID_GREATER_THEN_40]],
    [lengthOf(41), true, [false, [INVALID_GREATER_THEN_40]]],
    [lengthOf(40), false, [true, ""]],
    [lengthOf(40), true, [true, []]],
    ["Ab", false, [false, INVALID_LESS_THEN_3]],
    ["Ab", true, [false, [INVALID_LESS_THEN_3, INVALID_SPECIAL_LETTER]]],
    ["Abc", false, [false, INVALID_SPECIAL_LETTER]],
    ["Abc", true, [false, [INVALID_SPECIAL_LETTER]]],
    ["?hogehoge", false, [false, INVALID_SPECIAL_LETTER]],
    ["?hogehoge", true, [false, [INVALID_SPECIAL_LETTER]]],
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

Deno.test("validateFailFast", () => {
  const table: [unknown, [boolean, string]][] = [
    [undefined, [false, INVALID_NOT_STRING]],
    ["", [false, INVALID_LENGTH_0]],
    [" hello", [false, INVALID_TRIMABLE]],
    ["aa", [false, INVALID_LESS_THEN_3]],
    ["a", [false, INVALID_LESS_THEN_3]],
    [lengthOf(41), [false, INVALID_GREATER_THEN_40]],
    [lengthOf(40), [true, ""]],
    ["Ab", [false, INVALID_LESS_THEN_3]],
    ["Abc", [false, INVALID_SPECIAL_LETTER]],
    ["?hogehoge", [false, INVALID_SPECIAL_LETTER]],
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
      INVALID_LESS_THEN_3,
      INVALID_SPECIAL_LETTER,
    ]]],
    [" hello", [false, [INVALID_TRIMABLE, INVALID_SPECIAL_LETTER]]],
    ["aa", [false, [INVALID_LESS_THEN_3]]],
    ["a", [false, [INVALID_LESS_THEN_3]]],
    [lengthOf(41), [false, [INVALID_GREATER_THEN_40]]],
    [lengthOf(40), [true, []]],
    ["Ab", [false, [INVALID_LESS_THEN_3, INVALID_SPECIAL_LETTER]]],
    ["Abc", [false, [INVALID_SPECIAL_LETTER]]],
    ["?hogehoge", [false, [INVALID_SPECIAL_LETTER]]],
    ["fonction", [true, []]],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      validateAll(val),
      expected,
      `validateAll(${val}) -> ${expected}`,
    );
  });
});

Deno.test("isValid", () => {
  const table: [unknown, boolean][] = [
    [undefined, false],
    ["", false],
    [" hello", false],
    ["aa", false],
    ["a", false],
    [lengthOf(41), false],
    [lengthOf(40), true],
    ["Ab", false],
    ["Abc", false],
    ["?hogehoge", false],
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
