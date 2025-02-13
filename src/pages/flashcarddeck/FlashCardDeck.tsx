import { useState } from "react";
import { Button, BUTTON_STYLE } from "src/components/button/Button";
import { FormWrapper } from "src/components/formwrapper/FormWrapper";
import { FormInputField } from "src/components/formwrapper/components/FormInputField";
import FormTextField from "src/components/formwrapper/components/formtextfield/FormTextField";
import { HeaderBar } from "src/components/headerbar/HeaderBar";
import { useFlashCardDeck } from "src/context/FlashcardDeckContext";
import { AxiosClient } from "src/services/AxiosClient";
import type { PostFlashcard } from "src/types/api";
import { TagSelect } from "../../components/tagselect/TagSelect";
import "./FlashCardDeck.css";
import Flashcard from "./components/flashcard/FlashCard";
import FlashCardDeckStats from "./components/flashcarddeckstats/FlashCardDeckStats";
import Rehearse from "./components/rehearse/Rehearse";

const FlashCardDeck = () => {
  const { updateFlashCardDeck, flashCardDeck } = useFlashCardDeck();
  const [showCreateFlashcard, setShowCreateFlashcard] =
    useState<boolean>(false);
  const [mode, setMode] = useState<FLASHCARDDECK_MODE>(
    FLASHCARDDECK_MODE.STATISTICS
  );

  const handlePostFlashCard = (form: PostFlashcard) => {
    AxiosClient.post("flashcards", form)
      .then((response) => {
        console.log(response);
        updateFlashCardDeck();
        setShowCreateFlashcard(false);
      })
      .catch((error) => console.error(error));
  };

  if (!flashCardDeck) return <div>Loading flashcard deck...</div>;
  return (
    <div className="flashcard-deck-wrapper">
      <HeaderBar
        label={"Flashcard deck: " + flashCardDeck.title}
        option1={
          <Button
            label={"+ new"}
            btnStyle={BUTTON_STYLE.ENCOURAGE}
            handleClick={() => setShowCreateFlashcard(true)}
          />
        }
      />

      {showCreateFlashcard && (
        <FormWrapper
          canClose={true}
          handleClose={() => setShowCreateFlashcard(false)}
          formLabel={"Create Flashcard"}
          handleSubmit={handlePostFlashCard}
        >
          <FormInputField type="text" name={"title"} placeholder="Title" />
          <FormTextField
            name="content"
            placeholder="Write your content here..."
            required={true}
          />
          <input
            type="hidden"
            name={"flashcardDeckId"}
            value={flashCardDeck.id}
            required={true}
          />
          <FormInputField
            placeholder={"Minimum Displays"}
            name={"minimumDisplays"}
            required={true}
            type="number"
            range={{ min: 5, max: 10 }}
          />
          <TagSelect isEnabled={true} />
        </FormWrapper>
      )}

      <div className="flashcard-deck-mode-container">
        <div className="flashcard-deck-mode-options">
          <span
            className={
              mode == FLASHCARDDECK_MODE.REHEARSE
                ? "flashcard-deck-mode-selected"
                : ""
            }
            onClick={() => setMode(FLASHCARDDECK_MODE.REHEARSE)}
          >
            Rehearse
          </span>
          <span
            className={
              mode == FLASHCARDDECK_MODE.VIEW
                ? "flashcard-deck-mode-selected"
                : ""
            }
            onClick={() => setMode(FLASHCARDDECK_MODE.VIEW)}
          >
            View Cards
          </span>
          <span
            className={
              mode == FLASHCARDDECK_MODE.STATISTICS
                ? "flashcard-deck-mode-selected"
                : ""
            }
            onClick={() => setMode(FLASHCARDDECK_MODE.STATISTICS)}
          >
            View Statistics
          </span>
        </div>
        {mode == FLASHCARDDECK_MODE.REHEARSE && (
          <Rehearse flashcards={flashCardDeck.flashcards} />
        )}
        {mode == FLASHCARDDECK_MODE.VIEW &&
          flashCardDeck.flashcards.map((flashCard) => (
            <Flashcard key={flashCard.id} flashcard={flashCard} />
          ))}
        {mode == FLASHCARDDECK_MODE.STATISTICS && (
          <FlashCardDeckStats flashcards={flashCardDeck.flashcards} />
        )}
      </div>
    </div>
  );
};

export default FlashCardDeck;

enum FLASHCARDDECK_MODE {
  REHEARSE,
  VIEW,
  STATISTICS,
}
