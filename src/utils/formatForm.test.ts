import { addTrailingZeros, formatForm } from "./formatForm";

describe("Suite of tests for formatting form", () => {
  test("empty string to be converted to a 0", () => {
    expect(formatForm("")).toStrictEqual(0);
    expect(formatForm("")).toStrictEqual(0);
  });
  test("a string of a number is parsed as a float", () => {
    expect(formatForm("20.67")).toStrictEqual(20.67);
    expect(formatForm("20.00")).toStrictEqual(20);
    expect(formatForm("11.4")).toStrictEqual(11.4);
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
