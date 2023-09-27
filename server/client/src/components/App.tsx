import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AppThunkDispatch } from "../app/store";
import { fetchUser } from "../features/auth/authSlice";
import "../styles/App.css";
import Dashboard from "./Dashboard";
import Header from "./Header";
import SurveyNew from "./Surveys/SurveyNew";

const App = (): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/surveys/new" element={<SurveyNew />} />
      </Routes>
    </div>
  );
};

export default App;
