"use client";
import "./SideBar.css"
import React, { useState, useRef } from "react";
import { setTimeout } from "timers";

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
// 下一步目标
// 1. 增加侧边栏收起展开关闭按钮，都由部件外部控制 √
// 2. 增加侧边栏最小宽度和最大宽度配置 √
// 3. 修改一些部件和变量的命名 √
// 4？. 增加侧边栏位置控制，左侧右侧
function SideBar({
  children,
  sidebarType = "fixed",
  sidebarHiddenAuto = true,
  isOverPlay = true,
  isSideBarHidden = false,
  setSideBarHidden,
  SIDEBAR_MIN_WIDTH = 200,
  SIDEBAR_MAX_WIDTH = 1000,
}: {
  children?: React.ReactNode,
  sidebarType?: string,
  sidebarHiddenAuto?: boolean,
  isOverPlay?: boolean,
  isSideBarHidden?: boolean,
  setSideBarHidden?: Function,
  SIDEBAR_MIN_WIDTH?: number,
  SIDEBAR_MAX_WIDTH?: number
}) {

  const [sideBarWidth, setSideBarWidth] = useState(SIDEBAR_MIN_WIDTH);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

  const handleMouseEnter = () => {
    if (!isSideBarHidden) return;
    if (!setSideBarHidden) return;
    setSideBarHidden(false);
    const handleMouseLeave = (ev: MouseEvent) => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      let isInside = true;
      if (ev.clientY < rect.top || ev.clientY > rect.bottom) isInside = false;
      if (ev.clientX < rect.left || ev.clientX > rect.right) isInside = false;
      if (isInside) return;
      setSideBarHidden(true);
      document.removeEventListener('pointerout', handleMouseLeave);
    }
    document.addEventListener('pointerout', handleMouseLeave);
  }

  const handelOverPlayMouseDown = () => {
    if (!setSideBarHidden) return;
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
      {sidebarType === "float" && sidebarHiddenAuto &&
        <div
          ref={triggerRef}
          className="sidebar-trigger"
          style={{
            '--sidebar-width': sideBarWidth + 'px',
          } as React.CSSProperties}
          onMouseEnter={handleMouseEnter}
        />}
      {sidebarType === "float" && isOverPlay && !isSideBarHidden &&
        <div className="overplay" onClick={handelOverPlayMouseDown} />}
      <div
        ref={sidebarRef}
        className={`
            sidebar
            ${sidebarType === "float" ? "sidebar-float" : ""}
            ${sidebarType === "fixed" ? "sidebar-fixed" : ""}
            ${isSideBarHidden ? "sidebar-close" : "sidebar-open"}
            `}
        style={{
          '--sidebar-width': sideBarWidth + 'px',
          "--sidebar-min-width": SIDEBAR_MIN_WIDTH + "px",
        } as React.CSSProperties
        }
      >
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