import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Landing from "./Landing";
import SurveyNew from "./SurveyNew";

const App = (): ReactElement => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/surveys" element={<Dashboard />} />
        <Route path="/surveys/new" element={<SurveyNew />} />
      </Routes>
    </div>
  );
};

export default App;
