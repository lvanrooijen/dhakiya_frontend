import "./labelbar.css";

export const LabelBar: React.FC<LabelBarProps> = ({ label }) => {
  return <h2 className={`label-bar`}>{label}</h2>;
};

/* interface */
interface LabelBarProps {
  label: string;
}
