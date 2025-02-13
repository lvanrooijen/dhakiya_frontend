import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { QuizCollectionProvider } from "src/context/QuizCollectioncontext";

const QuizCollectionsWrapper: React.FC<QuizCollectionsWrapperProps> = ({
  children,
}) => {
  const { quizCollectionId } = useParams();

  if (!quizCollectionId) return <div>No ID provided</div>;

  return (
    <QuizCollectionProvider id={quizCollectionId}>
      {children}
    </QuizCollectionProvider>
  );
};

export default QuizCollectionsWrapper;

interface QuizCollectionsWrapperProps {
  children: ReactNode;
}
