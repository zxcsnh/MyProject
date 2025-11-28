"use client";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState<Date | null>(null);
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
        pt: 10,
        pb: 10,
        "@font-face": {
          fontFamily: "Monocraft Local", // 局部使用的名称
          src: `url('/font/Monocraft-no-ligatures.ttf') format('truetype')`,
          fontWeight: "normal",
          fontStyle: "normal",
          fontDisplay: "swap",
        },
        color: "primary.dark",
      }}
    >
      <Typography sx={{ fontFamily: "Monocraft Local, monospace", fontSize: "3rem" }}>
        {time?.toLocaleTimeString()}
      </Typography>
    </Box>
  );
}
