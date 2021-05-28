import { isRegularLetter, isTrimable } from "./validate.ts";
import { assertEquals } from "../../dev_deps.ts";

Deno.test("isTrimable", () => {
  const table: [string, boolean][] = [
    ["", false],
    ["hello", false],
    [" hello", true],
    ["hello ", true],
    [" hello ", true],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isTrimable(val),
      expected,
      `isTrimable(${val}) -> ${expected}`,
    );
  });
});

Deno.test("isRegularLetter", () => {
  const table: [string, boolean][] = [
    ["", false],
    ["A", false],
    [
      "a",
      true,
    ],
    [
      "aaaaaaaaaa",
      true,
    ],
    [
      "0",
      true,
    ],
    [
      "_",
      true,
    ],
    [
      "0abcd_",
      true,
    ],
    [
      "_A",
      false,
    ],
    [
      "_Aabc09ABC",
      false,
    ],
    [
      "___fonction0123456789",
      true,
    ],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isRegularLetter(val),
      expected,
      `isRegularLetter(${val}) -> ${expected}`,
    );
  });
});
