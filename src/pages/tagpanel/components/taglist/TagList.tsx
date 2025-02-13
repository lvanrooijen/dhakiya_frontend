import type { GetTag } from "src/types/api";
import { TagItem } from "../tag/TagItem";
import "./TagList.css";

export const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <ul className="tag-list-wrapper">
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </ul>
  );
};

interface TagListProps {
  tags: GetTag[];
}
