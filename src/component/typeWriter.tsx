"use client";
import { Box, Typography, SxProps, Theme } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { keyframes } from "@emotion/react";
import { alpha } from "@mui/material/styles";
// 定义 CSS 闪烁动画
const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function TypeWriter({
  str = "Life is Fantastic",
  sx,
  cursorSx,
  left,
  right,
}: {
  str?: string;
  sx?: SxProps<Theme>;
  cursorSx?: SxProps<Theme>;
  left?: string;
  right?: string;
}) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const stopInterval = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const runCycle = React.useCallback(
    ({
      printInterval = 100,
      deleteInterval = 100,
    }: {
      printInterval?: number;
      deleteInterval?: number;
    }) => {
      stopInterval();
      const interval = isDeleting ? deleteInterval : printInterval;
      const id = setInterval(() => {
        setText((prevText) => {
          let currentIntervalId = intervalId.current;
          if (!isDeleting) {
            // 打印模式
            if (prevText.length < str.length) {
              return str.slice(0, prevText.length + 1);
            } else {
              if (currentIntervalId) {
                clearInterval(currentIntervalId);
              }
              intervalId.current = null;
              setTimeout(() => setIsDeleting(true), 1000);
              return prevText;
            }
          } else {
            // 删除模式
            if (prevText.length > 0) {
              return prevText.slice(0, prevText.length - 1);
            } else {
              if (currentIntervalId) {
                clearInterval(currentIntervalId);
              }
              intervalId.current = null;
              setTimeout(() => setIsDeleting(false), 500);
              return "";
            }
          }
        });
      }, interval);
      intervalId.current = id;
    },
    [isDeleting, stopInterval, str],
  );

  useEffect(() => {
    runCycle({ printInterval: 100, deleteInterval: 50 });
    return stopInterval;
  }, [runCycle, stopInterval]);

  return (
    <Box>
      <Typography
        noWrap
        sx={{
          position: "relative",
          fontStyle: "italic",
          fontWeight: "bold",
          minHeight: "1.2em",
          textShadow: (theme) =>
            `4px 4px 6px ${alpha(theme.palette.secondary.light, 0.4)}`,
          background: (theme) =>
            `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`,
          WebkitBackgroundClip: "text", // 将背景裁剪到文本形状
          color: "transparent",
          ...sx,
        }}
      >
        {left}
        {text}
        {right}
        <Box
          component="span"
          sx={{
            display: "inline-block", // 改为行内块
            width: "8px",
            height: "1.2em",
            backgroundColor: "primary.light",
            marginLeft: "4px", // 适当间距
            flexShrink: 0, // 防止光标被挤压
            animation: `${blink} 1s step-end infinite`,
            ...cursorSx,
          }}
        />
      </Typography>
    </Box>
  );
}
