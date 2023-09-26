import { Form, FormikProps } from "formik";
import { ReactElement, useRef } from "react";
import { Link } from "react-router-dom";
import { SurveyType } from "../../schemas";
import CustomInput from "../CustomInput";
import { fields } from "./formFields";

interface SurveyFormProps {
  props: FormikProps<SurveyType>;
  onNext: () => void;
}

const SurveyForm = ({ onNext, props }: SurveyFormProps): ReactElement => {
  const nextPressed = useRef<boolean>(false);

  const handleClick = async () => {
    nextPressed.current = true;
    const errors = await props.validateForm();

    if (Object.keys(errors).length === 0) {
      nextPressed.current = false;
      onNext();
    }
  };

  const renderContent = fields.map(({ name, label }) => {
    return (
      <CustomInput
        key={name}
        name={name}
        label={label}
        type="text"
        nextPressed={nextPressed}
      />
    );
  });

  return (
    <Form>
      <div style={{ padding: "10px" }}>
        {renderContent}
        <div style={{ padding: "10px 0" }}>
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button
            onClick={async () => await handleClick()}
            className="teal btn-flat right white-text"
            type="button"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SurveyForm;
