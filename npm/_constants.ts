export const INVALID_LENGTH_0 = "Name length must be greater than zero";
export const INVALID_START_WITH_DOT = "Name cannot start with a period";
export const INVALID_START_WITH_ = "Name cannot start with an underscore";
export const INVALID_LETTER_CASE = "Name can no longer contain capital letters";
export const INVALID_SPACIAL_CHAR =
  `Name can no longer contain special characters ('~'!()*')`;
export const INVALID_BLACKLIST = "Name is a core module name";
export const SPECIAL_CHARACTERS = /[~'!()*]/;
export const BLACKLIST = ["node_modules", "favicon.ico"];
