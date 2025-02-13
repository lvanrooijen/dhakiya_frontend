import { useEffect, useState, type ReactEventHandler } from "react";
import { Button } from "src/components/button/Button";
import { FormInputField } from "src/components/formwrapper/components/FormInputField";
import FormTextField from "src/components/formwrapper/components/formtextfield/FormTextField";
import { FormWrapper } from "src/components/formwrapper/FormWrapper";
import { TagSelect } from "src/components/tagselect/TagSelect";
import { useFlashCardDeck } from "src/context/FlashcardDeckContext";
import { AxiosClient } from "src/services/AxiosClient";
import type { GetFlashcard, GetTagBasic } from "src/types/api";
import "./Flashcard.css";

const Flashcard: React.FC<FlashCardProps> = ({
  flashcard,
  rehearseMode,
  handleUpdate,
}) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { updateFlashCardDeck } = useFlashCardDeck();

  useEffect(() => {
    if (flashcard) {
      setTitle(flashcard.title);
      setContent(flashcard.content);
    }
  }, []);

  const updateFlashcardFlag = (option: FLASHCARD_OPTION) => {
    handleUpdate();
    const body = { flag: option };
    AxiosClient.patch(`flashcards/${flashcard.id}`, body).catch((error) =>
      console.error(error)
    );
    setShowContent(false);
  };

  const patchFlashCard = (form: ReactEventHandler) => {
    AxiosClient.patch(`flashcards/${flashcard.id}`, form)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  const deleteFlashcard = () => {
    AxiosClient.delete(`flashcards/${flashcard.id}`)
      .then(updateFlashCardDeck)
      .catch((error) => console.error(error));
  };

  if (!flashcard) return <div>Loading...</div>;

  if (rehearseMode) {
    return (
      <div className="flashcard-wrapper">
        <div className="flashcard-title">{flashcard.title}</div>

        {showContent ? (
          <>
            <div className="flashcard-content">{flashcard.content}</div>
            <div className="flashcard-option-box">
              <Button
                label={"hard"}
                handleClick={() =>
                  updateFlashcardFlag(FLASHCARD_OPTION.FLAGGED_DIFFICULT)
                }
              />
              <Button
                label={"wrong"}
                handleClick={() =>
                  updateFlashcardFlag(FLASHCARD_OPTION.INCORRECT)
                }
              />
              <Button label={"skip"} handleClick={handleUpdate} />
              <Button
                label={"right"}
                handleClick={() =>
                  updateFlashcardFlag(FLASHCARD_OPTION.CORRECT)
                }
              />
              <Button
                label={"easy"}
                handleClick={() =>
                  updateFlashcardFlag(FLASHCARD_OPTION.FLAGGED_EASY)
                }
              />
            </div>
          </>
        ) : (
          <>
            <div className="flashcard-content"></div>
            <div className="flashcard-option-box">
              <Button label={"show"} handleClick={() => setShowContent(true)} />
            </div>
          </>
        )}
      </div>
    );
  }

  if (!rehearseMode)
    return (
      <>
        <FormWrapper
          formLabel={"Flashcard"}
          handleSubmit={patchFlashCard}
          handleDelete={deleteFlashcard}
        >
          <FormInputField
            placeholder={"Title"}
            name={"title"}
            initialvalue={flashcard?.title}
          />
          <FormTextField
            name={"content"}
            placeholder={"Content"}
            initialValue={flashcard?.content}
          />
          <TagSelect
            isEnabled={true}
            initialValue={
              flashcard?.tag ? (flashcard.tag as GetTagBasic) : null
            }
          />
        </FormWrapper>
      </>
    );
};

export default Flashcard;

interface FlashCardProps {
  flashcard: GetFlashcard;
  rehearseMode?: boolean;
  handleUpdate?: () => void;
}

enum FLASHCARD_OPTION {
  FLAGGED_EASY = "FLAGGED_EASY",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
  FLAGGED_DIFFICULT = "FLAGGED_DIFFICULT",
}
