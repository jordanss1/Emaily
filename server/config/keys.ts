import devKeys from "./dev";
import prodKeys from "./prod";

interface IKeys {
  mongoURI: string;
  cookieKey: string;
  googleClientID: string;
  googleClientSecret: string;
}

let keys: IKeys;

if (process.env.NODE_ENV === "production") {
  keys = prodKeys as IKeys;
} else {
  keys = devKeys;
}

export default keys;
