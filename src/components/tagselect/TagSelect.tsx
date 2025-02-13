import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnvironment } from "src/context/EnvironmentContext";
import type { GetTag, GetTagBasic } from "src/types/api";
import "./TagSelect.css";

export const TagSelect: React.FC<TagSelectProps> = ({
  isEnabled,
  initialValue,
}) => {
  const navigate = useNavigate();
  const { environment } = useEnvironment();
  const [selectedTag, setSelectedTag] = useState<GetTagBasic>(null);

  useEffect(() => {
    setSelectedTag(initialValue);
  }, [initialValue]);

  const handleTagSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = e.target.value;
    if (selectedTag === "new-tag") {
      navigate(`/environment/${environment.id}/tag-panel`);
    } else {
      const newTag = environment.tags.find(
        (tag: GetTagBasic) => tag.id == Number(selectedTag)
      );
      setSelectedTag(newTag);
    }
  };
  if (environment?.tags == null) return <div>Loading...</div>;
  return (
    <>
      <div>
        <select
          className="tag-select"
          name="tagId"
          onChange={(e) => handleTagSelect(e)}
          value={selectedTag ? selectedTag.id : "default"}
          disabled={!isEnabled}
        >
          <option value="default" disabled>
            {selectedTag ? selectedTag.title : "Select a tag"}
          </option>
          {environment.tags.length != 0 ? (
            environment.tags.map((environmentTag: GetTag) => (
              <option key={environmentTag.id} value={environmentTag.id}>
                {environmentTag.title}
              </option>
            ))
          ) : (
            <option value={"new-tag"}>Create new Tag...</option>
          )}
        </select>
      </div>
    </>
  );
};

interface TagSelectProps {
  isEnabled: boolean;
  initialValue?: GetTagBasic | GetTag;
}
