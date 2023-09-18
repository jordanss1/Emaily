import prodKeys from "./prod";
let keys;
if (process.env.NODE_ENV === "production") {
    keys = prodKeys;
}
else {
    keys = require("./dev");
}
export default keys;
