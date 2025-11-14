"use client";
import "./layout.css";
import { useState } from "react";
import SideBar, { Top, Content, Bottom, Popup } from "@/component/SideBar";
import List from "@/component/List";
import { IconButton, Tooltip, Box, Paper, Switch, FormControlLabel } from "@mui/material";
import { Settings, KeyboardArrowLeft } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // 常数
  const SIDEBAR_MIN_WIDTH = 200;
  const SIDEBAR_MAX_WIDTH = 1000;
  const [isSideBarHidden, setSideBarHidden] = useState(false);
  const [sideBarType, setSideBarType] = useState("fixed");
  const [isSideBarHiddenAuto, setSideBarHiddenAuto] = useState(false);
  const [isSideBarOverplay, setSideBarOverplay] = useState(false);
  const [allUnFold, setAllUnFold] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("home");
  const [settingsShow, setSettingsShow] = useState(false);
  const list = [
    {
      text: "list-1",
      url: "home",
    },
    {
      text: "list-2",
      url: "",
      item: [
        {
          text: "list-2-1",
          url: "",
        },
        {
          text: "list-2-2",
          url: "",
          item: [
            {
              text: "list-2-2-1",
              url: "",
            },
          ],
        },
      ],
    },
  ];
  const handleSettingsOnClick = () => {
    if (settingsShow) {
      return;
    }
    setSettingsShow(true);
  };
  const handleSwitchSideBarType = () => {
    if (sideBarType === "fixed") {
      setSideBarType("float");
    }
    if (sideBarType === "float") {
      setSideBarType("fixed");
    }
  };
  return (
    <div className="container">
      <div className="left">
        <SideBar
          sidebarType={sideBarType}
          sidebarHiddenAuto={isSideBarHiddenAuto}
          isOverPlay={isSideBarOverplay}
          isSideBarHidden={isSideBarHidden}
          setSideBarHidden={setSideBarHidden}
          SIDEBAR_MIN_WIDTH={SIDEBAR_MIN_WIDTH}
          SIDEBAR_MAX_WIDTH={SIDEBAR_MAX_WIDTH}
          popupShow={settingsShow}
          setPopupShow={setSettingsShow}
        >
          <Popup>
            <Paper>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={sideBarType === "fixed"}
                      onChange={handleSwitchSideBarType}
                    />
                  }
                  label="固定模式"
                  labelPlacement="start" // start / top / bottom / end
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={sideBarType === "float"}
                      onChange={handleSwitchSideBarType}
                    />
                  }
                  label="悬浮模式"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Switch
                      disabled={sideBarType === "fixed"}
                      checked={isSideBarHiddenAuto}
                      onChange={() => {
                        setSideBarHiddenAuto(!isSideBarHiddenAuto);
                      }}
                    />
                  }
                  label="自动隐藏"
                  labelPlacement="start"
                />

                <FormControlLabel
                  control={
                    <Switch
                      disabled={sideBarType === "fixed"}
                      checked={isSideBarOverplay}
                      onChange={() => {
                        setSideBarOverplay(!isSideBarOverplay);
                      }}
                    />
                  }
                  label="黑幕"
                  labelPlacement="start"
                />
              </Box>
            </Paper>
          </Popup>
          <Top>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="title">这是标题</div>
              <Tooltip title="关闭侧边栏" arrow>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setSideBarHidden(true);
                  }}
                  size="medium"
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </Tooltip>
            </Paper>
          </Top>
          <Content>
            <Paper>
              <List list={list} allUnFold={allUnFold} selectedUrl={selectedUrl}></List>
            </Paper>
          </Content>
          <Bottom>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Tooltip title="设置" arrow>
                <IconButton size="medium" onPointerUp={handleSettingsOnClick}>
                  <Settings />
                </IconButton>
              </Tooltip>
            </Paper>
          </Bottom>
        </SideBar>
      </div>

      <div className="right">
        <>测试内容</>
        <div className="switch">
          <button
            onClick={() => {
              setSideBarHidden(false);
            }}
          >
            开启侧边栏
          </button>
          <button
            onClick={() => {
              setSideBarHidden(true);
            }}
          >
            关闭侧边栏
          </button>
          <button
            onClick={() => {
              setSideBarType("fixed");
            }}
          >
            固定模式
          </button>
          <button
            onClick={() => {
              setSideBarType("float");
            }}
          >
            悬浮模式
          </button>
          <button
            onClick={() => {
              setSideBarHiddenAuto(!isSideBarHiddenAuto);
            }}
          >
            自动隐藏
          </button>
          <button
            onClick={() => {
              setSideBarOverplay(!isSideBarOverplay);
            }}
          >
            黑幕
          </button>
          <button
            onClick={() => {
              setAllUnFold(!allUnFold);
              console.log(allUnFold, "push");
            }}
          >
            展开全部
          </button>
        </div>
      </div>
      {/* {children} */}
    </div>
  );
}

export default HomeLayout;
