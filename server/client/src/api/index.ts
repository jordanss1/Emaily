import axios from "axios";
import { Token } from "react-stripe-checkout";
import { SurveyNewType } from "../schemas";
import { SurveyFetchType, User } from "../types";

export const axiosFetchUser = async (): Promise<User | undefined> => {
  const { data } = await axios.get("/api/current_user");

  return data;
};

export const axiosSendToken = async (token: Token): Promise<User> => {
  const { data } = await axios.post("/api/stripe", token);

  return data;
};

export const axiosSendSurvey = async (survey: SurveyNewType): Promise<User> => {
  const { data } = await axios.post("/api/surveys", survey);

  return data;
};

export const axiosGetSurveys = async (): Promise<SurveyFetchType> => {
  const { data } = await axios.get("/api/surveys");

  return data;
};
