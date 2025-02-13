import "./ListItem.css";

export const ListItem: React.FC<ListItemProps> = ({
  title,
  option1,
  option2,
  option3,
  option4,
}) => {
  return (
    <li className="list-item-wrapper">
      <div className="list-item-title">{title}</div>
      <div className="list-item-option">{option1}</div>
      <div className="list-item-option">{option2}</div>
      <div className="list-item-option">{option3}</div>
      <div className="list-item-option">{option4}</div>
    </li>
  );
};

interface ListItemProps {
  title: string | React.ReactNode;
  option1?: string | React.ReactNode;
  option2?: string | React.ReactNode;
  option3?: string | React.ReactNode;
  option4?: string | React.ReactNode;
}
