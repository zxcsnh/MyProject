"use client";

import {
  Box,
  Paper,
  Card,
  useTheme,
  autocompleteClasses,
  Avatar,
  Divider,
  ButtonGroup,
  Button,
  Stack,
} from "@mui/material";
import { ReactNode } from "react";
import { alpha } from "@mui/material/styles";
import {
  FavoriteBorder,
  Height,
  KeyboardArrowDown,
  Translate,
} from "@mui/icons-material";
import TopCard from "./topCard";

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
function ShowCard() {
  return (
    <Paper
      sx={{
        height: "150px",
        width: "600px",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: (theme)=>`
            0 8px 16px ${theme.palette.primary.light} /* 主题色发光效果 */
          `,
        },
      }}
    >
      1111
    </Paper>
  );
}
export default function Home() {
  return (
    <BackgroundBox>
      <TopCard />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Paper sx={{ height: "200px", width: "800px", p: 4 }}>
          {" "}
          <Stack
            direction="row" // 设置为水平排列 (row)
            spacing={2} // 控制子元素之间的间隔 (theme.spacing(2))
            alignItems="center"
            justifyContent="center"
          >
            <ShowCard></ShowCard>
            <ShowCard></ShowCard>
            <ShowCard></ShowCard>
          </Stack>
        </Paper>
      </Box>
    </BackgroundBox>
  );
}
