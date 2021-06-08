// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  castString,
  everyFalse,
  ifElse,
  ifElseFn,
  includes,
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
import {
  INVALID_GREATER_THAN_40,
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_CHAR,
  INVALID_TRIMMABLE,
} from "../_shared/constants.ts";
import { gt40, isRegularLetter } from "../_shared/validate.ts";
import {
  CORE_MODULE_NAMES,
  INVALID_CORE_MODULE_NAME,
  INVALID_LESS_THAN_2,
  INVALID_RESERVED_NAME,
  RESERVED_NAMES,
} from "./_constants.ts";
import { ResultMsg, ResultMsgs } from "../_shared/types.ts";

const lt2 = ltLength(2);
const isReservedName = includes(RESERVED_NAMES);
const isCoreModuleName = includes(CORE_MODULE_NAMES);

const validateFailFast = ifElseFn(
  isString,
  pipe(
    castString,
    trueThen(
      [isLength0, INVALID_LENGTH_0],
      [isTrimmable, INVALID_TRIMMABLE],
      [lt2, INVALID_LESS_THAN_2],
      [gt40, INVALID_GREATER_THAN_40],
      [isCoreModuleName, INVALID_CORE_MODULE_NAME],
      [isReservedName, INVALID_RESERVED_NAME],
      [not(isRegularLetter), INVALID_SPECIAL_CHAR],
    ),
    ifElseFn(
      isUndefined,
      [true, ""] as ResultMsg,
      (val) => [false, val] as ResultMsg,
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
      [lt2, INVALID_LESS_THAN_2],
      [gt40, INVALID_GREATER_THAN_40],
      [isCoreModuleName, INVALID_CORE_MODULE_NAME],
      [isReservedName, INVALID_RESERVED_NAME],
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
 * validateNestLand('oak') // [ true, "" ]
 * validateNestLand('o') // [ false, "Name length must be greater than 1" ] * ```
 *
 * @example
 * ```ts
 * // checkAll
 * validateNestLand(" Abc", true); // [ false, ["Name cannot contain leading or trailing spaces", "Name contains only the characters a-z, 0-9 and _" ]]
 * ```
 *
 * @public
 */
const validateNestLand = <T extends boolean = false>(
  val: unknown,
  checkAll?: T,
): T extends true ? ResultMsgs : ResultMsg =>
  ifElse(
    NN(checkAll),
    () => validateAll(val),
    () => validateFailFast(val),
  ) as T extends true ? ResultMsgs : ResultMsg;

/**
 * Validator for nest.land package name
 * @params val - Any value
 * @returns Returns `true` if appropriate as a package name for nest.land. Otherwise; `false`
 *
 * @example
 * ```ts
 * isValidNestLand('oak') // true
 * isValidNestLand('o') // false
 * ```
 *
 * @public
 */
const isValidNestLand = ifElseFn(
  isString,
  pipe(
    castString,
    everyFalse(
      isLength0,
      isTrimmable,
      lt2,
      gt40,
      isCoreModuleName,
      isReservedName,
      not(isRegularLetter),
    ),
  ),
  false,
);

export {
  isCoreModuleName,
  isRegularLetter,
  isValidNestLand,
  validateAll,
  validateFailFast,
  validateNestLand,
};
