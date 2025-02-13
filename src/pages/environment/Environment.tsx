import { useState, type ReactEventHandler } from "react";
import { CiEdit } from "react-icons/ci";
import { TbHttpDelete } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Button, BUTTON_STYLE } from "src/components/button/Button";
import { FormWrapper } from "src/components/formwrapper/FormWrapper";
import { FormInputField } from "src/components/formwrapper/components/FormInputField";
import { LabelBar } from "src/components/labelbar/LabelBar";
import { List } from "src/components/list/List";
import ShowCaseContainer from "src/components/showcasecontainer/ShowCaseContainer";
import { AxiosClient } from "src/services/AxiosClient";
import { useEnvironment } from "../../context/EnvironmentContext";
import "./Environment.css";

const Environment = () => {
  const navigate = useNavigate();
  const { environment, updateEnvironment } = useEnvironment();

  const [showCreateFlashcardDeck, setShowCreateFlashcardDeck] =
    useState<boolean>(false);
  const [showCreateQuizCollection, setShowCreateQuizCollection] =
    useState<boolean>(false);

  const createFlashcardDeck = (form: ReactEventHandler) => {
    AxiosClient.post(`flashcard-decks`, form)
      .then(updateEnvironment)
      .then(() => setShowCreateFlashcardDeck(false))
      .catch((error) => console.error(error));
  };

  const createQuizCollection = (form: ReactEventHandler) => {
    AxiosClient.post(`quiz-collections`, form)
      .then(updateEnvironment)
      .then(() => setShowCreateQuizCollection(false))
      .catch((error) => console.error(error));
  };

  if (!environment) return <div>Loading...</div>;
  return (
    <div className="environment-container">
      <LabelBar label={environment.title} />
      <div className="environment-btn-container">
        <Button
          label={<CiEdit fontSize={"30px"} />}
          btnStyle={BUTTON_STYLE.ENCOURAGE}
        />
        <Button
          label={<TbHttpDelete fontSize={"30px"} />}
          btnStyle={BUTTON_STYLE.ALERT}
        />
      </div>
      <ShowCaseContainer
        title={"Notes"}
        content={<p>Manage your notes</p>}
        handleClick={() => {
          navigate("note-collection");
        }}
      />
      <ShowCaseContainer
        title={"Tag-panel"}
        content={<p>Manage your tags</p>}
        handleClick={() => navigate(`tag-panel`)}
      />
      <ShowCaseContainer
        title={"Progress Report"}
        content={
          <div>
            <p>
              Strength:{" "}
              {environment.progressReport.strength?.title || "No Data"}
            </p>
            <p>
              Weakness:{" "}
              {environment.progressReport.weakness?.title || "No Data"}
            </p>
          </div>
        }
        handleClick={() => console.log("nav to progress-report")}
      />
      <ShowCaseContainer
        title={"Flashcard Deck"}
        content={
          <>
            {showCreateFlashcardDeck && (
              <FormWrapper
                formLabel="Create Flashcard Deck"
                handleSubmit={createFlashcardDeck}
                canClose={true}
                handleClose={() => setShowCreateFlashcardDeck(false)}
              >
                <FormInputField name="title" placeholder={"title"} />
                <input
                  type="hidden"
                  value={environment.id}
                  name="environmentId"
                />
              </FormWrapper>
            )}
            <Button
              label="+ new"
              btnStyle={BUTTON_STYLE.ENCOURAGE}
              handleClick={() => setShowCreateFlashcardDeck(true)}
            />
            <List list={environment.flashcardDecks} linkTo={"flashcard-deck"} />
          </>
        }
      />
      <ShowCaseContainer
        title={"Quiz Collection"}
        content={
          <>
            {showCreateQuizCollection && (
              <FormWrapper
                formLabel="Create Quiz Collection"
                handleSubmit={createQuizCollection}
                canClose={true}
                handleClose={() => setShowCreateQuizCollection(false)}
              >
                <FormInputField placeholder={"title"} name={"title"} />
                <input
                  type="hidden"
                  name="environmentId"
                  value={environment?.id}
                />
              </FormWrapper>
            )}
            <Button
              label={"+ new"}
              btnStyle={BUTTON_STYLE.ENCOURAGE}
              handleClick={() => setShowCreateQuizCollection(true)}
            />
            <List
              list={environment.quizCollections}
              linkTo={"quiz-collection"}
            />
          </>
        }
      />
    </div>
  );
};

export default Environment;
