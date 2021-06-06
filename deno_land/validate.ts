// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  AnyFn,
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
import { gt40, isRegularLetter, isTrimable } from "../_shared/validate.ts";
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

const table = [
  [isLength0, INVALID_LENGTH_0],
  [isTrimable, INVALID_TRIMMABLE],
  [lt3, INVALID_LESS_THAN_3],
  [gt40, INVALID_GREATER_THAN_40],
  [not(isRegularLetter), INVALID_SPECIAL_CHAR],
] as const;

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
    cast<string>(),
    everyFalse(isLength0, isTrimable, lt3, gt40, not(isRegularLetter)),
  ),
  false,
);

const validateFailFast = ifElseFn(
  isString,
  pipe(
    failOnTrue<AnyFn<unknown, boolean>, unknown>(table as any),
    (val: unknown) =>
      [
        isUndefined(val),
        ifElse(isUndefined(val), "", val as string),
      ] as ResultMsg,
  ),
  [false, INVALID_NOT_STRING] as ResultMsg,
);

const validateAll = ifElseFn(
  isString,
  (val: unknown) => {
    const fails = table.filter(([validateDenoLand]) =>
      validateDenoLand(val as string)
    );
    const filtered = fails.map(([_, msg]) => msg);
    return [isLength0(filtered), filtered] as ResultMsgs;
  },
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
  lt3,
  validateAll,
  validateDenoLand,
  validateFailFast,
};
