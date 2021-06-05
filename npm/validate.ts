// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  cast,
  everyFalse,
  failOnTrue,
  gtLength,
  ifElse,
  ifElseFn,
  isLength0,
  isString,
  isUndefined,
  NN,
  not,
  pipe,
  startsWith
} from "../deps.ts";
import { includeFactory } from "../_shared/composite.ts";
import { normalize } from "./_utils.ts";

import {
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_TRIMMABLE
} from "../_shared/constants.ts";

import {
  BLACKLIST,
  CORE_MODULES,
  INVALID_BLACKLIST,
  INVALID_CORE_MODULE_NAME,
  INVALID_GREATER_THAN_214,
  INVALID_LETTER_CASE,
  INVALID_SPACIAL_CHAR,
  INVALID_START_WITH_UNDERSCORE,
  INVALID_START_WITH_PERIOD,
  RegularLetter
} from "./_constants.ts";
import { isTrimable } from "../_shared/validate.ts";

const test = (regExp: RegExp) => (val: string): boolean => regExp.test(val);

const gt214 = gtLength(214);
const isLowerCase = (val: string): boolean => val.toLowerCase() === val;
const isStartWithDot = startsWith(".");
const isStartWith_ = startsWith("_");
const hasSpecialCharacter = test(RegularLetter);
const isBlacklistName = includeFactory(BLACKLIST);
const isCoreModuleName = includeFactory(CORE_MODULES);
const isEqualNormalizedName = (name: string) => (
  packageName: string
): boolean => normalize(packageName) === name;

const table = [
  [isLength0, INVALID_LENGTH_0],
  [isTrimable, INVALID_TRIMMABLE],
  [gt214, INVALID_GREATER_THAN_214],
  [isStartWithDot, INVALID_START_WITH_PERIOD],
  [isStartWith_, INVALID_START_WITH_UNDERSCORE],
  [not(isLowerCase), INVALID_LETTER_CASE],
  [not(hasSpecialCharacter), INVALID_SPACIAL_CHAR],
  [isBlacklistName, INVALID_BLACKLIST],
  [isCoreModuleName, INVALID_CORE_MODULE_NAME]
] as const;

const isValid = ifElseFn(
  isString,
  pipe(
    cast<string>(),
    everyFalse(
      isLength0,
      isTrimable,
      gt214,
      isStartWithDot,
      isStartWith_,
      not(isLowerCase),
      not(hasSpecialCharacter),
      isBlacklistName,
      isCoreModuleName
    )
  ),
  false
);

const validateAll = (val: unknown): [boolean, string[]] =>
  ifElse(
    isString(val),
    () => {
      const fails = table.filter(([validate]) => validate(val as string));
      const filtered = fails.map(([_, msg]) => msg);
      return [isLength0(filtered), filtered];
    },
    [false, [INVALID_NOT_STRING]]
  );

const validateFailFast = (val: unknown): [boolean, string] =>
  ifElse(
    isString(val),
    () => {
      const result = failOnTrue(table as any)(val);

      return [
        isUndefined(result),
        ifElse(isUndefined(result), "", result as string)
      ];
    },
    [false, INVALID_NOT_STRING]
  );

const validate = <T extends boolean = false>(
  val: unknown,
  checkAll?: T
): T extends true ? [boolean, string[]] : [boolean, string] =>
  ifElse(
    NN(checkAll),
    () => validateAll(val),
    () => validateFailFast(val)
  ) as T extends true ? [boolean, string[]] : [boolean, string];

export {
  gt214,
  hasSpecialCharacter,
  isBlacklistName,
  isEqualNormalizedName,
  isLowerCase,
  isTrimable,
  isValid,
  validate,
  validateAll,
  validateFailFast
};
