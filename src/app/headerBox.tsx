"use client";
import { Box, Button, Typography, keyframes } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowUpward, Translate } from "@mui/icons-material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import Link from "next/link";
import TypeWriter from "@/component/typeWriter";
import { alpha } from "@mui/material/styles";
import TimeBox from "./timeBox";
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
  0% { transform: rotate(0deg); }
  75% { transform: rotate(360deg); } /* 在一半的时间内完成旋转 */
  100% { transform: rotate(360deg); } /* 剩下的时间保持不动 */
`;
  const rotateAnimationInfinite = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
  return (
    <Box
      sx={{
        height: "64px",
        // position: "sticky"  ---  向上查找最近的拥有滚动条祖先
        position: "sticky",
        top: 0,
        backgroundColor: (theme) =>
          scrolled ? theme.palette.background.paper : "transparent",
        backgroundImage: (theme) =>
          `linear-gradient(to bottom, ${theme.palette.background.paper} 30%, transparent)`,
        backgroundBlendMode: "overlay",
        boxShadow: scrolled ? 1 : "none",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease, background-color 0.5s ease",
        px: {
          xs: 1,
          md: 7,
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          position: "relative",
        }}
      >
        {/* 头像 */}
        <Box
          sx={{
            position: "relative",
            width: "64px",
            height: "64px",
          }}
        >
          {/* 头像实际定位容器 */}
          <Box
            className="hover-avater-container"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,

              "& .hover-avater-button-container": {
                visibility: "hidden",
                opacity: 0,
                position: "absolute",
                bgcolor: "background.paper",
                p: 2,
                pt: 10,
                top: "100%",
                width: "256px",
                borderRadius: "24px",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease",
              },
              "& .hover-avater-button": {
                width: "100%",
                opacity: 0,
                translate: "0% -100%",
                transition: "all 0.3s ease",
                mt: 1,
                textTransform: "none",
                borderRadius: "12px",
                fontWeight: 600,
                backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.5),
                backdropFilter: "blur(8px)", // 毛玻璃
                color: "text.primary",
                boxShadow: 3,
                "&:hover": {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.5),
                  transform: "scale(1.05) !important", // 悬停微扩
                  boxShadow: 4,
                },
              },
              "& .hover-avater-border": {
                scale: "0.9",
                display: "block",
                width: "100%",
                aspectRatio: "1 / 1", // 固定宽高比
                borderRadius: "50%",
                background: (theme) => `conic-gradient(
                ${theme.palette.secondary.dark}, 
                ${theme.palette.secondary.main}, 
                ${theme.palette.secondary.light},
                ${theme.palette.primary.dark},
                ${theme.palette.primary.main},
                ${theme.palette.primary.light},
                ${theme.palette.secondary.dark}
              )`,
                transition: "all 0.3s ease",
              },
              "& + .hover-avater-name": {
                zIndex: 1,
                display: {
                  xs: "none",
                  md: "inline-block",
                },
                position: "absolute",
                left: "100%",
                top: "50%",
                translate: "0% -50%",
                px: 4,
                py: 0.5,
                ml: 2,
                borderRadius: "24px",
                cursor: "pointer",
                "&:hover": { bgcolor: "primary.main", color: "white" },
                transition: "all 0.3s ease, translate 0.3s ease",
              },
              "&:hover": {
                "& .hover-avater-button-container": {
                  transition: "all 0.3s ease",
                  visibility: "visible",
                  opacity: 1,
                },
                "& .hover-avater-button": {
                  opacity: 1,
                  translate: "0% 0%",
                  transition: `translate 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) calc((var(--i)) * 0.2s),
                     opacity 0.4s ease calc((var(--i)) * 0.2s)
                    `,
                },

                "& .hover-avater-border": {
                  transition: "all 0.3s ease",
                  translate: "60% 90%",
                  scale: "1.5",
                  animation: `${rotateAnimationInfinite} 2s linear infinite reverse`,
                  Filter: "blur(8px)",
                  "& .hover-avater-img": {
                    animation: `${rotateAnimationInfinite} 2s linear infinite`,
                  },
                },
                "& + .hover-avater-name": {
                  translate: "50% 100%",
                  pointerEvents: "none",
                  transition: "all 0.3s ease, translate 0.3s ease",
                },
              },
            }}
          >
            {/* 头像边框  */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <Box className="hover-avater-border">
                {/* 头像图片 */}
                <Box
                  className="hover-avater-img"
                  component="img"
                  src="/avatar.jpg"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    aspectRatio: "1 / 1", // 固定宽高比
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid transparent",
                    boxSizing: "border-box",
                    borderColor: "transparent", // 边框颜色为透明
                    boxShadow: 3,
                    cursor: "pointer",
                    animation: `${rotateAnimation} 4s ease infinite`,
                  }}
                />
              </Box>
            </Box>

            <Box className="hover-avater-button-container">
              <Button className="hover-avater-button" sx={{ "--i": 1 }}>
                <Typography variant="body1">首页</Typography>
              </Button>
              <Button className="hover-avater-button" sx={{ "--i": 2 }}>
                <Typography variant="body1">GitHub</Typography>
              </Button>
              <Button className="hover-avater-button" sx={{ "--i": 3 }}>
                <Typography variant="body1">未完待续</Typography>
              </Button>
            </Box>
          </Box>
          <Box className="hover-avater-name">
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
      </Box>
      <Box
        sx={{
          position: "relative",
          overflowY: "hidden",
          width: "300px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: isScrollingUp ? "translate(-50%, 150%)" : "translate(-50%, -50%)",
            opacity: isScrollingUp ? 0 : 1,
            transition: "all 0.3s ease",
          }}
        >
          <TypeWriter left="「 " right=" 」" cursorSx={{ display: "none" }}></TypeWriter>
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
                px: 4,
                py: 0.5,
                borderRadius: "24px",
                cursor: "pointer",
                color: "text.primary",
                "&:hover": { px: 8, bgcolor: "primary.main", color: "white" },
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
            position: "relative",
          }}
        >
          <Box>
            <TimeBox subTimeSx={{ display: "none" }}>这是时间</TimeBox>
          </Box>
          <Box
            onClick={upToTop}
            sx={{
              position: "relative",
              ml: scrolledHeight >= 1 ? 2 : 0, // 隐藏时消除外边距
              width:
                scrolledHeight >= 1 ? (scrolledHeight > 95 ? "72px" : "32px") : "0px",
              transform: scrolledHeight >= 1 ? "scale(1)" : "scale(0) translateX(100%)",
              pointerEvents: scrolledHeight >= 1 ? "auto" : "none",
              opacity: scrolledHeight >= 1 ? 1 : 0,
              height: "32px",
              borderRadius: scrolledHeight > 95 ? "50px" : "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "text.primary",
              color: "white",
              boxShadow: 2,
              cursor: "pointer",
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
