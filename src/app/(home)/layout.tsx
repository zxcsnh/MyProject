"use client";

import "./layout.css"
import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";


function HomeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  // 常数
  const LEFT_MIN_WIDTH = 200;
  const LEFT_MIN_MIN_WIDTH = 50;

  const [leftWidth, setLeftWidth] = useState(LEFT_MIN_WIDTH);
  const [isLeftMin, setIsLeftMin] = useState(false);
  const [isLeftClose, setIsLeftClose] = useState(false);
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const handleMouseDown = () => {
    setIsMouseDown(true);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "ew-resize";
  }

  const handleMouseUp = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "default";
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMouseDown) {
      const clientX = e.clientX;
      if (!isLeftMin && clientX <= LEFT_MIN_MIN_WIDTH) {
        handleSetLeftMin();
      }
      else if (isLeftMin && clientX >= LEFT_MIN_WIDTH) {
        handleSetLeftMin();
      }
      else {
        setLeftWidth(clientX);
      }
    }
  };

  const handleSetLeftMin = () => {
    setIsLeftMin(!isLeftMin);
  }

  return (
    <div
      className="container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        style={{
          '--left-width': isLeftMin ? LEFT_MIN_MIN_WIDTH : leftWidth + 'px',
          "--left-min-width": LEFT_MIN_WIDTH + "px",
          "--left-min-min-width": LEFT_MIN_MIN_WIDTH + "px",
        } as React.CSSProperties
        }
        className={`
          left
          ${isLeftMin ? "left-min" : ""} 
          ${isLeftClose ? "left-close" : ""} 
          ${isLeftOpen ? "" : "left-open"} 
        `}
      >
        <div
          className="sider"
          onMouseDown={handleMouseDown}
        />

        {
          !isLeftMin?
          <MenuFoldOutlined className="icon-left-min" onClick={handleSetLeftMin} title="123"/>
          :
          <MenuUnfoldOutlined className="icon-left-min" onClick={handleSetLeftMin} />
        }
      </div>
      <div
        className="right"
      >
        <button className="button-left-close" onClick={() => { setIsLeftClose(!isLeftClose); }}>
          按钮
        </button>
        <button className="button-left-open" onClick={() => { setIsLeftOpen(!isLeftOpen); }}>
          按钮
        </button>
      </div>
      {/* {children} */}
    </div>
  );
}


export default HomeLayout;