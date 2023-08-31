import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { axiosFetchUser } from "../../api";
import { StateType } from "../../app/store";
import { User } from "../../types";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (): Promise<User> => {
    return await axiosFetchUser();
  }
);

type AuthStateType = { user: User };

const initialState: AuthStateType = { user: null };

type ReducerMatcherType = (action: AnyAction, func: () => void) => void;

const reducerMatcherFunction: ReducerMatcherType = (action, func) => {
  if (action.type.includes("fulfilled")) func();
  if (action.type.includes("pending")) console.log("pending");
  if (action.type.includes("rejected")) console.log("failed");
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addMatcher(
        (action: PayloadAction<User>) => action.type.includes("auth/fetchUser"),
        (state, action) =>
          reducerMatcherFunction(action, () => {
            state.user = action.payload;
          })
      )

      .addDefaultCase((state, action) => {
        const casesToIgnore = ["@@redux", "@@INIT"];

        const executeDefaultCase = casesToIgnore.some(
          (string) => !action.type.includes(string)
        );

        if (executeDefaultCase)
          console.log("MUST CREATE MATCHER/CASE FOR THIS ACTION");
      });
  },
});

type AuthSelectorType = (state: StateType) => AuthStateType;

export const authSelector: AuthSelectorType = (state) => {
  return state.auth;
};

export default authSlice.reducer;
