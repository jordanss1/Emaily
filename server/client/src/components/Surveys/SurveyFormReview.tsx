import { useFormikContext } from "formik";
import { ReactElement } from "react";
import { SurveyType } from "../../schemas";
import { FieldsType, fields } from "./formFields";

const SurveyFormReview = ({ onBack }: { onBack: () => void }): ReactElement => {
  const { handleSubmit, values } = useFormikContext<SurveyType>();

  const renderEntries = () => {
    return fields.map(
      ({ label, name }: { label: string; name: FieldsType }) => {
        return (
          <div key={name}>
            <label>{label}</label>
            <div>{values[name]}</div>
          </div>
        );
      }
    );
  };

  return (
    <div>
      <h5>Please review all of your entries!</h5>
      <div>{renderEntries()}</div>
      <div>
        <button
          className="red btn-flat left white-text"
          type="button"
          onClick={onBack}
        >
          Back
        </button>
        <button
          onClick={() => handleSubmit()}
          className="teal btn-flat right white-text"
          type="submit"
        >
          Submit
          <i className="material-icons right">done</i>
        </button>
      </div>
    </div>
  );
};

export default SurveyFormReview;
