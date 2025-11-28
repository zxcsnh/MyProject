"use client";
import { Box, Typography } from "@mui/material";
import { ReactNode, useState, useRef, useCallback, useEffect } from "react";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import TypeWriter from "../component/typeWriter";
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
  const [scroll, setScroll] = useState(0);
  const [pointerDown, setPointerDown] = useState(false);
  const [isTransfrom, setTransfrom] = useState(false);
  const dragStartRef = useRef(0);
  const viewRef = useRef<HTMLElement | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const scrollDelta = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const closeFirstView = () => {
    if (!viewRef.current) return;
    const height = viewRef.current.scrollHeight;
    setScroll(height);
    document.body.style.overflow = "auto";
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    // 清除之前的计时器
    if (scrollTimerRef.current !== null) {
      clearTimeout(scrollTimerRef.current);
    }

    // 滚动逻辑
    scrollDelta.current += e.deltaY;

    // 滚动结束
    const timerId = window.setTimeout(() => {
      scrollTimerRef.current = null;
      if (!viewRef.current) return;
      const height = viewRef.current.scrollHeight;
      if (scrollDelta.current > height / 2) {
        closeFirstView();
      }
      scrollDelta.current = 0;
    }, 50); // 50ms

    scrollTimerRef.current = timerId;
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // 确保只处理第一次按下
    if (pointerDown) return;
    setPointerDown(true);
    setTransfrom(true);
    dragStartRef.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDown) return;

    const start = dragStartRef.current;
    const current = e.clientY;

    // 只允许向上拖动（current < start）
    if (current > start) return;

    const distance = start - current;

    // 使用 rAF 优化连续的 setScroll，减少不必要的重渲染
    if (animationFrameRef.current === null) {
      animationFrameRef.current = window.requestAnimationFrame(() => {
        setScroll(distance);
        animationFrameRef.current = null;
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDown) return;
    if (!viewRef.current) return;
    const height = viewRef.current.scrollHeight;
    const start = dragStartRef.current;
    const current = e.clientY;
    const distance = start - current;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (distance > height / 2) {
      setPointerDown(false);
      setTransfrom(false);
      closeFirstView();
      return;
    }
    setPointerDown(false);
    setTransfrom(false);
    setScroll(0);
  };
  return (
    <Box
      component="div"
      ref={viewRef}
      sx={{
        userSelect: "none",
        touchAction: "none",
        zIndex: 1200,
        position: "fixed",
        width: "100vw",
        height: "100vh",
        bgcolor: "background.default",
        transform: `translateY(-${scroll}px)`,
        transition: isTransfrom ? "none" : "transform 1s ease-in-out",
        overflowY: "hidden",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onWheel={handleWheel}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box sx={{ zIndex: 101, position: "absolute", top: "40%" }}>
          <TypeWriter />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            animation: `${upAndDown} 1.5s ease-in-out infinite`,
            color: "primary.main",
            fontSize: "4rem",
          }}
        >
          <KeyboardDoubleArrowDown fontSize="inherit" />
        </Box>
        <Box
          onClick={closeFirstView}
          sx={{
            width: "100%",
            height: "20%",
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
