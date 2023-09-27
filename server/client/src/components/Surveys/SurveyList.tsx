import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../app/store";
import { authSelector } from "../../features/auth/authSlice";
import { getSurveys, surveySelector } from "../../features/surveys/surveySlice";

const SurveyList = (): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const { surveys } = useSelector(surveySelector);
  const { user } = useSelector(authSelector);

  useEffect(() => {
    dispatch(getSurveys(""));
  }, []);

  const renderSurveys = () => {
    if (surveys) {
      return surveys
        .toSorted((a, b) => a.dateSent + b.dateSent)
        .map(({ title, body, dateSent, yes, no }, i) => (
          <div className="card darken-1" key={i}>
            <div className="card-content">
              <span className="card-title">{title}</span>
              <p>{body}</p>
              <p className="right">
                Sent on: {new Date(dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a>Yes: {yes}</a>
              <a>No: {no}</a>
            </div>
          </div>
        ));
    } else if (surveys === false) {
      return (
        <div style={{ textAlign: "center" }}>
          <h1>Emaily</h1>
          <p style={{ paddingBottom: "50px" }}>
            Collect feedback from your users
          </p>
          {user && <h5>Looks like you need to send some surveys!</h5>}
        </div>
      );
    } else {
      return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }
  };

  return <div>{renderSurveys()}</div>;
};

export default SurveyList;
