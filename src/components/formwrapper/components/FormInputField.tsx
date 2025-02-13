import { useEffect, useState } from "react";
import "./FormInputField.css";

export const FormInputField: React.FC<FormInputFieldProps> = ({
  placeholder,
  name,
  type,
  initialvalue,
  required,
  range,
}) => {
  const [value, setValue] = useState<string | number>("");

  useEffect(() => {
    if (initialvalue) setValue(initialvalue);
  }, []);

  return (
    <div className="text-field-wrapper">
      {type == "number" && range ? (
        <input
          type={type}
          name={name}
          value={value}
          required={required}
          min={range.min}
          max={range.max}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <input
          type={type || "text" || "hidden"}
          placeholder={placeholder}
          id={name}
          name={name}
          value={value}
          required={required}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
};

interface FormInputFieldProps {
  placeholder: string;
  name: string;
  type?: string;
  initialvalue?: string;
  required?: boolean;
  range?: { min: number; max: number };
}
