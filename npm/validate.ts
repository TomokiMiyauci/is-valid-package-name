// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  AnyFn,
  failOnTrue,
  gtLength,
  ifElse,
  isFunction,
  isLength0,
  isString,
  isUndefined,
  N,
  NN,
  not,
  startsWith,
} from "../deps.ts";
import { includeFactory } from "../shared/composite.ts";
import { normalize } from "./_utils.ts";
import { BLACKLIST, SPECIAL_CHARACTERS } from "./_constants.ts";

import {
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_TRIMABLE,
} from "../shared/message.ts";

import {
  INVALID_BLACKLIST,
  INVALID_LETTER_CASE,
  INVALID_SPACIAL_CHAR,
  INVALID_START_WITH_,
  INVALID_START_WITH_DOT,
} from "./_constants.ts";
import { isTrimable } from "../shared/validate.ts";

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

const validators = [
  isLength0,
  isTrimable,
  isStartWithDot,
  isStartWith_,
  not(isLowerCase),
  hasSpecialCharacter,
  isBlacklistName,
];

const isValid = (val: unknown): boolean =>
  ifElse(
    isString(val),
    () => validators.every((fn) => N(fn(val as string))),
    false,
  );

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

const validate = <T extends boolean>(
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
