"use client";

import "./layout.css"
import { useEffect, useState, useRef } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";

import {
  Tooltip,
  Button
} from "antd";

function HomeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  // 常数
  const SIDEBAR_MIN_WIDTH = 200;
  const SIDEBAR_MAX_WIDTH = 1000;

  const [sideBarWidth, setSideBarWidth] = useState(SIDEBAR_MIN_WIDTH);
  const [isSideBarClose, setIsSideBarClose] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

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


  return (
    <div
      className="container"
    >
      <div className="left">
        <div
          ref={sidebarRef}
          className={`
          sidebar
          ${isSideBarClose ? "sidebar-close" : ""} 
          ${isSideBarOpen ? "" : "sidebar-open"} 
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
            <div className="sidebar-top">
              <div className="title">
                这是标题
              </div>
              {/* <Tooltip placement="rightBottom" title={"关闭边栏"}> */}
                <div className="icon-sidebar-min" onClick={() => { setIsSideBarClose(!isSideBarClose); }}>
                  <MenuFoldOutlined style={{ "display": "block" }} />
                </div>
              {/* </Tooltip> */}
            </div>
            <div className="sidebar-content">
              content
              {/* <div style={{"height":"10000px"}}>1111111</div> */}
            </div>
            <div className="sidebar-bottom">bottom</div>
          </div>
        </div>
      </div>

      <div
        className="right"
      >
        <button className="button-sidebar-close" onClick={() => { setIsSideBarClose(!isSideBarClose); }}>
          按钮
        </button>
        <button className="button-sidebar-open" onClick={() => { setIsSideBarOpen(!isSideBarOpen); }}>
          按钮
        </button>
      </div>
      {/* {children} */}
    </div>
  );
}


export default HomeLayout;