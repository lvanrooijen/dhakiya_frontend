import { ToolBar } from "../../components/toolbar/ToolBar";
import { useStyle } from "../../context/ThemeContext";
import "./basicPage.css";

export const BasicPage: React.FC<PageProps> = ({ children }) => {
  const { theme } = useStyle();

  return (
    <div className={"page-layout"}>
      <ToolBar />
      <div className={"page-content-box"}>{children}</div>
    </div>
  );
};

/* interfaces */
interface PageProps {
  children: React.ReactNode;
}
