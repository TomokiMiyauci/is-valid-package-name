// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  failOnTrue,
  gtLength,
  ifElse,
  ifElseFn,
  isLength0,
  isString,
  isUndefined,
  isValidFalse,
  NN,
  not,
  startsWith,
} from "../deps.ts";
import { includeFactory } from "../_shared/composite.ts";
import { normalize } from "./_utils.ts";
import { BLACKLIST, SPECIAL_CHARACTERS } from "./_constants.ts";

import {
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_TRIMABLE,
} from "../_shared/constants.ts";

import {
  INVALID_BLACKLIST,
  INVALID_LETTER_CASE,
  INVALID_SPACIAL_CHAR,
  INVALID_START_WITH_,
  INVALID_START_WITH_DOT,
} from "./_constants.ts";
import { isTrimable } from "../_shared/validate.ts";

const gt214 = gtLength(214);
const isLowerCase = (val: string): boolean => val.toLowerCase() === val;
const isStartWithDot = startsWith(".");
const isStartWith_ = startsWith("_");
const hasSpecialCharacter = (val: string): boolean =>
  SPECIAL_CHARACTERS.test(val);
const isBlacklistName = includeFactory(BLACKLIST);
const isEqualNormalizedName = (name: string) =>
  (packageName: string): boolean => normalize(packageName) === name;

const table = [
  [
    isLength0,
    INVALID_LENGTH_0,
  ],
  [isTrimable, INVALID_TRIMABLE],
  [
    isStartWithDot,
    INVALID_START_WITH_DOT,
  ],
  [
    isStartWith_,
    INVALID_START_WITH_,
  ],
  [not(isLowerCase), INVALID_LETTER_CASE],
  [hasSpecialCharacter, INVALID_SPACIAL_CHAR],
  [isBlacklistName, INVALID_BLACKLIST],
] as const;

const isValid = ifElseFn(isString, (val: unknown) =>
  isValidFalse(
    isLength0,
    isTrimable,
    isStartWithDot,
    isStartWith_,
    not(isLowerCase),
    hasSpecialCharacter,
    isBlacklistName,
  )(val as string), false);

const validateAll = (val: unknown): [boolean, string[]] =>
  ifElse(isString(val), () => {
    const fails = table.filter(([validate]) => validate(val as string));
    const filtered = fails.map(([_, msg]) => msg);
    return [isLength0(filtered), filtered];
  }, [
    false,
    [INVALID_NOT_STRING],
  ]);

const validateFailFast = (val: unknown): [boolean, string] =>
  ifElse(isString(val), () => {
    const result = failOnTrue(table as any)(val);

    return [
      isUndefined(result),
      ifElse(isUndefined(result), "", result as string),
    ];
  }, [false, INVALID_NOT_STRING]);

const validate = <T extends boolean = false>(
  val: unknown,
  checkAll?: T,
): T extends true ? [boolean, string[]] : [boolean, string] =>
  ifElse(
    NN(checkAll),
    () => validateAll(val),
    () => validateFailFast(val),
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
  validateFailFast,
};