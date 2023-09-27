import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../app/store";
import { getSurveys, surveySelector } from "../../features/surveys/surveySlice";

const SurveyList = (): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const { surveys } = useSelector(surveySelector);

  useEffect(() => {
    dispatch(getSurveys());
  }, []);

  const renderSurveys = surveys
    .toSorted((a, b) => a.dateSent + b.dateSent)
    .map(({ title, body, dateSent, yes, no }, i) => {
      if (surveys.length) {
        return (
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
        );
      } else {
        return (
          <>
            <div style={{ textAlign: "center" }}>
              <h1>Emaily</h1>
              <p>Collect feedback from your users</p>
            </div>
            <div className="card darken-1">
              <div className="card-content">
                <span className="card-title">
                  Looks like you need to send some surveys!
                </span>
              </div>
            </div>
          </>
        );
      }
    });

  return <div>{renderSurveys}</div>;
};

export default SurveyList;
