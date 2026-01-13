"use client";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { keyframes } from "@emotion/react";
import { alpha } from "@mui/material/styles";
// 定义 CSS 闪烁动画
const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

// 光标的样式
const cursorStyles = {
  // display: "inline-block",
  position:"absolute",
  right:0,
  width: "16px",
  height: "1.6em", // 高度与字体大小匹配,
  transform: "translate(200%,-10%)",
  backgroundColor: "primary.light", // 使用主题文本颜色
  marginLeft: "16px",

  // 动画：应用闪烁效果
  animation: `${blink} 1s step-end infinite`,
};

export default function TypeWriter() {
  const str = "Life is Fantastic";
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
        // variant="h2"
        // component="span"
        // sx={{
        //   position:"relative",
        //   fontStyle: "italic",
        //   fontWeight: "bold",
        //   textShadow: (theme) =>
        //     `4px 4px 6px ${alpha(theme.palette.secondary.light, 0.4)}`,
        //   background: (theme) =>
        //     `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`,
        //   WebkitBackgroundClip: "text", // 将背景裁剪到文本形状
        //   color: "transparent",
        // }}
      >
        {text}
        <Box component="span" sx={cursorStyles} />
      </Typography>
    </Box>
  );
}
