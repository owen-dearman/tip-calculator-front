import { useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Calculator } from "./Calculator";
import { HomePage } from "./HomePage";
import { IndexPage } from "./IndexPage";
import { Total } from "./Total";
import { calculatorReducer } from "./utils/calculatorReducer";
import { defaultState } from "./utils/StateAction";

function App(): JSX.Element {
  const [{ savedSettings, settings, values, isLoading }, dispatch] = useReducer(
    calculatorReducer,
    defaultState
  );
  const navigate = useNavigate();
  return (
    <div className="fullpage">
      <img
        className="title-image"
        alt="tip of the old block text in blue bubble writing"
        src="logo.png"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/index"
          element={
            <IndexPage
              navigate={navigate}
              dispatch={dispatch}
              savedSettings={savedSettings}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/calculate"
          element={
            <Calculator
              dispatch={dispatch}
              settings={settings}
              values={values}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/total"
          element={<Total settings={settings} values={values} />}
        />
      </Routes>
    </div>
  );
}

export default App;
