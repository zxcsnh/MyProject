"use client";

import { Box } from "@mui/material";
import React, { ReactNode, useRef, useCallback, useEffect } from "react";

function ObserverCardBox({
  children,
  ITEMWIDTH,
  setWidth,
}: {
  children?: ReactNode;
  ITEMWIDTH: number;
  setWidth: Function;
}) {
  const boxRef = useRef<HTMLElement | null>(null);
  const gap = 16;
  const childCount = React.Children.count(children);
  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!entries || entries.length === 0) {
        return;
      }
      // 得到当前容器的content宽度
      const contentRect = entries[0].contentRect.width;
      // 计算当前容器能放置几个子部件
      const count = Math.floor((contentRect + gap) / (ITEMWIDTH + gap));

      if (count < 2) {
        setWidth(contentRect);
        return;
      }

      const requiredWidthForAllChildren = childCount * ITEMWIDTH + (childCount - 1) * gap;

      if (requiredWidthForAllChildren <= contentRect) {
        // 如果一行能容纳所有部件，则无需拉伸
        setWidth(ITEMWIDTH);
        return;
      }

      // 计算最终宽度
      const totalGapSpace = (count - 1) * gap;
      const availableContentWidth = contentRect - totalGapSpace;
      let finalWidth = availableContentWidth / count;
      finalWidth = Math.floor(finalWidth);
      setWidth(finalWidth);
    },
    [childCount],
  );

  useEffect(() => {
    if (!boxRef.current) return;
    const observer = new ResizeObserver(handleResize);
    observer.observe(boxRef.current);

    return () => {
      if (!boxRef.current) return;
      observer.unobserve(boxRef.current);
      observer.disconnect();
    };
  }, [handleResize]);
  
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      }}
      ref={boxRef}
    >
      {children}
    </Box>
  );
}

export default ObserverCardBox;
