import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<StateType, string, AnyAction>;

export default store;
