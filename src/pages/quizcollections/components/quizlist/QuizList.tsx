import type { GetQuiz } from "src/types/api";
import QuizListItem from "./QuizListItem";

export const QuizList: React.FC<QuizListProps> = ({ list }) => {
  return <ul>{list && list.map((quiz) => <QuizListItem quiz={quiz} />)}</ul>;
};

interface QuizListProps {
  list: GetQuiz[];
}
