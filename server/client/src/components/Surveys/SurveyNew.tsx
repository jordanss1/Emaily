import { Formik, FormikConfig, FormikProps } from "formik";
import { ReactElement, useState } from "react";
import { axiosSendSurvey } from "../../api";
import { SurveyType, emailSchema, surveySchema } from "../../schemas";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = (): ReactElement => {
  const [formReview, setFormReview] = useState<boolean>(false);

  const validateEmails = (recipients: string) => {
    let errors: Partial<SurveyType> = {};

    const emails = recipients.split(",").map((email) => email.trim());

    if (!emailSchema.isValidSync(emails)) {
      errors = { recipients: "Must be valid emails separated by commas" };
    }

    return errors;
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
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await axiosSendSurvey(values);
          setSubmitting(false);
        }}
      >
        {(props) => renderContent(props)}
      </Formik>
    </div>
  );
};

export default SurveyNew;
