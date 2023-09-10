import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AppThunkDispatch } from "../app/store";
import { fetchUser } from "../features/auth/authSlice";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Landing from "./Landing";
import SurveyNew from "./SurveyNew";

const App = (): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="container">
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
