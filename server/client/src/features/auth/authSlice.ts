import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Token } from "react-stripe-checkout";
import { axiosFetchUser, axiosSendToken } from "../../api";
import { StateType } from "../../app/store";
import { User } from "../../types";

export const fetchUser = createAsyncThunk<User | undefined>(
  "auth/fetchUser",
  async () => {
    return await axiosFetchUser();
  }
);

export const handleToken = createAsyncThunk<User, Token>(
  "auth/fetchUser",
  async (token) => {
    return await axiosSendToken(token);
  }
);

type AuthStateType = { user: User | false | null };

const initialState: AuthStateType = { user: null };

type ReducerMatcherType = (
  action: AnyAction,
  fulfilledFunc: () => void
) => void;

export const reducerMatcherFunction: ReducerMatcherType = (
  action,
  fulfilledFunc
) => {
  if (action.type.includes("fulfilled")) fulfilledFunc();
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.includes("auth/fetchUser"),
        (state, action: PayloadAction<User>) =>
          reducerMatcherFunction(action, () => {
            console.log(action.payload);
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
