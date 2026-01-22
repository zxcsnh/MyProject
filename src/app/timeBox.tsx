"use client";
import { Box, Typography, SxProps, Theme } from "@mui/material";
import { Span } from "next/dist/trace";
import { useState, useEffect, ReactNode } from "react";

function TextSlideFade({ next }: { next: string }) {
  const [current, setCurrent] = useState(next); // 当前显示内容
  const [nextContent, setNextContent] = useState(next); // 待切换内容
  const [animating, setAnimating] = useState(false); // 是否在动画中
  const animationInterval = 300;
  const transitionAnimation = `transform ${animationInterval}ms ease, opacity ${animationInterval}ms ease`;
  // 当 next 变化时触发动画
  useEffect(() => {
    if (next === current) return; // 内容相同不动

    setNextContent(next);
    setAnimating(true);

    const timer = setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, animationInterval);

    return () => clearTimeout(timer);
  }, [next]);

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        // height: `${fontSize}px`,
        display: "inline-block",
        // fontSize: `${fontSize}px`,
        lineHeight: 1,
      }}
    >
      {/* 用于占据空间 */}
      <Box sx={{ opacity: 0 }}>{current}</Box>

      {/* 旧内容 */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: 0,
          transform: animating ? "translateY(100%)" : "translateY(0%)",
          opacity: animating ? 0 : 1,
          transition: animating ? transitionAnimation : "",
        }}
      >
        {current}
      </Box>

      {/* 新内容 */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: 0,
          transform: animating ? "translateY(0%)" : "translateY(-100%)",
          opacity: animating ? 1 : 0,
          transition: animating ? transitionAnimation : "",
        }}
      >
        {nextContent}
      </Box>
    </Box>
  );
}
function Colon() {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        // width: `${fontSize * 0.4}px`,
        // height: `${fontSize}px`,
        // fontSize: `${fontSize}px`,
        lineHeight: 1,
      }}
    >
      :
    </Box>
  );
}

export default function TimeBox({
  timeSx,
  subTimeSx,
  children
}: {
  timeSx?: SxProps<Theme>;
  subTimeSx?: SxProps<Theme>;
  children?:ReactNode
}) {
  // const [time, setTime] = useState<Date | null>(null);
  const [time, setTime] = useState(new Date("2026-01-01T00:00:00"));

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const split = (val: number) => [Math.floor(val / 10), val % 10];
  const getMonthDay = (time: Date) => `${time.getMonth() + 1}月${time.getDate()}日`;
  const getWeek = (time: Date) => {
    const weekMap = ["日", "一", "二", "三", "四", "五", "六"];
    return `星期${weekMap[time.getDay()]}`;
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          "@font-face": {
            fontFamily: "Monocraft Local",
            src: `url('/font/Monocraft-no-ligatures.ttf') format('truetype')`,
            fontWeight: "normal",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
          display: "inline-flex",
          alignItems: "center",
          fontSize: "1.5rem",
          ...timeSx,
        }}
      >
        {split(time.getHours()).map((d, i) => (
          <TextSlideFade key={`h-${i}`} next={String(d)} />
        ))}

        <Colon />

        {split(time.getMinutes()).map((d, i) => (
          <TextSlideFade key={`m-${i}`} next={String(d)} />
        ))}

        <Colon />

        {split(time.getSeconds()).map((d, i) => (
          <TextSlideFade key={`s-${i}`} next={String(d)} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.8em",
          ...subTimeSx,
        }}
      >
        <Box component="span">{getMonthDay(time)}</Box>
        <Box component="span">{getWeek(time)}</Box>
      </Box>
    </Box>
  );
}
