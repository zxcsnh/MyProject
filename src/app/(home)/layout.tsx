"use client";
import "./layout.css"
import { useState } from "react";
import SideBar, { Top, Content, Bottom } from "@/component/SideBar";
import { Switch } from "antd";

function HomeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  // 常数
  const SIDEBAR_MIN_WIDTH = 200;
  const SIDEBAR_MAX_WIDTH = 1000;
  const [isSideBarHidden, setSideBarHidden] = useState(false);
  const [sideBarType, setSideBarType] = useState("fixed");
  const [isSideBarHiddenAuto, setSideBarHiddenAuto] = useState(false);
  const [isSideBarOverplay, setSideBarOverplay] = useState(false);
  return (
    <div
      className="container"
    >
      <div className="left">
        <SideBar 
        sidebarType={sideBarType}
        sidebarHiddenAuto={isSideBarHiddenAuto}
        isOverPlay={isSideBarOverplay}
        isSideBarHidden={isSideBarHidden}
        setSideBarHidden={setSideBarHidden}
        SIDEBAR_MIN_WIDTH={SIDEBAR_MIN_WIDTH}
        SIDEBAR_MAX_WIDTH={SIDEBAR_MAX_WIDTH}
        >
          <Top>
            <div className="title">
              这是标题
            </div>
          </Top>
          <Content>Content <div style={{ "height": "2000px" }}>2222</div></Content>
          <Bottom>Bottom</Bottom>
        </SideBar>
      </div>

      <div
        className="right"
      >
        <>测试内容</>
        <div className="switch">
          <button onClick={()=>{setSideBarHidden(false)}}>开启侧边栏</button>
          <button onClick={()=>{setSideBarHidden(true)}}>关闭侧边栏</button>
          <button onClick={()=>{setSideBarType("fixed");}}>固定模式</button>
          <button onClick={()=>{setSideBarType("float");}}>悬浮模式</button>
          <button onClick={()=>{setSideBarHiddenAuto(!isSideBarHiddenAuto);}}>自动隐藏</button>
          <button onClick={()=>{setSideBarOverplay(!isSideBarOverplay)}}>黑幕</button>
        </div>
      </div>
      {/* {children} */}
    </div>
  );
}


export default HomeLayout;