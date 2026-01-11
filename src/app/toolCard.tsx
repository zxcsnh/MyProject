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
import IconTextItem from "@/component/IconTextItem";

function ShowItem({ width }: { width?: number }) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: width ? width : "50px",
      }}
    >
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: "12px",
          overflow: "hidden",
          transition: "boxShadow 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: (theme) => `
            0 0px 16px ${theme.palette.text.secondary} /* 主题色发光效果 */
          `,
          },
        }}
      >
        <img
          src="/file.svg"
          alt="描述"
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            display: "block", // 解决底部间隙
          }}
        />
      </Box>

      <Typography variant="caption" color="textPrimary">
        这是标题
      </Typography>
    </Box>
  );
}
export default function ToolCard() {
  const itemMinWidth = 48;
  const gridGap = 20;
  const gridMaxColumn = 12;
  const gridContainerMinWidth = (itemMinWidth + gridGap) * gridMaxColumn - gridGap;
  return (
    <Box
      sx={{
        width: "100%",
        containerType: "inline-size",
        marginTop: "48px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          width: "100%",
          gap: `${gridGap}px`,
          // 宽度小于gridContainerMinWidth时，每个子组件固定宽度为itemMinWidth
          gridTemplateColumns: `repeat(auto-fill, ${itemMinWidth}px)`,
          justifyContent: "center",
          gridAutoFlow: "row dense",
          // 使用方括号包裹模板字符串作为 Key
          [`@container (min-width: ${gridContainerMinWidth}px)`]: {
            // 宽度大于gridContainerMinWidth时，固定为gridMaxColumn列
            gridTemplateColumns: `repeat(${gridMaxColumn}, minmax(${itemMinWidth}px, 1fr))`,
          },
        }}
      >
        <Box sx={{ bgcolor: "green" }}>1</Box>
        <Box sx={{ bgcolor: "green" }}>2</Box>
        <Box sx={{ bgcolor: "green" }}>3</Box>
        <Box sx={{ bgcolor: "green" }}>4</Box>
        <Box sx={{ bgcolor: "green" }}>5</Box>
        <Box sx={{ bgcolor: "green" }}>6</Box>
        <Box sx={{ bgcolor: "green" }}>7</Box>
        <Box sx={{ bgcolor: "green" }}>8</Box>
        <Box sx={{ bgcolor: "green" }}>9</Box>
        <Box
          sx={{
            bgcolor: "green",
            gridColumn: "span 2", // 占 2 列
            gridRow: "span 1", //占 2 行
          }}
        >
          10
        </Box>
        <Box sx={{ bgcolor: "green" }}>11</Box>
        <Box sx={{ bgcolor: "green" }}>12</Box>
        <Box sx={{ bgcolor: "green" }}>13</Box>
        <Box sx={{ bgcolor: "green" }}>14</Box>
        <Box sx={{ bgcolor: "green" }}>15</Box>
        <Box sx={{ bgcolor: "green" }}>16</Box>
        <Box sx={{isolation: 'isolate',}}>
        <IconTextItem
          icon={
            <Box
              component="img"
              src="/bing.svg"
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          }
          label="bing"
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            boxShadow: 3,
            "&:hover": {
              boxShadow: 7,
            },
            // zIndex: "1"
          }}
          sxLabel={{
            position: "absolute",
            top: "100%",
          }}
        />
        </Box>

      </Box>
    </Box>
  );
}
