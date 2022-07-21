import React, { Dispatch, useState } from "react";
import { url } from "./utils/urls";
import { NavigateFunction } from "react-router-dom";
import { formatStringToNum, formatNumToString } from "./utils/formatForm";
import {
  Bill,
  Currency,
  Discount,
  Offset,
  Payees,
  RoundUp,
  Tip,
} from "./utils/CalculatorElements";
import { Action, defaultState, State } from "./utils/StateAction";
import axios from "axios";

interface CalculatorProps {
  dispatch: Dispatch<Action>;
  settings: State["settings"];
  values: State["values"];
  navigate: NavigateFunction;
}

export interface Form {
  bill: string;
  tip: string;
  misc: string;
  discount: string;
}

export function Calculator({
  dispatch,
  settings,
  navigate,
  values,
}: CalculatorProps): JSX.Element {
  const defaultForm = {
    bill: formatNumToString(values.bill),
    tip: formatNumToString(values.tip),
    discount: formatNumToString(values.discount),
    misc: formatNumToString(values.misc),
  };

  const [form, setForm] = useState<Form>(defaultForm);

  const updateForm = (name: string, value: string) => {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: "set-values",
      values: {
        bill: formatStringToNum(form.bill),
        tip: formatStringToNum(form.tip),
        misc: formatStringToNum(form.misc),
        discount: formatStringToNum(form.discount),
      },
    });
    navigate("/total");
  };

  function handleHome() {
    dispatch({
      type: "reset-all",
      settings: defaultState["settings"],
      values: defaultState["values"],
    });
    navigate("/");
  }

  async function handleSave() {
    const title = prompt("Enter a title for your settings", "mySettings1");
    const savedSettings = {
      name: title,
      currency: settings.currency,
      numPayee: settings.numPayee,
      discountType: settings.discountType,
      tipType: settings.tipType,
      discount: formatStringToNum(form.discount),
      tip: formatStringToNum(form.tip),
      misc: formatStringToNum(form.misc),
      roundUp: settings.roundUp,
    };
    console.log(savedSettings);
    await axios.post(url + "settings", savedSettings);
  }

  return (
    <section className="subpage-container">
      <form onSubmit={handleSubmit}>
        <Bill updateForm={updateForm} form={form} />
        <Currency dispatch={dispatch} settings={settings} />
        <Payees dispatch={dispatch} settings={settings} />
        <Discount
          dispatch={dispatch}
          updateForm={updateForm}
          settings={settings}
          form={form}
          values={values}
        />
        <Tip
          dispatch={dispatch}
          updateForm={updateForm}
          settings={settings}
          form={form}
          values={values}
        />
        <Offset updateForm={updateForm} form={form} />
        <RoundUp dispatch={dispatch} settings={settings} />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
      <div className="button-container">
        <button className="submit-button" onClick={handleHome}>
          Home
        </button>
        <button className="submit-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </section>
  );
}
