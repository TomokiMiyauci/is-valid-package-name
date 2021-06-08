// Copyright 2021-present the is-valid-package-name authors. All rights reserved. MIT license.
import { gtLength, test } from "../deps.ts";

const gt40 = gtLength(40);
const RegularLetter = /^[a-z\d_]+$/;
const isRegularLetter = test(RegularLetter);

export { gt40, isRegularLetter };
