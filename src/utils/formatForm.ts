export function formatForm(str: string): number {
  if (str !== "") {
    return parseFloat(str);
  }
  return 0;
}

export function addTrailingZeros(num: number): string {
  return num.toLocaleString("en-UK", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}
