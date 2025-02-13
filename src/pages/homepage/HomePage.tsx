import { useEffect, useState } from "react";
import { Button, BUTTON_STYLE } from "src/components/button/Button";
import { FormInputField } from "src/components/formwrapper/components/FormInputField";
import { FormWrapper } from "src/components/formwrapper/FormWrapper";
import { List } from "src/components/list/List";
import { AxiosClient } from "src/services/AxiosClient";
import { GetEnvironment, type PostEnvironment } from "src/types/api";
import { LabelBar } from "../../components/labelbar/LabelBar";
import "./HomePage.css";

export const HomePage = () => {
  const [environments, setEnvironments] = useState<GetEnvironment[]>([]);
  const [showPostEnvironmentForm, setShowPostEnvironmentForm] =
    useState<boolean>(false);

  useEffect(() => {
    getEnvironments();
  }, []);

  const getEnvironments = () => {
    AxiosClient.get("environments")
      .then((response: GetEnvironment[]) => setEnvironments(response))
      .catch((error) => console.error(error));
  };

  const postEnvironment = (form: PostEnvironment) => {
    AxiosClient.post("environments", form)
      .then(() => {
        getEnvironments();
        setShowPostEnvironmentForm(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {showPostEnvironmentForm && (
        <FormWrapper
          formLabel={"Create Environment"}
          handleSubmit={(form) => postEnvironment(form)}
          canClose={true}
          handleClose={(status) => setShowPostEnvironmentForm(status)}
        >
          <FormInputField
            name={"title"}
            placeholder={"Title"}
            required={true}
          />
        </FormWrapper>
      )}
      <div className={` environments-box`}>
        <LabelBar label={"Environments"} />
        <Button
          label={"+ environment"}
          btnStyle={BUTTON_STYLE.ENCOURAGE}
          handleClick={() => setShowPostEnvironmentForm(true)}
        />
        <List list={environments} linkTo={"environment"} />
      </div>
    </>
  );
};
