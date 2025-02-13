import { useState } from "react";
import { Button, BUTTON_STYLE } from "src/components/button/Button";
import { FormWrapper } from "src/components/formwrapper/FormWrapper";
import { FormInputField } from "src/components/formwrapper/components/FormInputField";
import { HeaderBar } from "src/components/headerbar/HeaderBar";
import { useEnvironment } from "src/context/EnvironmentContext";
import { AxiosClient } from "src/services/AxiosClient";
import type { PostTag } from "src/types/api";
import "./TagPanel.css";
import { TagList } from "./components/taglist/TagList";
export const TagPanel = () => {
  const { environment, updateEnvironment } = useEnvironment();
  const [showCreateTagForm, setShowCreateTagForm] = useState<boolean>(false);

  const postTag = (form: PostTag) => {
    AxiosClient.post("tags", form)
      .then(updateEnvironment)
      .catch((error) => console.error(error));
    setShowCreateTagForm(false);
  };

  return (
    <div className="tag-panel-wrapper">
      {showCreateTagForm && (
        <FormWrapper
          formLabel={"Create Tag"}
          handleSubmit={postTag}
          handleClose={(isOpen) => {
            setShowCreateTagForm(isOpen);
          }}
          canClose={true}
        >
          <FormInputField
            required={true}
            placeholder={"title"}
            name={"title"}
          />
          <input type="hidden" value={environment.id} name="environmentId" />
        </FormWrapper>
      )}
      <HeaderBar
        label={"Tag Panel"}
        option1={"filter by"}
        option2={"Sort By"}
        option3={
          <Button
            label={"+ new"}
            btnStyle={BUTTON_STYLE.ENCOURAGE}
            handleClick={() => {
              setShowCreateTagForm(true);
            }}
          />
        }
      />
      {environment && <TagList tags={environment.tags} />}
    </div>
  );
};
