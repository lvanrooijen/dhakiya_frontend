import { useEffect, useState } from "react";
import { useFlashCardDeck } from "src/context/FlashcardDeckContext";
import type { GetFlashcard } from "src/types/api";
import Flashcard from "../flashcard/FlashCard";
import "./Rehearse.css";

const Rehearse: React.FC<RehearseProps> = ({ flashcards }) => {
  const [counter, setCounter] = useState<number>(0);
  const [flashcard, setFlashcard] = useState<GetFlashcard>(null);

  const { updateFlashCardDeck } = useFlashCardDeck();

  useEffect(() => {
    setFlashcard(flashcards[counter]);
  }, [counter]);

  if (flashcards.length == 0) return <div>No cards created yet...</div>;

  return (
    <div className="rehearse-wrapper">
      <Flashcard
        flashcard={flashcard}
        rehearseMode={true}
        handleUpdate={() => {
          if (counter >= flashcards.length - 1) {
            updateFlashCardDeck();
            setCounter(0);
          } else {
            setCounter(counter + 1);
          }
        }}
      />
    </div>
  );
};

export default Rehearse;

interface RehearseProps {
  flashcards: GetFlashcard[];
}
