import { useEffect, useState } from "react";
import "./FormTextField.css";

const FormTextField: React.FC<FormTextFieldProps> = ({
  placeholder,
  name,
  initialValue,
  required,
}) => {
  const [content, setContent] = useState<string>();

  useEffect(() => {
    if (initialValue) setContent(initialValue);
  }, []);
  return (
    <div className="form-text-field-wrapper">
      <textarea
        name={name}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormTextField;

interface FormTextFieldProps {
  initialValue?: string;
  required?: boolean;
  name: string;
  placeholder: string;
}
