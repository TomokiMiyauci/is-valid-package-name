// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  cast,
  everyFalse,
  failOnTrue,
  ifElse,
  ifElseFn,
  isLength0,
  isString,
  isUndefined,
  ltLength,
  NN,
  not,
  pipe,
} from "../deps.ts";
import {
  INVALID_GREATER_THAN_40,
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_CHAR,
  INVALID_TRIMMABLE,
} from "../_shared/constants.ts";
import { gt40, isRegularLetter, isTrimable } from "../_shared/validate.ts";
import { includeFactory } from "../_shared/composite.ts";
import {
  CORE_MODULE_NAMES,
  INVALID_CORE_MODULE_NAME,
  INVALID_LESS_THAN_2,
  INVALID_RESERVED_NAME,
  RESERVED_NAMES,
} from "./_constants.ts";
import { ResultMsg, ResultMsgs } from "../_shared/types.ts";

const lt2 = ltLength(2);
const isReservedName = includeFactory(RESERVED_NAMES);
const isCoreModuleName = includeFactory(CORE_MODULE_NAMES);

const table = [
  [isLength0, INVALID_LENGTH_0],
  [isTrimable, INVALID_TRIMMABLE],
  [lt2, INVALID_LESS_THAN_2],
  [gt40, INVALID_GREATER_THAN_40],
  [isCoreModuleName, INVALID_CORE_MODULE_NAME],
  [isReservedName, INVALID_RESERVED_NAME],
  [not(isRegularLetter), INVALID_SPECIAL_CHAR],
] as const;

const validateFailFast = (val: unknown): ResultMsg =>
  ifElse(
    isString(val),
    () => {
      const result = failOnTrue(table as any)(val);

      return [
        isUndefined(result),
        ifElse(isUndefined(result), "", result as string),
      ];
    },
    [false, INVALID_NOT_STRING],
  );

const validateAll = (val: unknown): ResultMsgs =>
  ifElse(
    isString(val),
    () => {
      const fails = table.filter(([validateNestLand]) =>
        validateNestLand(val as string)
      );
      const filtered = fails.map(([_, msg]) => msg);
      return [isLength0(filtered), filtered];
    },
    [false, [INVALID_NOT_STRING]],
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
    cast<string>(),
    everyFalse(
      isLength0,
      isTrimable,
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
  lt2,
  validateAll,
  validateFailFast,
  validateNestLand,
};
