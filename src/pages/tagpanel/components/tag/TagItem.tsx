import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdSettingsBackupRestore } from "react-icons/md";
import { TbHttpDelete } from "react-icons/tb";
import { Button, BUTTON_STYLE } from "src/components/button/Button";
import { useEnvironment } from "src/context/EnvironmentContext";
import { AxiosClient } from "src/services/AxiosClient";
import type { GetTag } from "src/types/api";
import "./TagItem.css";

export const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  const { environment, updateEnvironment } = useEnvironment();
  const [title, setTitle] = useState<string>(tag.title);
  const [editMode, setEditMode] = useState<boolean>(false);

  const patchTag = (e: React.FormEvent) => {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData);
    console.log(formValues);
    AxiosClient.patch(`tags/${tag.id}`, formValues)
      .then(updateEnvironment)
      .catch((error) => console.error(error));
    setEditMode(false);
  };

  const deleteTag = () => {
    AxiosClient.delete(`tags/${tag.id}`)
      .then(updateEnvironment)
      .catch((error) => console.error(error));
  };

  const resetTag = () => {
    AxiosClient.patch(`tags/${tag.id}`, { reset: true })
      .then(updateEnvironment)
      .catch((error) => console.error(error));
  };

  return (
    <li className="tag-list-item-wrapper">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            patchTag(e);
          }}
        >
          {editMode ? (
            <input type="submit" value={"✓"} />
          ) : (
            <Button
              label={<CiEdit fontSize={21} />}
              btnStyle={BUTTON_STYLE.ENCOURAGE}
              handleClick={() => setEditMode(true)}
            />
          )}
          <input
            className={editMode ? "input-enabled" : "input-locked"}
            type="text"
            name={"title"}
            disabled={!editMode}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input type="hidden" value={environment.id} name={"environmentId"} />
        </form>
      </div>
      <div>Score: {tag.percentage}%</div>
      <div>Status: {String(tag.status).toLowerCase().replace("_", " ")}</div>
      <Button
        label={<MdSettingsBackupRestore fontSize={21} />}
        handleClick={resetTag}
      />
      <Button
        label={<TbHttpDelete fontSize={21} />}
        btnStyle={BUTTON_STYLE.ALERT}
        handleClick={deleteTag}
      />
    </li>
  );
};

interface TagItemProps {
  tag: GetTag;
}
