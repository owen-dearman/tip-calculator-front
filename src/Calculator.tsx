import React, { Dispatch, useState } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { formatForm } from "./utils/formatForm";
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
import { formatBill } from "./utils/formatBill";

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
    bill: formatBill(values.bill),
    tip: values.tip.toString(),
    discount: values.discount.toString(),
    misc: values.misc.toString(),
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
        bill: formatForm(form.bill),
        tip: formatForm(form.tip),
        misc: formatForm(form.misc),
        discount: formatForm(form.discount),
      },
    });
    navigate("/total");
  };

  const clearAll = () => {
    dispatch({
      type: "set-values",
      values: defaultState["values"],
    });
    dispatch({
      type: "update-settings",
      settings: defaultState["settings"],
    });
    setForm(defaultForm);
  };

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
        <button className="submit-button" onClick={clearAll}>
          Clear
        </button>
        <Link to="/">
          <button className="submit-button" type="submit">
            Home
          </button>
        </Link>
      </div>
    </section>
  );
}
