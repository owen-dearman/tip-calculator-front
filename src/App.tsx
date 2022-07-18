import { useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Calculator } from "./Calculator";
import { HomePage } from "./HomePage";
import { IndexPage } from "./IndexPage";
import { Total } from "./Total";
import { calculatorReducer } from "./utils/calculatorReducer";
import { defaultState } from "./utils/StateAction";

function App(): JSX.Element {
  const [{ settings, values }, dispatch] = useReducer(
    calculatorReducer,
    defaultState
  );
  const navigate = useNavigate();
  return (
    <>
      <img
        alt="tip of the old block text in blue bubble writing"
        src="logo.png"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index" element={<IndexPage />} />
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
    </>
  );
}

export default App;
