export type User = {
  _id: string;
  googleId: string;
  credits: number;
  __v: number;
};

export type SurveyFetchType =
  | {
      __v: number;
      body: string;
      dateSent: number;
      no: number;
      subject: string;
      title: string;
      yes: number;
    }[]
  | false;
