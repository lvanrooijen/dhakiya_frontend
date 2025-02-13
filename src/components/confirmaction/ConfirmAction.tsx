import { Button, BUTTON_STYLE } from "../button/Button";
import "./ConfirmAction.css";

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  question,
  getConfirmation,
}) => {
  return (
    <div
      className="confirm-action-wrapper"
      onClick={(e) => {
        if (e.target.classList.contains("btn-encourage")) {
          getConfirmation(true);
        } else {
          getConfirmation(false);
        }
      }}
    >
      <div>
        <p>{question}</p>
        <div>
          <Button label="yes" btnStyle={BUTTON_STYLE.ENCOURAGE} />
          <Button label="no" btnStyle={BUTTON_STYLE.ALERT} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;

interface ConfirmActionProps {
  question: string;
  getConfirmation: (answer: boolean) => void;
}
