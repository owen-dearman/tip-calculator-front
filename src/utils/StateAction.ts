export type TipDiscountOptions = "percentage" | "setAmount";
export type InputOptions =
  | ""
  | "billAmount"
  | "tipAmount"
  | "miscAmount"
  | "discountAmount"
  | "currency";

export type State = {
  settings: {
    discountType: TipDiscountOptions;
    tipType: TipDiscountOptions;
    numPayee: number;
    roundUp: boolean;
    isCalculated: boolean;
    currency: string;
  };
  values: {
    bill: number;
    discount: number;
    tip: number;
    misc: number;
  };
};

export type Action =
  | {
      type: "update-settings";
      settings: State["settings"];
    }
  | { type: "set-values"; values: State["values"] }
  | { type: "reset-all"; values: State["values"]; settings: State["settings"] };

export const defaultState: State = {
  settings: {
    discountType: "percentage",
    tipType: "percentage",
    numPayee: 1,
    roundUp: false,
    isCalculated: false,
    currency: "",
  },
  values: {
    bill: 0,
    discount: 0,
    tip: 0,
    misc: 0,
  },
};
