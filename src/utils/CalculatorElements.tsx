import { Dispatch } from "react";
import ReactSlider from "react-slider";
import { Form } from "../Calculator";
import { Action, State } from "./StateAction";

interface FullCalculatorProps {
  dispatch: Dispatch<Action>;
  settings: State["settings"];
  form: Form;
  updateForm: (arg0: string, arg1: string) => void;
}

interface PartialCalculatorPropsDispatch {
  dispatch: Dispatch<Action>;
  settings: State["settings"];
}

interface PartialCalculatorPropsForm {
  form: Form;
  updateForm: (arg0: string, arg1: string) => void;
}

export function Currency({
  dispatch,
  settings,
}: PartialCalculatorPropsDispatch): JSX.Element {
  return (
    <>
      <p className="calculator-component-title">
        <strong>Currency</strong>
      </p>
      <input
        className="calculator-component-input"
        value={settings.currency}
        name="currency"
        placeholder="Insert Symbol *optional*"
        maxLength={1}
        onChange={(e) =>
          dispatch({
            type: "update-settings",
            settings: { ...settings, currency: e.target.value },
          })
        }
      />
    </>
  );
}

export function Bill({
  updateForm,
  form,
}: PartialCalculatorPropsForm): JSX.Element {
  return (
    <div>
      <p className="calculator-component-title">
        <strong>Bill</strong>
      </p>
      <input
        className="calculator-component-input"
        value={form.bill}
        name="bill"
        placeholder="Insert Number"
        type="float"
        onChange={(e) => updateForm(e.target.name, e.target.value)}
      />
    </div>
  );
}

export function Payees({
  dispatch,
  settings,
}: PartialCalculatorPropsDispatch): JSX.Element {
  return (
    <div>
      <p className="calculator-component-title">
        <strong>Payees</strong>
      </p>
      <ReactSlider
        className="slider"
        thumbClassName="slider-thumb"
        trackClassName="slider-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        marks={1}
        min={1}
        max={20}
        onChange={(num) =>
          dispatch({
            type: "update-settings",
            settings: { ...settings, numPayee: num },
          })
        }
      />
    </div>
  );
}

export function Discount({
  dispatch,
  settings,
  form,
  updateForm,
}: FullCalculatorProps): JSX.Element {
  return (
    <div>
      <p className="calculator-component-title">
        <strong>Discount</strong>
      </p>
      <div>
        <label>
          <input
            className="calculator-component-radio"
            type="radio"
            name="discountTypePercentage"
            onChange={() =>
              dispatch({
                type: "update-settings",
                settings: { ...settings, discountType: "percentage" },
              })
            }
            checked={settings.discountType === "percentage"}
          />
          Percentage
        </label>
        <label>
          <input
            className="calculator-component-radio"
            type="radio"
            name="discountTypeAmount"
            onChange={() =>
              dispatch({
                type: "update-settings",
                settings: { ...settings, discountType: "setAmount" },
              })
            }
            checked={settings.discountType === "setAmount"}
          />
          Set Amount
        </label>
      </div>
      {settings.discountType === "setAmount" && (
        <input
          className="calculator-component-input"
          placeholder="Insert Number"
          type="float"
          name="discount"
          value={form.discount}
          onChange={(e) => updateForm(e.target.name, e.target.value)}
        />
      )}
      {settings.discountType === "percentage" && (
        <ReactSlider
          className="slider"
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
          renderThumb={(props, state) => (
            <div {...props}>{state.valueNow}%</div>
          )}
          marks={1}
          min={0}
          max={100}
          onChange={(num) => updateForm("discount", num.toString())}
        />
      )}
    </div>
  );
}

export function Tip({
  dispatch,
  settings,
  form,
  updateForm,
}: FullCalculatorProps): JSX.Element {
  return (
    <div>
      <p className="calculator-component-title">
        <strong>Tip</strong>
      </p>
      <div>
        <label>
          <input
            className="calculator-component-radio"
            type="radio"
            name="tipTypePercentage"
            onChange={() =>
              dispatch({
                type: "update-settings",
                settings: { ...settings, tipType: "percentage" },
              })
            }
            checked={settings.tipType === "percentage"}
          />
          Percentage
        </label>
        <label>
          <input
            className="calculator-component-radio"
            type="radio"
            name="tipTypeAmount"
            onChange={() =>
              dispatch({
                type: "update-settings",
                settings: { ...settings, tipType: "setAmount" },
              })
            }
            checked={settings.tipType === "setAmount"}
          />
          Set Amount
        </label>
      </div>
      {settings.tipType === "setAmount" && (
        <input
          className="calculator-component-input"
          name="tip"
          placeholder="Insert Number"
          type="float"
          value={form.tip}
          onChange={(e) => updateForm(e.target.name, e.target.value)}
        />
      )}
      {settings.tipType === "percentage" && (
        <ReactSlider
          className="slider"
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
          renderThumb={(props, state) => (
            <div {...props}>{state.valueNow}%</div>
          )}
          marks={1}
          min={0}
          max={100}
          onChange={(num) => updateForm("tip", num.toString())}
        />
      )}
    </div>
  );
}

export function Offset({
  form,
  updateForm,
}: PartialCalculatorPropsForm): JSX.Element {
  return (
    <div>
      <p className="calculator-component-title">
        <strong>Offset</strong>
      </p>
      <input
        className="calculator-component-input"
        value={form.misc}
        placeholder="Insert Number *optional*"
        type="float"
        name="misc"
        onChange={(e) => updateForm(e.target.name, e.target.value)}
      />
    </div>
  );
}

export function RoundUp({
  dispatch,
  settings,
}: PartialCalculatorPropsDispatch): JSX.Element {
  return (
    <div>
      <p className="calculator-component-title">
        <strong>Round Up</strong>
      </p>
      <div>
        <label>
          <input
            className="calculator-component-radio"
            type="radio"
            name="roundUpYes"
            onChange={() =>
              dispatch({
                type: "update-settings",
                settings: { ...settings, roundUp: true },
              })
            }
            checked={settings.roundUp === true}
          />
          Yes
        </label>
        <label>
          <input
            className="calculator-component-radio"
            type="radio"
            name="roundUpNo"
            onChange={() =>
              dispatch({
                type: "update-settings",
                settings: { ...settings, roundUp: false },
              })
            }
            checked={settings.roundUp === false}
          />
          No
        </label>
      </div>
    </div>
  );
}
