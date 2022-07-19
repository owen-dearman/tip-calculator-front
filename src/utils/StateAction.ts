export type TipDiscountOptions = "percentage" | "setAmount";

export interface FetchedSettings {
  id: number;
  name: string;
  currency: string;
  numpayee: number;
  discounttype: TipDiscountOptions;
  tiptype: TipDiscountOptions;
  discount: number;
  tip: number;
  misc: number;
  roundup: boolean;
}

export type State = {
  savedSettings: FetchedSettings[];
  isLoading: boolean;
  settings: {
    discountType: TipDiscountOptions;
    tipType: TipDiscountOptions;
    numPayee: number;
    roundUp: boolean;
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
  | { type: "reset-all"; values: State["values"]; settings: State["settings"] }
  | { type: "saved-settings"; settings: FetchedSettings[]; isLoading: false }
  | { type: "request"; isLoading: true };

export const defaultState: State = {
  savedSettings: [],
  isLoading: false,
  settings: {
    discountType: "percentage",
    tipType: "percentage",
    numPayee: 1,
    roundUp: false,
    currency: "",
  },
  values: {
    bill: 0,
    discount: 0,
    tip: 0,
    misc: 0,
  },
};
