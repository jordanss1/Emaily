import Mailgun from "mailgun-js";
import keys from "../config/keys";

const mailgun = new Mailgun({
  apiKey: keys.mailgunKey,
  domain: keys.mailgunDomain,
});

export default mailgun;
