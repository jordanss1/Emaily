import { useField } from "formik";
import { ReactElement } from "react";
import { CustomInputProps } from "./CustomInput";

interface CustomTextAreaProps extends Omit<CustomInputProps, "type"> {}

const CustomTextArea = ({
  label,
  ...props
}: CustomTextAreaProps): ReactElement => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label>{label}</label>
      <textarea
        {...field}
        {...props}
        className={meta.error && meta.touched ? "error-textarea" : ""}
      />
      {meta.error && meta.touched && (
        <div className="error-text">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomTextArea;
