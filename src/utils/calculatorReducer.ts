import { Action, State } from "./StateAction";

export const calculatorReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "update-settings":
      return {
        ...state,
        settings: action.settings,
      };
    case "set-values":
      return {
        ...state,
        values: action.values,
      };
    case "reset-all":
      return {
        ...state,
        values: action.values,
        settings: action.settings,
      };
    case "saved-settings":
      return {
        ...state,
        savedSettings: action.settings,
        isLoading: action.isLoading,
      };
    case "request":
      return {
        ...state,
        isLoading: action.isLoading,
      };
  }
};
