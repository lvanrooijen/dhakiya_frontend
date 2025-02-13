import "./HeaderBar.css";

export const HeaderBar: React.FC<HeaderBarProps> = ({
  label,
  option1,
  option2,
  option3,
  option4,
}) => {
  return (
    <div className="header-bar-wrapper">
      <div>{label}</div>
      <div className="header-bar-wrapper-options">{option4 && option4}</div>
      <div className="header-bar-wrapper-options">{option3 && option3}</div>
      <div className="header-bar-wrapper-options">{option2 && option2}</div>
      <div className="header-bar-wrapper-options">{option1 && option1}</div>
    </div>
  );
};

interface HeaderBarProps {
  label: string;
  option1?: string | React.ReactNode;
  option2?: string | React.ReactNode;
  option3?: string | React.ReactNode;
  option4?: string | React.ReactNode;
}
