export const fields = [
  {
    label: "Recipient List",
    name: "recipients",
  },
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
] as const;

export type FieldsType = (typeof fields)[number]["name"];
