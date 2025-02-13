import { useNavigate } from "react-router-dom";
import { GetEnvironment } from "../../types/api";
import "./List.css";

export const List: React.FC<ListProps> = ({ list, linkTo }) => {
  const navigate = useNavigate();
  if (!Array.isArray(list)) {
    return <div>Nothing to see here</div>;
  }
  return (
    <ul className={`overview-list-style`}>
      {list.map((list) => (
        <li
          className={`overview-list-item`}
          key={list.id}
          onClick={() => {
            navigate(`${linkTo}/${list.id}`);
          }}
        >
          {list.title}
        </li>
      ))}
    </ul>
  );
};

interface ListProps {
  list: GetEnvironment[];
  linkTo: string;
}
