import { Button, BUTTON_STYLE } from "../button/Button";
import "./FormWrapper.css";

export const FormWrapper: React.FC<FormProps> = ({
  children,
  handleSubmit,
  formLabel,
  handleClose,
  canClose,
  canDelete,
  handleDelete,
}) => {
  const getFormValues = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData);
    handleSubmit(formValues);
  };

  if (canClose)
    return (
      <div className="form-wrapper-backdrop">
        <div className="form-wrapper">
          <Button
            label="X"
            btnStyle={BUTTON_STYLE.ALERT}
            handleClick={() => {
              handleClose(false);
            }}
          />
          <h2>{formLabel}</h2>
          <form
            onSubmit={(e) => {
              getFormValues(e);
            }}
          >
            {children}
            <Button label={"submit"} btnStyle={BUTTON_STYLE.ENCOURAGE} />
          </form>
        </div>
      </div>
    );

  if (!canClose)
    return (
      <div className="form-wrapper">
        <Button
          label="X"
          btnStyle={BUTTON_STYLE.ALERT}
          handleClick={handleDelete}
        />
        <h2>{formLabel}</h2>
        <form
          onSubmit={(e) => {
            getFormValues(e);
          }}
        >
          {children}
          <Button label={"submit"} btnStyle={BUTTON_STYLE.ENCOURAGE} />
        </form>
      </div>
    );
};

interface FormProps {
  children: React.ReactNode;
  formLabel: string;
  handleSubmit: (body: any) => void;
  handleClose?: (isClosed: boolean) => void;
  canClose?: boolean;
  canDelete?: boolean;
  handleDelete?: () => void;
}
