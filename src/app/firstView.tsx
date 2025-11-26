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
import { ReactNode, useState, useEffect, useRef, useCallback } from "react";
import { alpha } from "@mui/material/styles";
import {
  FavoriteBorder,
  Height,
  KeyboardArrowDown,
  Translate,
  Lightbulb,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material";
import TypeWriter from "./typeWriter";
import { keyframes } from "@emotion/react";
const upAndDown = keyframes`
  0%, 100% { 
    transform: translate(0,-25%); 
  }
  50% { 
    transform: translate(0, 0); 
  }
`;

function FirstView() {
  const [isShow, setShow] = useState(true);
  const [scroll, setScroll] = useState(0);
  const [pointerDown, setPointerDown] = useState(false);
  const [isTransfrom, setTransfrom] = useState(false);
  const dragStartRef = useRef(0);
  const viewRef = useRef<HTMLElement | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const scrollDelta = useRef<number>(0);

  const execScroll = (time: number, height: number) => {
    if (time <= 0) return;

    const start = window.pageYOffset;
    const change = height;
    const duration = time;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 使用缓动函数
      const easeProgress =
        progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, start + change * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const SCROLL_END_DELAY = 100; // 毫秒，可以根据需要调整
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isTransfrom) {
      setTransfrom(true);
    }
    // 清除之前的计时器
    if (scrollTimerRef.current !== null) {
      clearTimeout(scrollTimerRef.current);
    }

    // 滚动逻辑
    scrollDelta.current += e.deltaY;
    setScroll(scrollDelta.current);
    if (!viewRef.current) return;
    const height = viewRef.current.scrollHeight;
    if (scrollDelta.current > height / 2) {
      setTransfrom(false);
      setScroll(height);
      scrollDelta.current = 0;
      return;
    }
    // 滚动结束
    const timerId = window.setTimeout(() => {
      scrollTimerRef.current = null;
      if (!viewRef.current) return;
      const height = viewRef.current.scrollHeight;
      if (scrollDelta.current < height / 2) {
        setTransfrom(false);
        setScroll(0);
      }
      scrollDelta.current = 0;
    }, SCROLL_END_DELAY);

    scrollTimerRef.current = timerId;
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerDown) return;
    setPointerDown(true);
    if (!isTransfrom) {
      setTransfrom(true);
    }
    dragStartRef.current = e.clientY;
  };
  const handlePointerUp = () => {
    if (!pointerDown) return;
    setPointerDown(false);
    setTransfrom(false);
    setScroll(0);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDown) return;
    const start = dragStartRef.current;
    const current = e.clientY;
    if (current > start) return;
    if (!viewRef.current) return;
    const height = viewRef.current.scrollHeight;
    const distance = start - current;
    if (distance > height / 2) {
      console.log(height);
      setPointerDown(false);
      setTransfrom(false);
      setScroll(height);
      return;
    }
    setScroll(distance);
  };
  return (
    <Box
      component="div"
      ref={viewRef}
      sx={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        bgcolor: "background.default",
        transform: `translateY(-${scroll}px)`,
        transition: isTransfrom
          ? "none"
          : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onWheel={handleWheel}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box sx={{ zIndex: 101 }}>
          <TypeWriter />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            animation: `${upAndDown} 1.5s ease-in-out infinite`,
            color: "primary.main",
          }}
          fontSize={48}
        >
          <KeyboardDoubleArrowDown fontSize="inherit" />
        </Box>
        <Box
          onClick={() => {
            // setScroll(100);
            // execScroll(500, 800);
          }}
          sx={{
            width: "100%",
            height: "50%",
            bottom: 0,
            position: "absolute",
            zIndex: 100,
            "&:hover": {
              cursor: "pointer",
            },
          }}
        ></Box>
      </Box>
    </Box>
  );
}
export default FirstView;
