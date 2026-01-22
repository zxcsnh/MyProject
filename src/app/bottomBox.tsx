'use client';
import { Box, Link, Typography } from "@mui/material";

export default function BottomBox() {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          width: "100%",
          height: "64px",
          border: "1px solid",
          borderColor: "divider",
          boxSizing: "border-box",
          boxShadow: (theme) => `0px -16px 64px ${theme.palette.background.paper}`,
          // boxShadow: (theme) => `0px -32px 64px yellow`,
          px: {
            xs: 1,
            md: 7,
          },
          display:"flex",
          alignItems: "center",
        }}
      >
        <Typography variant="overline" >©2025 - 2026 By <Link href="/" underline="none">Ning</Link></Typography>
      </Box>
    </Box>
  );
}
