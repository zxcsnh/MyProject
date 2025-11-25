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
} from "@mui/icons-material";
import TopCard from "./topCard";
import { Theme } from "@mui/material/styles";
import theme from "@/theme/theme";

function ShowCard() {
  return (
    <Paper
      sx={{
        minWidth: 200,
        p: 2,
        flex: 1,
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
        这是一段测试用的介绍文字，这是一段测试用的介绍文字，这是一段测试用的介绍文字，这是一段测试用的介绍文字，
      </Typography>
    </Paper>
  );
}

export default function ToolCard() {
  return (
    <Paper sx={{ maxWidth: 1200, p: 4 }}>
      <Stack direction="column" spacing={2}>
        <Box>
          <Typography variant="h5">
            <Lightbulb></Lightbulb>小工具
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <ShowCard></ShowCard>
          <ShowCard></ShowCard>
          <ShowCard></ShowCard>
        </Box>
      </Stack>
    </Paper>
  );
}
