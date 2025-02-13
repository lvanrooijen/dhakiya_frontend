import React from "react";
import "./sidebarLayout.css";

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  leftContent,
  rightContent,
}) => {
  return (
    <div className={"sidebar-layout-wrapper"}>
      <div className="left-panel">{leftContent}</div>
      <div className={"right-panel"}>{rightContent}</div>
    </div>
  );
};

/* interfaces */
interface SidebarLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}
