import devKeys, { KeysType } from "./dev";
import prodKeys from "./prod";

let keys: KeysType;

if (process.env.NODE_ENV === "production") {
  keys = prodKeys as KeysType;
} else {
  keys = devKeys;
}

export default keys;
