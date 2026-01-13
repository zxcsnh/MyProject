"use client";
import { Box, Button, Typography, keyframes } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowUpward, Translate } from "@mui/icons-material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import Link from "next/link";
import TypeWriter from "@/component/typeWriter";
export default function HeaderBox({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledHeight, setScrolledHeight] = useState(0);
  const upToTop = () => {
    const element = containerRef.current;
    if (!element) return;
    //   // 使用 scrollTo 方法
    //   currentRef.scrollTo({
    //     top: 0,
    //     behavior: "smooth", // 关键：开启平滑滚动
    //   });
    const duration = 500; // 设定固定时间，例如 500 毫秒
    const start = element.scrollTop; // 当前滚动位置
    const startTime = performance.now(); // 动画开始的时间戳

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime; // 已过去的时间
      const progress = Math.min(timeElapsed / duration, 1); // 动画进度 (0 到 1)

      // 使用 EaseInOutQuad 缓动函数，让动画先加速后减速，更自然
      const ease =
        progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      element.scrollTop = start * (1 - ease); // 根据进度更新滚动位置

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll); // 在时间内继续下一帧
      }
    };
    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;
    const onScroll = () => {
      // currentRef.scrollTop 元素内容垂直滚动的距离（顶部被遮住的高度）
      // currentRef.clientHeight 元素的可视区域高度
      // currentRef.scrollHeight 元素的实际高度
      const scrollTop = currentRef.scrollTop;
      setLastScrollY((prev) => {
        if (Math.abs(scrollTop - prev) < 10) {
          return prev;
        }
        setScrollingUp(prev > scrollTop);
        return scrollTop;
      });

      setScrolled((prev) => {
        if (!prev && scrollTop > 0) return true;
        if (prev && scrollTop === 0) return false;
        return prev;
      });

      const percent = Math.floor(
        (currentRef.scrollTop / (currentRef.scrollHeight - currentRef.clientHeight)) *
          100,
      );
      //   console.log(percent);
      setScrolledHeight(percent);
    };

    currentRef.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      currentRef.removeEventListener("scroll", onScroll);
    };
  }, []);
  const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
  return (
    <Box
      sx={{
        height: "64px",
        // position: "sticky", 向上查找最近的拥有滚动条祖先
        position: "sticky",
        top: 0,
        bgcolor: (theme) => (scrolled ? theme.palette.background.paper : ""),
        boxShadow: scrolled ? 1 : "none",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        px: 7,
      }}
    >
      <Box
        sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "left" }}
      >
        <Box
          component="img"
          src="/google.svg"
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%", // 关键属性
            objectFit: "cover", // 确保图片不被拉伸
            border: "2px solid",
            borderColor: "primary.main",
            boxShadow: 3,
            cursor: "pointer",
            animation: `${rotateAnimation} 3s ease infinite`,
          }}
        />
        <Box
          sx={{
            display: "inline-block",
            alignItems: "center",
            px: 2,
            py: "4px",
            borderRadius: "24px",
            cursor: "pointer",
            "&:hover": { bgcolor: "primary.main", color: "white" },
            transition: "all 0.3s ease",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
            }}
          >
            Ning
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "300px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: isScrollingUp ? "translate(-50%, 150%)" : "translate(-50%, -50%)",
            // opacity: 1,
            transition: "all 0.3s ease",
          }}
        >
          <TypeWriter></TypeWriter>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isScrollingUp ? "" : "translateY(-100%)",
            transition: "all 0.3s ease",
          }}
        >
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <Box
              sx={{
                display: "inline-block",
                alignItems: "center",
                px: 2,
                py: "4px",
                borderRadius: "24px",
                cursor: "pointer",
                color: "text.primary",
                "&:hover": { px: 3, bgcolor: "primary.main", color: "white" },
                transition: "all 0.3s ease",
              }}
            >
              <Typography variant="h6" noWrap>
                首页
              </Typography>
            </Box>
          </Link>
        </Box>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <Box
            onClick={upToTop}
            sx={{
              opacity: scrolledHeight >= 1 ? 1 : 0,
              transform: scrolledHeight >= 1 ? "" : "translateX(100%)",
              width: scrolledHeight > 95 ? "72px" : "32px",
              height: "32px",
              borderRadius: scrolledHeight > 95 ? "50px" : "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "text.secondary",
              color: "white",
              boxShadow: 2,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",

              "&:hover": {
                bgcolor: "primary.main",
                transform: "scale(1.25)",
                "& .hover-icon": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
                "& .hover-text": {
                  opacity: 0,
                  transform: "translateY(-100%)",
                },
              },
            }}
          >
            <Typography
              className="hover-text"
              variant="body2"
              noWrap
              sx={{
                position: "absolute",
                transition: "all 0.3s ease",
                fontWeight: "bold",
              }}
            >
              {scrolledHeight > 95 ? "返回顶部" : scrolledHeight}
            </Typography>

            <ArrowUpward
              className="hover-icon"
              sx={{
                opacity: 0,
                position: "absolute",
                transform: "translateY(100%)",
                transition: "all 0.3s ease",
                stroke: "currentColor",
                strokeWidth: 1.2,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
