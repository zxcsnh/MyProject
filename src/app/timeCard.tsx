"use client";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
interface TextProps {
  old?: string;
  next: string;
  fontSize?: number;
}

function TextSlideFade({ old = "", next, fontSize = 64 }: TextProps) {
  const [current, setCurrent] = useState(old); // 当前显示内容
  const [nextContent, setNextContent] = useState(next); // 待切换内容
  const [animating, setAnimating] = useState(false); // 是否在动画中

  // 当 next 变化时触发动画
  useEffect(() => {
    if (next === current) return; // 内容相同不动

    setNextContent(next);
    setAnimating(true);

    const timer = setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 300); // 这里 300ms 与 CSS transition 一致

    return () => clearTimeout(timer);
  }, [next]);

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        height: `${fontSize}px`,
        display: "inline-block",
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        // minWidth: "2ch",
      }}
    >
      {/* 旧内容 */}
      <Box sx={{ opacity: 0 }}>{current}</Box>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: 0,
          transform: animating ? "translateY(100%)" : "translateY(0%)",
          opacity: animating ? 0 : 1,
          transition: animating ? "transform 300ms ease, opacity 300ms ease" : "",
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
          transition: animating ? "transform 300ms ease, opacity 0.3s ease" : "",
        }}
      >
        {nextContent}
      </Box>
    </Box>
  );
}
export default function TimeCard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => {
      setTime(() => {
        return new Date();
      });
    }, 1000);
    return () => clearInterval(id); // 正确！返回一个函数
  }, [setTime]);
  return (
    <Box
      sx={{
        "@font-face": {
          fontFamily: "Monocraft Local", // 局部使用的名称
          src: `url('/font/Monocraft-no-ligatures.ttf') format('truetype')`,
          fontWeight: "normal",
          fontStyle: "normal",
          fontDisplay: "swap",
        },
        // color: "primary.dark",
      }}
    >
      {/* <Typography sx={{ fontFamily: "Monocraft Local, monospace", fontSize: "4rem" }}>
        {time?.toLocaleTimeString()}
      </Typography> */}
      {/* 1. 将时间转化为类似 ["1", "2", "0", "5", "4", "8"] 的数组 */}
      {[time.getHours(), time.getMinutes(), time.getSeconds()]
        .flatMap((val) => [Math.floor(val / 10), val % 10])
        .map((digit, index) => (
          <TextSlideFade key={index} next={String(digit)} />
        ))}
    </Box>
  );
}
