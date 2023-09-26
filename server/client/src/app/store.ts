import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import surveyReducer from "../features/surveys/surveySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    surveys: surveyReducer, 
  },
});

export type StateType = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<StateType, string, AnyAction>;

export default store;
