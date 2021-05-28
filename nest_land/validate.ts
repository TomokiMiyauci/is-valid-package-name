// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import {
  failOnTrue,
  ifElse,
  isLength0,
  isString,
  isUndefined,
  isValid as _isValid,
  ltLength,
  N,
  NN,
  not,
} from "../deps.ts";
import {
  gt40,
  includeFactory,
  INVALID_GREATER_THEN_40,
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_LETTER,
  INVALID_TRIMABLE,
  isRegularLetter,
  isTrimable,
} from "../shared/mod.ts";
import {
  INVALID_LESS_THEN_2,
  INVALID_RESERVED_NAME,
} from "./constants/message.ts";
import { RESERVED } from "./constants/name_list.ts";

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

const validateCheckAll = (val: unknown): [boolean, string[]] =>
  ifElse(isString(val), () => {
    const fails = table.filter(([validate]) => validate(val as string));
    const filtered = fails.map(([_, msg]) => msg);
    return [isLength0(filtered), filtered];
  }, [
    false,
    [INVALID_NOT_STRING],
  ]);

const validate = <T extends boolean>(
  val: unknown,
  checkAll?: T,
): T extends true ? [boolean, string[]] : [boolean, string] =>
  ifElse(
    NN(checkAll),
    () => validateCheckAll(val),
    () => validateFailFast(val),
  ) as T extends true ? [boolean, string[]] : [boolean, string];

const validators = [
  isLength0,
  isTrimable,
  lt2,
  gt40,
  isReservedName,
  not(isRegularLetter),
];

const isValid = (
  val: unknown,
): boolean =>
  ifElse(
    isString(val),
    () => validators.every((fn) => N(fn(val as string))),
    false,
  );

export {
  isRegularLetter,
  isValid,
  lt2,
  validate,
  validateCheckAll,
  validateFailFast,
};
