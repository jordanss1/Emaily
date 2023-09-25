import { useField } from "formik";
import { MutableRefObject, ReactElement } from "react";

export type CustomInputProps = {
  name: string;
  label: string;
  type: string;
  nextPressed: MutableRefObject<boolean>;
};

const CustomInput = ({
  nextPressed,
  label,
  ...props
}: CustomInputProps): ReactElement => {
  const [field, meta] = useField(props);

  const renderError =
    (meta.error && meta.touched) || (meta.error && nextPressed.current);

  return (
    <div>
      <label>{label}</label>
      <input
        className={renderError ? "error-input" : ""}
        {...field}
        {...props}
      />
      {renderError && <div className="error-text">{meta.error}</div>}
    </div>
  );
};

export default CustomInput;
