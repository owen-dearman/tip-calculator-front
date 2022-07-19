import axios from "axios";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { Action, FetchedSettings } from "./utils/StateAction";
import { url } from "./utils/urls";

interface SingleIndexItemProps {
  data: FetchedSettings;
  dispatch: Dispatch<Action>;
  navigate: NavigateFunction;
}

export function SingleIndexItem({
  data,
  dispatch,
  navigate,
}: SingleIndexItemProps): JSX.Element {
  function handleUse(data: FetchedSettings) {
    const settings = {
      discountType: data.discounttype,
      tipType: data.tiptype,
      numPayee: data.numpayee,
      roundUp: data.roundup,
      currency: data.currency ? data.currency : "",
    };
    const values = {
      bill: 0,
      discount: data.discount,
      tip: data.tip,
      misc: data.misc,
    };
    dispatch({ type: "update-settings", settings: settings });
    dispatch({ type: "set-values", values: values });
    navigate("/calculate");
  }

  async function handleDelete(data: FetchedSettings) {
    await axios.delete(url + `settings/${data.id}`);
  }
  return (
    <div>
      <h2>{data.name}</h2>
      <h5>💵: {data.currency}</h5>
      <h5>🧑: {data.numpayee}</h5>
      {data.tiptype === "percentage" ? (
        <h5>⬆️: {data.tip}%</h5>
      ) : (
        <h5>
          ⬆️: {data.currency}
          {data.tip}
        </h5>
      )}
      {data.discounttype === "percentage" ? (
        <h5>⬇️: {data.discount}%</h5>
      ) : (
        <h5>
          ⬇️: {data.currency}
          {data.discount}
        </h5>
      )}
      <h5>❓: {data.misc}</h5>
      {data.roundup ? <h5>🆙: ✔️</h5> : <h5>🆙: ❌</h5>}
      <button onClick={() => handleUse(data)}>Use</button>
      <button onClick={() => handleDelete(data)}>Delete</button>
    </div>
  );
}