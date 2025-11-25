"use client";

import {
  Box,
  Paper,
  Card,
  CardHeader,
  CardContent,
  useTheme,
  autocompleteClasses,
  Avatar,
  Divider,
  ButtonGroup,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { alpha } from "@mui/material/styles";
import {
  FavoriteBorder,
  Height,
  KeyboardArrowDown,
  Translate,
  Lightbulb,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material";
import TopCard from "./topCard";
import ToolCard from "./toolCard";
import TypeWriter from "./typeWriter";
import { Theme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

function BackgroundBox({ children }: { children: ReactNode }) {
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
        width: "100%",
        boxSizing: "border-box",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
}
const upAndDown = keyframes`
  0%, 100% { 
    transform: translate(0,-25%); 
  }
  50% { 
    transform: translate(0, 0); 
  }
`;

export default function Home() {
  return (
    <BackgroundBox>
      {/* 浮动菜单栏 */}
      <TopCard />
      {/* first View */}
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <TypeWriter />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            animation: `${upAndDown} 1.5s ease-in-out infinite`,
            color:"primary.main"
          }}
          fontSize={48}
        >
          <KeyboardDoubleArrowDown fontSize="inherit"/>
        </Box>
      </Box>
      <Box
        sx={{
          px: {
            xs: 1,
            sm: 4,
            md: 8,
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          //
          height: "100vh",
        }}
      >
        <ToolCard />
      </Box>
    </BackgroundBox>
  );
}
