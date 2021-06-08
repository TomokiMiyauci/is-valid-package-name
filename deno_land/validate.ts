// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  castString,
  everyFalse,
  ifElse,
  ifElseFn,
  isLength0,
  isString,
  isTrimmable,
  isUndefined,
  ltLength,
  NN,
  not,
  pipe,
  trueThen,
  trueThenAll,
} from "../deps.ts";
import { gt40, isRegularLetter } from "../_shared/validate.ts";
import {
  INVALID_GREATER_THAN_40,
  INVALID_LENGTH_0,
  INVALID_LESS_THAN_3,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_CHAR,
  INVALID_TRIMMABLE,
} from "../_shared/constants.ts";
import { ResultMsg, ResultMsgs } from "../_shared/types.ts";

const lt3 = ltLength(3);

/**
 * Validator for deno.land package name
 * @params val - Any value
 * @returns Returns `true` if appropriate as a package name for deno.land. Otherwise; `false`
 *
 * @example
 * ```ts
 * isValidDenoLand('is_valid') // true
 * isValidDenoLand('is-valid') // false
 * ```
 *
 * @public
 */
const isValidDenoLand = ifElseFn(
  isString,
  pipe(
    castString,
    everyFalse(isLength0, isTrimmable, lt3, gt40, not(isRegularLetter)),
  ),
  false,
);

const validateFailFast = ifElseFn(
  isString,
  pipe(
    castString,
    trueThen(
      [isLength0, INVALID_LENGTH_0],
      [isTrimmable, INVALID_TRIMMABLE],
      [lt3, INVALID_LESS_THAN_3],
      [gt40, INVALID_GREATER_THAN_40],
      [not(isRegularLetter), INVALID_SPECIAL_CHAR],
    ),
    ifElseFn(
      isUndefined,
      [true, ""] as ResultMsg,
      (msg) => [false, msg] as ResultMsg,
    ),
  ),
  [false, INVALID_NOT_STRING] as ResultMsg,
);

const validateAll = ifElseFn(
  isString,
  pipe(
    castString,
    trueThenAll(
      [isLength0, INVALID_LENGTH_0],
      [isTrimmable, INVALID_TRIMMABLE],
      [lt3, INVALID_LESS_THAN_3],
      [gt40, INVALID_GREATER_THAN_40],
      [not(isRegularLetter), INVALID_SPECIAL_CHAR],
    ),
    ifElseFn(
      isLength0,
      [true, []] as ResultMsgs,
      (msgs) => [false, msgs] as ResultMsgs,
    ),
  ),
  [false, [INVALID_NOT_STRING]] as ResultMsgs,
);

/**
 * Validation for nest.land package name
 * @params val - Any value
 * @params checkAll? - Whether to interrupt validation in the middle
 * @returns Tuple of boolean and error message.
 *
 * @example
 * ```ts
 * validateDenoLand('is_valid') // [ true, "" ]
 * validateDenoLand('is-valid') // [ false, "Name contains only the characters a-z, 0-9 and _" ]
 * ```
 *
 * @example
 * ```ts
 * // checkAll
 * validateDenoLand(" Abc", true); // [ false, ["Name cannot contain leading or trailing spaces", "Name contains only the characters a-z, 0-9 and _" ]]
 * ```
 *
 * @public
 */
const validateDenoLand = <T extends boolean = false>(
  val: unknown,
  checkAll?: T,
): T extends true ? ResultMsgs : ResultMsg =>
  ifElse(
    NN(checkAll),
    () => validateAll(val),
    () => validateFailFast(val),
  ) as T extends true ? ResultMsgs : ResultMsg;

export {
  isRegularLetter,
  isValidDenoLand,
  validateAll,
  validateDenoLand,
  validateFailFast,
};
