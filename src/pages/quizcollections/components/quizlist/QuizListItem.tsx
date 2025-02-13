import { useNavigate } from "react-router-dom";
import { Button } from "src/components/button/Button";
import type { GetQuiz } from "src/types/api";

const QuizListItem: React.FC<QuizListItemProps> = ({ quiz }) => {
  const navigate = useNavigate();

  return (
    <li key={quiz.id}>
      <div>Tag: {}</div>
      <div>Title: {quiz.title}</div>
      <div>Attempts: </div>
      <div>Statistics: </div>
      <Button
        label={"Take"}
        handleClick={() => {
          console.log("navigate to quiz taking page");
        }}
      />
    </li>
  );
};

export default QuizListItem;

interface QuizListItemProps {
  quiz: GetQuiz;
}
