import { useState } from "react";
import { Button, BUTTON_STYLE } from "src/components/button/Button";
import { FormInputField } from "src/components/formwrapper/components/FormInputField";
import { FormWrapper } from "src/components/formwrapper/FormWrapper";
import { HeaderBar } from "src/components/headerbar/HeaderBar";
import { List } from "src/components/list/List";
import { useQuizCollection } from "src/context/QuizCollectioncontext";
import { AxiosClient } from "src/services/AxiosClient";

export const QuizCollectionsPage = () => {
  const [showPostQuizForm, setShowPostQuizForm] = useState<boolean>(false);
  const { quizCollection, updateQuizCollection } = useQuizCollection();
  console.log("q col: ", quizCollection);

  const createNewQuiz = (form: React.FormEvent) => {
    console.log(form);
    AxiosClient.post(`quizzes`, form)
      .then(updateQuizCollection)
      .catch((error) => console.error(error))
      .finally(() => setShowPostQuizForm(false));
  };

  if (!quizCollection) return <div>Loading...</div>;

  return (
    <>
      <div>QuizCollectionsPage</div>
      <HeaderBar
        label={"Quiz Collection"}
        option1={
          <Button
            label={"+ new"}
            btnStyle={BUTTON_STYLE.ENCOURAGE}
            handleClick={() => setShowPostQuizForm(true)}
          />
        }
      />
      {showPostQuizForm && (
        <FormWrapper
          formLabel="Quiz"
          handleSubmit={createNewQuiz}
          canClose={true}
          handleClose={() => setShowPostQuizForm(false)}
        >
          <FormInputField
            placeholder={"Title"}
            name={"title"}
            required={true}
          />
          <input
            type="hidden"
            value={quizCollection.id}
            name="quizCollectionId"
          />
          <FormInputField
            type="number"
            name="size"
            placeholder="12"
            range={{ min: 12, max: 60 }}
          />
        </FormWrapper>
      )}
      <div>
        <List list={quizCollection.quizList} linkTo={"quiz"} />
      </div>
    </>
  );
};
