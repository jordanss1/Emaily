import * as yup from "yup";

export const surveySchema = yup.object().shape({
  title: yup
    .string()
    .min(10, "Add a minimum of 10 character")
    .required("Title is a required field"),
  subject: yup
    .string()
    .min(10, "Add a minimum of 10 character")
    .required("Subject is a required field"),
  body: yup
    .string()
    .min(20, "Add a minimum of 20 required")
    .required("Body is a required field"),
  recipients: yup.string().required("Recipients is a required field"),
});

export type SurveyNewType = yup.InferType<typeof surveySchema>;

export const emailSchema = yup.array().of(yup.string().email());
