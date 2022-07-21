import {
  addTrailingZeros,
  formatNumToString,
  formatStringToNum,
} from "./formatForm";

describe("Suite of tests for formatting form", () => {
  test("empty string to be converted to a 0", () => {
    expect(formatStringToNum("")).toStrictEqual(0);
    expect(formatStringToNum("")).toStrictEqual(0);
  });
  test("a string of a number is parsed as a float", () => {
    expect(formatStringToNum("20.67")).toStrictEqual(20.67);
    expect(formatStringToNum("20.00")).toStrictEqual(20);
    expect(formatStringToNum("11.4")).toStrictEqual(11.4);
  });
});

describe("Suite of tests for formatting parsed number", () => {
  test("trailing zeros are added to a number when less than 2 dp", () => {
    expect(addTrailingZeros(20)).toStrictEqual("20.00");
    expect(addTrailingZeros(40)).toStrictEqual("40.00");
  });
  test("where decimal places are present, the relevant zeros are added", () => {
    expect(addTrailingZeros(40.45)).toStrictEqual("40.45");
    expect(addTrailingZeros(40.4)).toStrictEqual("40.40");
  });
});

describe("Suite of tests for string to number", () => {
  test("zero converted to empty string", () => {
    expect(formatNumToString(0)).toStrictEqual("");
    expect(formatNumToString(0)).toStrictEqual("");
  });
  test("where decimal places are present, the relevant zeros are added", () => {
    expect(formatNumToString(45.56)).toStrictEqual("45.56");
    expect(formatNumToString(40)).toStrictEqual("40.00");
  });
});
