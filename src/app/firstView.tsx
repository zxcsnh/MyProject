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
import { ReactNode, useState, useEffect, useRef } from "react";
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

export default function FirstView() {
  const [isShow, setShow] = useState(true);
  const [scroll, setScroll] = useState(0);
  const viewRef = useRef<HTMLElement | null>(null);
  const execScroll = (time: number, height: number) => {
    // 1. 修正：time 参数现在被理解为滚动的总步数或迭代次数。
    const steps = time/10;

    // 2. 修正：计算每一“步”需要滚动的距离。
    const stepHeight = height / steps;

    // 如果步数过少（或总距离为0），则使用浏览器内置的平滑滚动一次性到位。
    if (steps < 1 || height === 0) {
      window.scrollBy({
        top: height,
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    let i = 0;
    // 3. 修正：设置定时器间隔为 1 毫秒（但实际执行间隔取决于浏览器）。
    // 在循环中，每次滚动 stepHeight 的距离。
    const id = setInterval(() => {
      // 4. 修正：检查是否达到了预定的步数。
      if (i >= steps) {
        // 5. 修正：当完成所有步数后，必须清除定时器。
        clearInterval(id);
        return;
      }

      // 6. 修正：每次只滚动一小步（stepHeight）。
      window.scrollBy({
        top: stepHeight,
        left: 0,
        // 移除 'smooth' 行为，因为我们正在用 setInterval 模拟平滑。
        // 如果保留 'smooth'，会导致每次小滚动都平滑，效果反而怪异。
        behavior: "auto",
      });

      // 7. 修正：递增计数器。这是原代码无限循环的关键错误点。
      i++;
    }, 10);

    // 8. 修正：删除原代码中在 setInterval 外部的最后一次滚动逻辑，
    // 因为所有滚动都应该在定时器循环内完成。
  };
// const execScroll = (time: number, height: number) => {
//   if (time <= 0) return;
  
//   const start = window.pageYOffset;
//   const change = height;
//   const duration = time;
//   let startTime: number | null = null;
  
//   const animate = (currentTime: number) => {
//     if (!startTime) startTime = currentTime;
//     const elapsed = currentTime - startTime;
//     const progress = Math.min(elapsed / duration, 1);
    
//     // 使用缓动函数
//     const easeProgress = progress < 0.5 
//       ? 2 * progress * progress 
//       : -1 + (4 - 2 * progress) * progress;
    
//     window.scrollTo(0, start + change * easeProgress);
    
//     if (progress < 1) {
//       requestAnimationFrame(animate);
//     }
//   };
  
//   requestAnimationFrame(animate);
// };
  const handleScroll = () => {
    console.log("当前滚动位置：", window.pageYOffset);
    if (!viewRef.current) return;
    const height = viewRef.current.scrollHeight;
    console.log(height);
  };
  useEffect(() => {
    //if (document) {
    document.addEventListener("scroll", handleScroll);
    //}
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box
      ref={viewRef}
      sx={{
        // position: "fixed",
        width: "100%",
        height: "100vh",
        bgcolor: "background.default",
        // transform: `translateY(-${scroll}%)`,
        // transition: "transform 1s ease",
      }}
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
            execScroll(500,800);
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
