import Mailgun from "mailgun-js";
import keys from "../config/keys";
import { RecipientSchemaType } from "../models/Recipient";

const mailgun = new Mailgun({
  apiKey: keys.mailgunKey,
  domain: keys.mailgunDomain,
});

type MailgunMailerData = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

class MailgunMailer {
  data: MailgunMailerData;

  constructor(
    subject: string,
    recipients: RecipientSchemaType[],
    content: string
  ) {
    this.data = {
      from: "no-reply@YOUR_ADDRESS.com",
      to: this.formatAddresses(recipients),
      subject: subject,
      html: content,
    };
  }

  formatAddresses(recipients: RecipientSchemaType[]): string {
    return recipients.map(({ email }) => email).join(",");
  }

  async send() {
    return await mailgun.messages().send(this.data);
    }
}

export default MailgunMailer;
