import { addTrailingZeros } from "./formatForm";

export function formatBill(num: number): string {
  if (num === 0) {
    return "";
  } else {
    return addTrailingZeros(num);
  }
}
