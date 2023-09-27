import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosGetSurveys, axiosSendSurvey } from "../../api";
import { StateType } from "../../app/store";
import { SurveyNewType } from "../../schemas";
import { SurveyFetchType, User } from "../../types";
import { reducerMatcherFunction } from "../auth/authSlice";

export const sendSurvey = createAsyncThunk<User, SurveyNewType>(
  "auth/fetchUser",
  async (survey) => {
    return await axiosSendSurvey(survey);
  }
);

export const getSurveys = createAsyncThunk<SurveyFetchType>(
  "surveys/getSurveys",
  async () => {
    return await axiosGetSurveys();
  }
);

type SurveyStateType = {
  surveys: SurveyFetchType;
};

const initialState: SurveyStateType = { surveys: [] };

const surveyReducer = createSlice({
  name: "surveys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.includes("surveys/getSurveys"),
      (state, action: PayloadAction<SurveyFetchType>) =>
        reducerMatcherFunction(action, () => {
          state.surveys = [];
        })
    );
  },
});

type SurveySelectorType = (state: StateType) => SurveyStateType;

export const surveySelector: SurveySelectorType = (state) => state.surveys;

export default surveyReducer.reducer;
