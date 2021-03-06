import axios from "axios";
import { Dispatch, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { SingleIndexItem } from "./SingleIndexItem";
import { Action, FetchedSettings } from "./utils/StateAction";
import { url } from "./utils/urls";

interface IndexPageProps {
  dispatch: Dispatch<Action>;
  savedSettings: FetchedSettings[];
  isLoading: boolean;
  navigate: NavigateFunction;
}

export function IndexPage({
  dispatch,
  savedSettings,
  isLoading,
  navigate,
}: IndexPageProps): JSX.Element {
  useEffect(() => {
    async function fetchSettings(dispatch: Dispatch<Action>) {
      dispatch({ type: "request", isLoading: true });
      const res = await axios.get(`${url}settings`);
      dispatch({
        type: "saved-settings",
        settings: res.data,
        isLoading: false,
      });
    }
    fetchSettings(dispatch);
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <div className="subpage-container">
          <h1>Loading...</h1>
        </div>
      ) : savedSettings.length > 0 ? (
        <div className="subpage-container">
          {savedSettings.map((setting) => (
            <SingleIndexItem
              key={setting.id}
              dispatch={dispatch}
              data={setting}
              navigate={navigate}
            />
          ))}
        </div>
      ) : (
        <div className="subpage-container">
          <h1>No Saved Settings</h1>
        </div>
      )}
    </>
  );
}
