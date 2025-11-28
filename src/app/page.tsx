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
import ApplicationsCard from "./applicationsCard";
import FirstView from "./firstView";

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
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  );
}

export default function Home() {
  return (
    <Box>
      {/* first View */}
      <FirstView></FirstView>
      <BackgroundBox>
        {/* 浮动菜单栏 */}
        <TopCard />
        <Box
          sx={{
            pt: 16,
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
            gap: 8,
          }}
        >
          <ToolCard />
          <ApplicationsCard />
        </Box>
      </BackgroundBox>
    </Box>
  );
}
