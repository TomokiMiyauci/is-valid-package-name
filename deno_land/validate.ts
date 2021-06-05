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
  pipe
} from "../deps.ts";
import { gt40, isRegularLetter, isTrimable } from "../_shared/validate.ts";
import {
  INVALID_GREATER_THAN_40,
  INVALID_LENGTH_0,
  INVALID_LESS_THAN_3,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_CHAR,
  INVALID_TRIMMABLE
} from "../_shared/constants.ts";
import { ResultMsg, ResultMsgs } from "../_shared/types.ts";

const lt3 = ltLength(3);

const table = [
  [isLength0, INVALID_LENGTH_0],
  [isTrimable, INVALID_TRIMMABLE],
  [lt3, INVALID_LESS_THAN_3],
  [gt40, INVALID_GREATER_THAN_40],
  [not(isRegularLetter), INVALID_SPECIAL_CHAR]
] as const;

const isValid = ifElseFn(
  isString,
  pipe(
    cast<string>(),
    everyFalse(isLength0, isTrimable, lt3, gt40, not(isRegularLetter))
  ),
  false
);

const validateFailFast = ifElseFn(
  isString,
  pipe(
    failOnTrue<AnyFn<unknown, boolean>, unknown>(table as any),
    (val: unknown) =>
      [
        isUndefined(val),
        ifElse(isUndefined(val), "", val as string)
      ] as ResultMsg
  ),
  [false, INVALID_NOT_STRING] as ResultMsg
);

const validateAll = ifElseFn(
  isString,
  (val: unknown) => {
    const fails = table.filter(([validate]) => validate(val as string));
    const filtered = fails.map(([_, msg]) => msg);
    return [isLength0(filtered), filtered] as ResultMsgs;
  },
  [false, [INVALID_NOT_STRING]] as ResultMsgs
);

const validate = <T extends boolean = false>(
  val: unknown,
  checkAll?: T
): T extends true ? ResultMsgs : ResultMsg =>
  ifElse(
    NN(checkAll),
    () => validateAll(val),
    () => validateFailFast(val)
  ) as T extends true ? ResultMsgs : ResultMsg;

export {
  isRegularLetter,
  isValid,
  lt3,
  validate,
  validateAll,
  validateFailFast
};
