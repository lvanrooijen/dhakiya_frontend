import type { GetFlashcard } from "src/types/api";
import "./FlashCardDeckStats.css";
const FlashCardDeckStats: React.FC<FlashCardDeckStatsProps> = ({
  flashcards,
}) => {
  if (flashcards)
    return (
      <ul className="flashcard-deck-stats-wrapper">
        {flashcards.map((flashCard) => (
          <li key={flashCard.id} className="flashcard-deck-stats-item">
            <span>title</span>
            <span>{flashCard.title}</span>
            <span>card status</span>
            <span>
              {flashCard.status.toString().toLowerCase().replace("_", " ")}
            </span>
            <span>tag</span>
            <span>{flashCard.tag?.title}</span>
          </li>
        ))}
      </ul>
    );
  if (flashcards.length <= 0) return <div>No Flashcards...</div>;
  if (!flashcards) return <div>loading...</div>;
};

export default FlashCardDeckStats;

interface FlashCardDeckStatsProps {
  flashcards: GetFlashcard[];
}
