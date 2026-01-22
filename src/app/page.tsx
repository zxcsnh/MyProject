"use client";

import { Box, useTheme } from "@mui/material";
import { ReactNode, useRef, forwardRef } from "react";
import { alpha } from "@mui/material/styles";

import TopCard from "./topCard";
import ToolCard from "./toolCard";
import ApplicationsCard from "./applicationsCard";
import FirstView from "./firstView";
import SearchInputBox from "./inputSearchCard";
import TimeBox from "./timeBox";
import HeaderBox from "./headerBox";
import BottomBox from "./bottomBox";

function BackgroundBox({ children }: { children?: React.ReactNode }) {
  const theme = useTheme();
  const dotColor = alpha(theme.palette.text.disabled, 0.03); // 背景点的颜色
  const dotRadius = 4; // 背景点的半径
  const spacing = 64; // 背景svg的布局大小

  const rawSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${spacing}" height="${spacing}" viewBox="0 0 ${spacing} ${spacing}">
    <circle cx="${spacing / 2}" cy="${spacing / 2}" r="${dotRadius}" fill="${dotColor}" />
    </svg>`;

  const svg = `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;

  return (
    <Box
      sx={{
        backgroundImage: `url("${svg}")`,
        backgroundColor: theme.palette.background.default,
        backgroundSize: `${spacing}px ${spacing}px`,
        backgroundRepeat: "repeat",
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        // overflowY: "auto",
        overflow: "hidden",
        position: "absolute",
        zIndex: -1,
      }}
    >
      {children}
    </Box>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    // 视口
    <Box
      ref={containerRef}
      sx={{ position: "relative", height: "100vh", overflow: "auto" }}
    >
      {/* 用于撑起内容，background的长度相对于此 */}
      <Box sx={{ position: "relative", minHeight: "100%" }}>
        {/* <FirstView></FirstView> */}
        <BackgroundBox />
        <HeaderBox containerRef={containerRef}></HeaderBox>
        
        <Box
          sx={{
            overflowY: "auto",
            px: {
              xs: 1,
              sm: 4,
              md: 16,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //
            minHeight: "100vh",
            boxSizing: "border-box",
            // gap: 8,
          }}
        >
          {/* <TimeCard /> */}
          <SearchInputBox />
          <ToolCard />
          <Box sx={{ height: "1000px" }}>123</Box>
        </Box>
        <BottomBox></BottomBox>
      </Box>
    </Box>
  );
}
