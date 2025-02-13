import type { ReactNode } from "react";
import "./ShowCaseContainer.css";

const ShowCaseContainer: React.FC<ShowCaseContainerProps> = ({
  title,
  content,
  handleClick,
}) => {
  return (
    <div
      className={`${
        handleClick ? "clickable" : ""
      } show-case-container-wrapper`}
      onClick={handleClick}
    >
      <h3>{title}</h3>
      <>{content}</>
    </div>
  );
};

export default ShowCaseContainer;

interface ShowCaseContainerProps {
  title: string;
  content: ReactNode;
  handleClick?: () => void;
}
