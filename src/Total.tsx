import { TipDiscountOptions } from "./utils/StateAction";
import { State } from "./utils/StateAction";
import { addTrailingZeros } from "./formatForm";
import { Link } from "react-router-dom";

interface TotalProps {
  settings: State["settings"];
  values: State["values"];
}

export function Total({ settings, values }: TotalProps): JSX.Element {
  const totalAfterDiscount = handleDiscountOrTip(
    values.bill,
    values.discount,
    settings.discountType,
    "discount"
  );
  const totalAfterTip = handleDiscountOrTip(
    totalAfterDiscount,
    values.tip,
    settings.tipType,
    "tip"
  );
  const totalAfterMisc = totalAfterTip + values.misc;
  const grandTotal = handleRoundUp(totalAfterMisc, settings.roundUp);
  return (
    <div className="subpage-container">
      <h4 className="reduced-margin">
        Bill : {settings.currency}
        {addTrailingZeros(values.bill)}
      </h4>
      <hr></hr>

      {settings.discountType === "setAmount" && (
        <h4 className="reduced-margin">
          Discount : -{settings.currency}
          {addTrailingZeros(values.discount)}
        </h4>
      )}
      {settings.discountType === "percentage" && (
        <h4 className="reduced-margin">
          Discount : -{values.discount}% @ {settings.currency}
          {addTrailingZeros(calculatePercentage(values.bill, values.discount))}
        </h4>
      )}
      <hr></hr>
      {settings.tipType === "setAmount" && (
        <h4 className="reduced-margin">
          Tip : +{settings.currency}
          {addTrailingZeros(values.tip)}
        </h4>
      )}
      {settings.tipType === "percentage" && (
        <h4 className="reduced-margin">
          Tip : +{values.tip}% @ {settings.currency}
          {addTrailingZeros(
            calculatePercentage(totalAfterDiscount, values.tip)
          )}
        </h4>
      )}
      <hr></hr>
      {values.misc < 0 && (
        <h4 className="reduced-margin">
          Offset : - {settings.currency}
          {addTrailingZeros(values.misc * -1)}
        </h4>
      )}
      {values.misc >= 0 && (
        <h4 className="reduced-margin">
          Offset : + {settings.currency}
          {addTrailingZeros(values.misc)}
        </h4>
      )}
      <hr></hr>
      <h1 className="reduced-margin">
        Total To Pay : {settings.currency}
        {addTrailingZeros(totalAfterMisc)}
      </h1>
      {settings.roundUp && (
        <>
          <hr></hr>{" "}
          <h4 className="reduced-margin">
            Rounded Up To : {settings.currency}
            {addTrailingZeros(grandTotal)}
          </h4>
        </>
      )}
      <hr></hr>
      <h4 className="reduced-margin">Number Of Payees : {settings.numPayee}</h4>
      <hr></hr>
      <h1 className="reduced-margin">
        Each Share : {settings.currency}
        {addTrailingZeros(grandTotal / settings.numPayee)}{" "}
      </h1>
      <div className="button-container">
        <Link to="/calculate" style={{ margin: "3%" }}>
          <button className="submit-button">Another</button>
        </Link>
        <Link to="/" style={{ margin: "3%" }}>
          <button className="submit-button">Home</button>
        </Link>
      </div>
    </div>
  );
}

function calculatePercentage(total: number, percentage: number): number {
  return (total * percentage) / 100;
}

function handleDiscountOrTip(
  total: number,
  offset: number,
  type: TipDiscountOptions,
  tipOrDisc: "tip" | "discount"
): number {
  switch (tipOrDisc) {
    case "tip":
      if (type === "percentage") {
        const tipAmount = calculatePercentage(total, offset);
        return total + tipAmount;
      } else {
        return total + offset;
      }
    case "discount":
      if (type === "percentage") {
        const discountAmount = calculatePercentage(total, offset);
        return total - discountAmount;
      } else {
        return total - offset;
      }
  }
}

function handleRoundUp(num: number, isRoundUp: boolean) {
  return isRoundUp ? Math.ceil(num) : num;
}
