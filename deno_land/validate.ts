// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
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
} from "../deps.ts";
import { gt40, isRegularLetter, isTrimable } from "../_shared/validate.ts";
import {
  INVALID_GREATER_THEN_40,
  INVALID_LENGTH_0,
  INVALID_LESS_THEN_3,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_LETTER,
  INVALID_TRIMABLE,
} from "../_shared/constants.ts";

const lt3 = ltLength(3);

const table = [
  [isLength0, INVALID_LENGTH_0],
  [isTrimable, INVALID_TRIMABLE],
  [lt3, INVALID_LESS_THEN_3],
  [gt40, INVALID_GREATER_THEN_40],
  [not(isRegularLetter), INVALID_SPECIAL_LETTER],
] as const;

const isValid = ifElseFn(
  isString,
  (val: unknown) =>
    everyFalse(
      isLength0,
      isTrimable,
      lt3,
      gt40,
      not(isRegularLetter),
    )(val as string),
  false,
);

const validateFailFast = (val: unknown): [boolean, string] =>
  ifElse(isString(val), () => {
    const result = failOnTrue(table as any)(val);

    return [
      isUndefined(result),
      ifElse(isUndefined(result), "", result as string),
    ];
  }, [
    false,
    INVALID_NOT_STRING,
  ]);

const validateAll = (val: unknown): [boolean, string[]] =>
  ifElse(isString(val), () => {
    const fails = table.filter(([validate]) => validate(val as string));
    const filtered = fails.map(([_, msg]) => msg);
    return [isLength0(filtered), filtered];
  }, [
    false,
    [INVALID_NOT_STRING],
  ]);

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
  isRegularLetter,
  isValid,
  lt3,
  validate,
  validateAll,
  validateFailFast,
};
