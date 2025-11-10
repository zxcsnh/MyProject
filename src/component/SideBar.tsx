"use client";
import "./SideBar.css"
import React, { useState, useRef } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";

const Top = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>{children}</>
  );
}
const Content = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>{children}</>
  );
}
const Bottom = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>{children}</>
  );
}
export { Top, Content, Bottom };

function SideBar({
  children,
  sidebarType = "悬浮",
  sidebarHiddenAuto = true
}: {
  children?: React.ReactNode,
  sidebarType?: string,
  sidebarHiddenAuto?: boolean
}) {
  const SIDEBAR_MIN_WIDTH = 200;
  const SIDEBAR_MAX_WIDTH = 1000;
  const [isSideBarHidden, setSideBarHidden] = useState(sidebarHiddenAuto?true:false);
  const [isHeiMo, setHeiMo] = useState(true);
  const [sideBarWidth, setSideBarWidth] = useState(SIDEBAR_MIN_WIDTH);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const handleMouseEnter = ()=>{
    setSideBarHidden(false);
  }
  const handleMouseLeave = ()=>{
    setSideBarHidden(true);
  }
  const handleMouseDown = () => {
    if (isDraggingRef.current) return;
    isDraggingRef.current = true;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "ew-resize";

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        document.body.style.userSelect = "auto";
        document.body.style.cursor = "default";
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    }

    const handleMouseMove = (ev: MouseEvent) => {
      if (isDraggingRef.current) {
        const sidebar = sidebarRef.current;
        if (!sidebar) return;
        const rect = sidebar.getBoundingClientRect();
        const newWidth = Math.max(SIDEBAR_MIN_WIDTH, Math.min(ev.clientX - rect.left, SIDEBAR_MAX_WIDTH));
        setSideBarWidth(newWidth);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  let topNode: React.ReactNode = null;
  let contentNode: React.ReactNode = null;
  let bottomNode: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === Top) topNode = child;
    else if (child.type === Content) contentNode = child;
    else if (child.type === Bottom) bottomNode = child;
  });
  return (
    <>
      {sidebarType === "悬浮" && sidebarHiddenAuto && <div
        className="sidebar-trigger"
        style={{
          '--sidebar-width': sideBarWidth + 'px',
        } as React.CSSProperties}
        onMouseEnter={handleMouseEnter}
        
        />}
      {sidebarType === "悬浮" && isHeiMo && !isSideBarHidden && <div className="overplay"/>}
      <div
      onMouseLeave={handleMouseLeave}
        ref={sidebarRef}
        className={`
            sidebar
            ${sidebarType === "悬浮" ? "sidebar-xuanfu" : ""}
            ${sidebarType === "固定" ? "sidebar-guding" : ""}
            ${isSideBarHidden ? "sidebar-close" : "sidebar-open"}
            `}
        style={{
          '--sidebar-width': sideBarWidth + 'px',
          "--sidebar-min-width": SIDEBAR_MIN_WIDTH + "px",
        } as React.CSSProperties
        }
      >
        <div className="overlay" />
        <div
          className="sider"
          onMouseDown={handleMouseDown}
        />
        <div className="sidebar-container">
          {
            topNode !== null &&
            (<div className="sidebar-top">
              {topNode}
            </div>)
          }
          {
            contentNode !== null &&
            (<div className="sidebar-content">
              {contentNode}
            </div>)
          }
          {
            bottomNode !== null &&
            (<div className="sidebar-bottom">
              {bottomNode}
            </div>)
          }
        </div>
      </div>
    </>

  );
}

export default SideBar;