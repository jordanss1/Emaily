import axios from "axios";
import { Token } from "react-stripe-checkout";
import { User } from "../types";

export const axiosFetchUser = async (): Promise<User | undefined> => {
  const { data } = await axios.get("/api/current_user");

  return data;
};

export const axiosSendToken = async (token: Token): Promise<User> => {
  console.log(token);
  const { data } = await axios.post("/api/stripe", token);

  console.log(data);

  return data;
};
