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
import React, { ReactNode, useRef, useState, useCallback, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import {
  FavoriteBorder,
  Height,
  KeyboardArrowDown,
  Translate,
  Lightbulb,
} from "@mui/icons-material";
import TopCard from "./topCard";
import { Theme } from "@mui/material/styles";
import theme from "@/theme/theme";
import ObserverCardBox from "@/component/observerCardBox";

function ShowItem({ width }: { width?: number }) {
  return (
    <Paper
      sx={{
        boxSizing: "border-box",
        width: width ? width : "200px",
        p: 2,
        transition: "transform 0.3s ease",
        cursor: "pointer",
        backgroundColor: theme.palette.background.default,
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: (theme) => `
            0 8px 16px ${theme.palette.text.secondary} /* 主题色发光效果 */
          `,
        },
      }}
    >
      <Typography variant="h6" color="textPrimary">
        这是标题
      </Typography>
      <Typography variant="body1" color="textSecondary">
        这是一段测试用的介绍文字
      </Typography>
    </Paper>
  );
}

export default function ApplicationsCard() {
  const ITEMWIDTH = 200;
  const [itemWidth, setItemWidth] = useState(ITEMWIDTH);
  return (
    <Paper sx={{ width: "100%", p: 4, boxSizing: "border-box" }}>
      <Stack direction="column" spacing={2}>
        <Box>
          <Typography variant="h5">
            <Lightbulb />
            应用栏
          </Typography>
        </Box>
        <ObserverCardBox ITEMWIDTH={ITEMWIDTH} setWidth={setItemWidth}>
          <ShowItem width={itemWidth}></ShowItem>
          <ShowItem width={itemWidth}></ShowItem>
          <ShowItem width={itemWidth}></ShowItem>
          <ShowItem width={itemWidth}></ShowItem>
        </ObserverCardBox>
      </Stack>
    </Paper>
  );
}
