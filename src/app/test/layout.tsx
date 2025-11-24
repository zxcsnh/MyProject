"use client";

import { useState } from "react";
import SideBar, { Top, Content, Bottom, Popup } from "@/component/SideBar";
import List from "@/component/List";
import { IconButton, Tooltip, Box, Paper, Switch, FormControlLabel } from "@mui/material";
import { Settings, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { SIDEBAR_NAV_LIST } from "../../config/navData";
function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // 常数
  const SIDEBAR_MIN_WIDTH = 200;
  const SIDEBAR_MAX_WIDTH = 1000;
  const [isSideBarHidden, setSideBarHidden] = useState(false);
  const [sideBarType, setSideBarType] = useState("fixed");
  const [isSideBarHiddenAuto, setSideBarHiddenAuto] = useState(false);
  const [isSideBarOverplay, setSideBarOverplay] = useState(false);
  const [allUnFold, setAllUnFold] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState("home2");
  const [settingsShow, setSettingsShow] = useState(false);
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
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box sx={{ flexShrink: 0, position: "relative" }}>
        <Box sx={{ backgroundColor: "background.paper" }}>
          {isSideBarHidden && (
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: 1,
                transform: "translatey(-50%)",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "primary.dark",
                  color: "primary.dark",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "25%",
                  maxWidth: "4px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition:
                    "max-width 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease",
                  "&:hover": {
                    maxWidth: "200px",
                    borderRadius: "50%",
                    backgroundColor: "primary.light",
                    color: "primary.main",
                  },
                }}
              >
                <IconButton
                  sx={{ color: "inherit" }}
                  onClick={() => {
                    setSideBarHidden(false);
                  }}
                >
                  <KeyboardArrowRight fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          )}
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
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
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
                    labelPlacement="start"
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
              <Paper sx={{ height: "100%" }}>
                <List
                  list={SIDEBAR_NAV_LIST}
                  allUnFold={allUnFold}
                  selectedUrl={selectedUrl}
                ></List>
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
        </Box>
      </Box>

      <Box sx={{flex:1}}>
        {children}
      </Box>
    </Box>
  );
}

export default HomeLayout;
