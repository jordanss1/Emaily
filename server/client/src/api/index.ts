import axios from "axios";
import { User } from "../types";

export const axiosFetchUser = async (): Promise<User | undefined> => {
  const { data } = await axios.get("/api/current_user");

  return data;
};
