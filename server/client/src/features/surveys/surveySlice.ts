import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosSendSurvey } from "../../api";
import { StateType } from "../../app/store";
import { SurveyType } from "../../schemas";
import { User } from "../../types";

export const sendSurvey = createAsyncThunk<User, SurveyType>(
  "auth/fetchUser",
  async (survey) => {
    return await axiosSendSurvey(survey);
  }
);

type SurveyStateType = {};

const initialState: SurveyStateType = {};

const surveyReducer = createSlice({
  name: "surveys",
  initialState,
  reducers: {},
});

type SurveySelectorType = (state: StateType) => SurveyStateType;

export const surevySelector: SurveySelectorType = (state) => state.surveys;

export default surveyReducer.reducer;
