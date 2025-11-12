"use client";
import "./layout.css"
import { useState } from "react";
import SideBar, { Top, Content, Bottom } from "@/component/SideBar";
import List from "@/component/List";
import { IconButton, Tooltip } from "@mui/material"
import { Settings, KeyboardArrowLeft } from "@mui/icons-material"

function HomeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  // 常数
  const SIDEBAR_MIN_WIDTH = 200;
  const SIDEBAR_MAX_WIDTH = 1000;
  const [isSideBarHidden, setSideBarHidden] = useState(false);
  const [sideBarType, setSideBarType] = useState("fixed");
  const [isSideBarHiddenAuto, setSideBarHiddenAuto] = useState(false);
  const [isSideBarOverplay, setSideBarOverplay] = useState(false);
  const [allUnFold, setAllUnFold] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("home");
  const [settingsOpen,setSettingsOpen] = useState(false);
  const list = [
    {
      "text": "list-1",
      "url": "home"
    },
    {
      "text": "list-2",
      "url": "",
      "item": [
        {
          "text": "list-2-1",
          "url": ""
        },
        {
          "text": "list-2-2",
          "url": "",
          "item": [
            {
              "text": "list-2-2-1",
              "url": ""
            },
          ]
        },
      ]
    },
  ];
  const handleSettingsOnClick = ()=>{
    setSettingsOpen(!settingsOpen);
  }
  // 向子组件传递ref使用ref获得sidebar的位置信息
  // settings使用fixed定位
  return (
    <div
      className="container"
    >
      <div className="left">
        
        <div className="settings" style={settingsOpen?{}:{"display":"none"}}>settings</div>
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
            <Tooltip title="关闭侧边栏" arrow>
              <IconButton
                color="primary"
                onClick={() => { setSideBarHidden(true) }}
                size="medium"
              >
                <KeyboardArrowLeft />
              </IconButton>
            </Tooltip>

          </Top>
          <Content>
            Content
            <List list={list} allUnFold={allUnFold} selectedUrl={selectedUrl}></List>
          </Content>
          <Bottom>
            <Tooltip title="设置" arrow>
              <IconButton
                size="medium"
                onClick={handleSettingsOnClick}
              >
                <Settings />
              </IconButton>
            </Tooltip>
          </Bottom>
        </SideBar>
      </div>

      <div
        className="right"
      >
        <>测试内容</>
        <div className="switch">
          <button onClick={() => { setSideBarHidden(false) }}>开启侧边栏</button>
          <button onClick={() => { setSideBarHidden(true) }}>关闭侧边栏</button>
          <button onClick={() => { setSideBarType("fixed"); }}>固定模式</button>
          <button onClick={() => { setSideBarType("float"); }}>悬浮模式</button>
          <button onClick={() => { setSideBarHiddenAuto(!isSideBarHiddenAuto); }}>自动隐藏</button>
          <button onClick={() => { setSideBarOverplay(!isSideBarOverplay) }}>黑幕</button>
          <button onClick={() => { setAllUnFold(!allUnFold); console.log(allUnFold, "push") }}>展开全部</button>
        </div>
      </div>
      {/* {children} */}
    </div>
  );
}


export default HomeLayout;