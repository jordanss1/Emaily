import { useFormikContext } from "formik";
import { ReactElement } from "react";

import { SurveyType } from "../../schemas";
import { FieldsType, fields } from "./formFields";

const SurveyFormReview = ({ onBack }: { onBack: () => void }): ReactElement => {
  const { handleSubmit, values, isSubmitting } = useFormikContext<SurveyType>();

  const renderEntries = fields.map(
    ({ label, name }: { label: string; name: FieldsType }) => {
      return (
        <div style={{ padding: "5px 0" }} key={name}>
          <label>{label}</label>
          <div style={{ fontSize: "16px" }}>{values[name]}</div>
        </div>
      );
    }
  );

  return (
    <div style={{ padding: "10px" }}>
      <h5>Please review all of your entries!</h5>
      <div>{renderEntries}</div>
      <div>
        <button
          className="red btn-flat left white-text"
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          onClick={() => handleSubmit()}
          className="green btn-flat right white-text"
          type="submit"
          disabled={isSubmitting}
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    </div>
  );
};

export default SurveyFormReview;
