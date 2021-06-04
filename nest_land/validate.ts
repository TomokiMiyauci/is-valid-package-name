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
  INVALID_GREATER_THEN_40,
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_LETTER,
  INVALID_TRIMABLE,
} from "../_shared/constants.ts";
import { gt40, isRegularLetter, isTrimable } from "../_shared/validate.ts";
import { includeFactory } from "../_shared/composite.ts";
import {
  INVALID_LESS_THEN_2,
  INVALID_RESERVED_NAME,
  RESERVED,
} from "./_constants.ts";
import { ResultMsg, ResultMsgs } from "../_shared/types.ts";

const lt2 = ltLength(2);
const isReservedName = includeFactory(RESERVED);

const table = [
  [isLength0, INVALID_LENGTH_0],
  [isTrimable, INVALID_TRIMABLE],
  [lt2, INVALID_LESS_THEN_2],
  [gt40, INVALID_GREATER_THEN_40],
  [isReservedName, INVALID_RESERVED_NAME],
  [not(isRegularLetter), INVALID_SPECIAL_LETTER],
] as const;

const validateFailFast = (val: unknown): ResultMsg =>
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

const validateAll = (val: unknown): ResultMsgs =>
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
): T extends true ? ResultMsgs : ResultMsg =>
  ifElse(
    NN(checkAll),
    () => validateAll(val),
    () => validateFailFast(val),
  ) as T extends true ? ResultMsgs : ResultMsg;

const isValid = ifElseFn(
  isString,
  pipe(
    cast<string>(),
    everyFalse(
      isLength0,
      isTrimable,
      lt2,
      gt40,
      isReservedName,
      not(isRegularLetter),
    ),
  ),
  false,
);

export {
  isRegularLetter,
  isValid,
  lt2,
  validate,
  validateAll,
  validateFailFast,
};
