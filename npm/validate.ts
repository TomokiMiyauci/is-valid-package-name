// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  cast,
  everyFalse,
  gtLength,
  ifElse,
  ifElseFn,
  isLength0,
  isLowerCase,
  isString,
  isUndefined,
  NN,
  not,
  pipe,
  startsWith,
  trueThen,
  trueThenAll,
} from "../deps.ts";
import { includeFactory } from "../_shared/composite.ts";
import { normalize } from "./_utils.ts";

import {
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_TRIMMABLE,
} from "../_shared/constants.ts";
import { ResultMsg, ResultMsgs } from "../_shared/types.ts";

import {
  BLACKLIST,
  CORE_MODULES,
  INVALID_BLACKLIST,
  INVALID_CORE_MODULE_NAME,
  INVALID_GREATER_THAN_214,
  INVALID_LETTER_CASE,
  INVALID_SPACIAL_CHAR,
  INVALID_START_WITH_PERIOD,
  INVALID_START_WITH_UNDERSCORE,
  RegularLetter,
} from "./_constants.ts";
import { isTrimable } from "../_shared/validate.ts";

const castString = cast<string>();
const test = (regExp: RegExp) => (val: string): boolean => regExp.test(val);

const gt214 = gtLength(214);
const isStartWithDot = startsWith(".");
const isStartWith_ = startsWith("_");
const hasSpecialCharacter = test(RegularLetter);
const isBlacklistName = includeFactory(BLACKLIST);
const isCoreModuleName = includeFactory(CORE_MODULES);
const isEqualNormalizedName = (name: string) =>
  (
    packageName: string,
  ): boolean => normalize(packageName) === name;

/**
 * Validator for npm package name
 * @params val - Any value
 * @returns Returns `true` if appropriate as a package name for npm. Otherwise; `false`
 *
 * @example
 * ```ts
 * isValidNpm('is-valid-package-name') // true
 * isValidNpm('node_modules') // false
 * ```
 *
 * @public
 */
const isValidNpm = ifElseFn(
  isString,
  pipe(
    castString,
    everyFalse(
      isLength0,
      isTrimable,
      gt214,
      isStartWithDot,
      isStartWith_,
      not(isLowerCase),
      not(hasSpecialCharacter),
      isBlacklistName,
      isCoreModuleName,
    ),
  ),
  false,
);

const validateAll = ifElseFn(
  isString,
  pipe(
    castString,
    trueThenAll(
      [isLength0, INVALID_LENGTH_0],
      [isTrimable, INVALID_TRIMMABLE],
      [gt214, INVALID_GREATER_THAN_214],
      [isStartWithDot, INVALID_START_WITH_PERIOD],
      [isStartWith_, INVALID_START_WITH_UNDERSCORE],
      [not(isLowerCase), INVALID_LETTER_CASE],
      [not(hasSpecialCharacter), INVALID_SPACIAL_CHAR],
      [isBlacklistName, INVALID_BLACKLIST],
      [isCoreModuleName, INVALID_CORE_MODULE_NAME],
    ),
    ifElseFn(
      isLength0,
      [true, []] as ResultMsgs,
      (msgs) => [false, msgs] as ResultMsgs,
    ),
  ),
  [false, [INVALID_NOT_STRING]] as ResultMsgs,
);

const validateFailFast = ifElseFn(
  isString,
  pipe(
    castString,
    trueThen(
      [isLength0, INVALID_LENGTH_0],
      [isTrimable, INVALID_TRIMMABLE],
      [gt214, INVALID_GREATER_THAN_214],
      [isStartWithDot, INVALID_START_WITH_PERIOD],
      [isStartWith_, INVALID_START_WITH_UNDERSCORE],
      [not(isLowerCase), INVALID_LETTER_CASE],
      [not(hasSpecialCharacter), INVALID_SPACIAL_CHAR],
      [isBlacklistName, INVALID_BLACKLIST],
      [isCoreModuleName, INVALID_CORE_MODULE_NAME],
    ),
    ifElseFn(
      isUndefined,
      [true, ""] as ResultMsg,
      (msg) => [false, msg] as ResultMsg,
    ),
  ),
  [false, INVALID_NOT_STRING] as ResultMsg,
);

/**
 * Validation for npm package name
 * @params val - Any value
 * @params checkAll? - Whether to interrupt validation in the middle
 * @returns Tuple of boolean and error message.
 *
 * @example
 * ```ts
 * validateNpm('is-valid-package-name') // [ true, "" ]
 * validateNpm('node_modules') // [ false, "Name is blacklisted" ]
 * ```
 *
 * @example
 * ```ts
 * // checkAll
 * validateNpm("Abc", true); // [ false, ["Name can no longer contain capital letters", "Name contains only the characters a-z, 0-9 and -._" ]]
 * ```
 *
 * @public
 */
const validateNpm = <T extends boolean = false>(
  val: unknown,
  checkAll?: T,
): T extends true ? ResultMsgs : ResultMsg =>
  ifElse(
    NN(checkAll),
    () => validateAll(val),
    () => validateFailFast(val),
  ) as T extends true ? ResultMsgs : ResultMsg;

export {
  gt214,
  hasSpecialCharacter,
  isBlacklistName,
  isEqualNormalizedName,
  isLowerCase,
  isTrimable,
  isValidNpm,
  validateAll,
  validateFailFast,
  validateNpm,
};
