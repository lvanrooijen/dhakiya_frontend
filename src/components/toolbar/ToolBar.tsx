import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { LuNotebook } from "react-icons/lu";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { ThemeSwitch } from "./components/themeswitch/ThemeSwitch";
import { ToolBarLink } from "./components/toolbarlink/ToolBarLink";
import "./ToolBar.css";

export const ToolBar = () => {
  const location = useLocation();
  const [path, setPath] = useState<string>("");
  useEffect(() => {
    if (location.pathname.includes("/environment/")) {
      setPath(location.pathname.substring(0, 14));
    }
    console.log("path: ", location.pathname);
  }, [location]);
  return (
    <nav className={`tool-bar-wrapper`}>
      <ul className={`tool-bar`}>
        <ThemeSwitch />
        <ToolBarLink path="/" label={<FaHome />} />
        {location.pathname.includes("environment") && (
          <>
            <ToolBarLink path={path} label={<MdOutlineCollectionsBookmark />} />
            <ToolBarLink
              path={path + "/note-collection"}
              label={<LuNotebook />}
            />
          </>
        )}
      </ul>
    </nav>
  );
};
