import type { ReactNode } from "react";
import { widthOption } from "src/types/ThemeColors";
import "./button.css";

export const Button: React.FC<ButtonProps> = ({
  label,
  handleClick,
  btnStyle,
  width,
}) => {
  return (
    <button
      className={`button ${btnStyle ? btnStyle : "btn-default"} ${
        width ? width : ""
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

interface ButtonProps {
  label: string | ReactNode;
  handleClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  btnStyle?: BUTTON_STYLE;
  width?: widthOption;
}

export enum BUTTON_STYLE {
  ALERT = "btn-alert",
  ENCOURAGE = "btn-encourage",
  ACCENT = "btn-accent",
}
