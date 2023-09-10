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
  async (): Promise<User | undefined> => {
    return await axiosFetchUser();
  }
);

type AuthStateType = { user: User | false | null };

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
            state.user = action.payload || false;
          })
      )

      .addDefaultCase((state, action) => state);
  },
});

type AuthSelectorType = (state: StateType) => AuthStateType;

export const authSelector: AuthSelectorType = (state) => {
  return state.auth;
};

export default authSlice.reducer;
