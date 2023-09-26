import { Formik, FormikConfig, FormikProps } from "formik";
import { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../../app/store";
import { sendSurvey } from "../../features/surveys/surveySlice";
import { SurveyType, emailSchema, surveySchema } from "../../schemas";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = (): ReactElement => {
  const [formReview, setFormReview] = useState<boolean>(false);
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();

  const validateEmails = (recipients: string) => {
    let errors: Partial<SurveyType> = {};

    const emailArray = recipients.split(",").map((email) => email.trim());

    if (!emailSchema.isValidSync(emailArray)) {
      errors = { recipients: "Must be valid emails separated by commas" };
    }

    return errors;
  };

  const onSubmit: FormikConfig<SurveyType>["onSubmit"] = async (
    values,
    { setSubmitting }
  ) => {
    setSubmitting(true);
    await dispatch(sendSurvey(values));
    setSubmitting(false);
    setTimeout(() => navigate("/surveys"), 500);
  };

  const onClick = () => setFormReview((prev) => !prev);

  const renderContent = (props: FormikProps<SurveyType>) =>
    formReview ? (
      <SurveyFormReview onBack={onClick} />
    ) : (
      <SurveyForm props={props} onNext={onClick} />
    );

  return (
    <div>
      <Formik
        validationSchema={surveySchema}
        validate={(values) => validateEmails(values.recipients)}
        initialValues={{ recipients: "", title: "", body: "", subject: "" }}
        onSubmit={async (values, actions) => await onSubmit(values, actions)}
      >
        {(props) => renderContent(props)}
      </Formik>
    </div>
  );
};

export default SurveyNew;
