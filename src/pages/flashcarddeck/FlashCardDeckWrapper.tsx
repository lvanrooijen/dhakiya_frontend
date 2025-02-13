import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { FlashCardDeckProvider } from "src/context/FlashcardDeckContext";

export const FlashCardDeckWrapper: React.FC<FlashCardDeckWrapperProps> = ({
  children,
}) => {
  const { flashcardDeckId } = useParams();

  if (!flashcardDeckId) return <div>No ID provided</div>;

  return (
    <FlashCardDeckProvider id={flashcardDeckId}>
      {children}
    </FlashCardDeckProvider>
  );
};

interface FlashCardDeckWrapperProps {
  children: ReactNode;
}
