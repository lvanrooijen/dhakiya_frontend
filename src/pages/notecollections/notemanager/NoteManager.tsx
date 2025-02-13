import { useEffect, useState } from "react";
import { TbHttpDelete } from "react-icons/tb";
import { Button, BUTTON_STYLE } from "src/components/button/Button";
import ConfirmAction from "src/components/confirmaction/ConfirmAction";
import { useEnvironment } from "src/context/EnvironmentContext";
import { AxiosClient } from "src/services/AxiosClient";
import { GetNote } from "src/types/api";
import { useGetForm } from "src/utils/useGetForm";
import { TagSelect } from "../../../components/tagselect/TagSelect";
import "./NoteManager.css";

export const NoteManager: React.FC<NoteEditorProps> = ({
  note,
  closeForm,
  isNew,
}) => {
  const { environment, updateEnvironment } = useEnvironment();

  const [title, setTitle] = useState<string | null>("");
  const [content, setContent] = useState<string | null>("");
  const [showConfirmAction, setShowConfirmAction] = useState<boolean>(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = useGetForm(e);
    let url = `notes`;
    let method: "post" | "patch" = "post";
    if (note && note.id) {
      url = `notes/${note.id}`;
      method = "patch";
    }
    AxiosClient[method](url, form)
      .then(() => {
        updateEnvironment();
        if (!note) closeForm(true);
      })
      .catch((error) => console.error(error));
  };

  const confirmAndDelete = (answer: boolean) => {
    if (!answer) {
      setShowConfirmAction(false);
    }
    if (note.id) {
      AxiosClient.delete(`notes/${note.id}`)
        .then(() => {
          setShowConfirmAction(false);
          updateEnvironment();
        })
        .catch((error) => console.error(error));
    }
  };

  if (!environment) return <div>Loading</div>;

  return (
    <div className="note-manager-wrapper">
      {showConfirmAction && (
        <ConfirmAction
          question="Are you sure you want to delete?"
          getConfirmation={(answer: boolean) => confirmAndDelete(answer)}
        />
      )}
      <div className="note-manager-wrapper-btn-container">
        {isNew ? (
          <Button
            label={"X"}
            btnStyle={BUTTON_STYLE.ALERT}
            handleClick={() => {
              closeForm(true);
            }}
          />
        ) : (
          <Button
            label={<TbHttpDelete />}
            btnStyle={BUTTON_STYLE.ALERT}
            handleClick={() => {
              setShowConfirmAction(true);
            }}
          />
        )}
      </div>
      <form className="note-manager-form" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          required={true}
          value={title}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          name="content"
          value={content}
          placeholder="Write your note here..."
          required={true}
          onChange={(e) => setContent(e.target.value)}
        />

        {note ? (
          <TagSelect isEnabled={true} initialValue={note.tag} />
        ) : (
          <TagSelect isEnabled={true} />
        )}
        <input
          type="hidden"
          name={"noteCollectionId"}
          value={environment.noteCollection.id}
        />
        <input type="hidden" name={"environmentId"} value={environment.id} />
        <Button label={"save"} btnStyle={BUTTON_STYLE.ENCOURAGE} />
      </form>
    </div>
  );
};

interface NoteEditorProps {
  note?: GetNote;
  isNew: boolean;
  closeForm?: (isCompleted: boolean) => void;
}
