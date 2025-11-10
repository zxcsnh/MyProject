"use client";
import "./layout.css"
// import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";

import {
  Tooltip,
  Button
} from "antd";
import SideBar, { Top, Content, Bottom } from "@/component/SideBar";

function HomeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  // 常数
  const SIDEBAR_MIN_WIDTH = 200;
  const SIDEBAR_MAX_WIDTH = 1000;

  return (
    <div
      className="container"
    >
      <div className="left">
        <SideBar>
          <Top>
            <div className="title">
              这是标题
            </div>
            {/* <Tooltip placement="rightBottom" title={"关闭边栏"}> */}
            {/* <div className="icon-sidebar-min" onClick={() => { setIsSideBarClose(!isSideBarClose); }}>
              <MenuFoldOutlined style={{ "display": "block" }} />
            </div> */}
            {/* </Tooltip> */}
          </Top>
          <Content>Content <div style={{"height":"2000px"}}>2222</div></Content>
          <Bottom>Bottom</Bottom>
        </SideBar>
      </div>

      <div
        className="right"
      >
        {/* <button className="button-sidebar-close" onClick={() => { setIsSideBarClose(!isSideBarClose); }}>
          按钮
        </button>
        <button className="button-sidebar-open" onClick={() => { setIsSideBarOpen(!isSideBarOpen); }}>
          按钮
        </button> */}
      </div>
      {/* {children} */}
    </div>
  );
}


export default HomeLayout;