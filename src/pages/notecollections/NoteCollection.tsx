import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, BUTTON_STYLE } from "src/components/button/Button";
import { HeaderBar } from "src/components/headerbar/HeaderBar";
import { useEnvironment } from "src/context/EnvironmentContext";
import "./NoteCollection.css";
import { NoteManager } from "./notemanager/NoteManager";

const NoteCollection = () => {
  const { environment } = useEnvironment();
  const { id } = useParams();

  const [showCreateNoteForm, setShowCreateNoteForm] = useState<boolean>(false);

  if (environment)
    return (
      <div className="note-collection-wrapper">
        {showCreateNoteForm && (
          <div className="note-collection-note-form-backdrop">
            <NoteManager
              isNew={true}
              closeForm={(isCompleted) => {
                setShowCreateNoteForm(!isCompleted);
              }}
            />
          </div>
        )}
        {/* TODO FILTER & SORT */}
        <HeaderBar
          label={`NoteCollection`}
          option1={"sort by"}
          option2={"filter by"}
          option3={
            <Button
              label={"+ new"}
              btnStyle={BUTTON_STYLE.ENCOURAGE}
              handleClick={() => {
                setShowCreateNoteForm(true);
              }}
            />
          }
        />
        <ul>
          {environment.noteCollection?.notes.map((note) => (
            <NoteManager isNew={false} key={note.id} note={note} />
          ))}
        </ul>
      </div>
    );
};

export default NoteCollection;
