"use client";

import {
  Box,
  Paper,
  Card,
  useTheme,
  autocompleteClasses,
  Avatar,
  Divider,
  ButtonGroup,
  Button,
  ButtonProps,
  Theme,
  ListItem,
  List,
  Typography,
} from "@mui/material";

import { FavoriteBorder, KeyboardArrowDown } from "@mui/icons-material";
function TopCardButton(props: ButtonProps) {
  const { sx: externalSx, ...otherProps } = props;
  return (
    <Button
      size="large"
      endIcon={<KeyboardArrowDown />}
      sx={{
        py: 1,
        px: 2,
        width: "100%",
        color: (theme: Theme) => theme.palette.text.primary,
        transition: "background-color 0.3s ease-in-out",
        borderRadius: "8px",
        "&:hover": {
          color: (theme: Theme) => theme.palette.primary.main,
          backgroundColor: (theme: Theme) => theme.palette.primary.light,
        },
        ...externalSx, // 合并外部写入的sx
      }}
      {...otherProps}
    >
      {props.children}
    </Button>
  );
}

export default function TopCard() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 1100,
        boxSizing: "border-box", // 设置后，width 现在包括了 padding 和 border
        width: "100%", // 占据全部宽度
        p: 2,
      }}
    >
      <Paper
        sx={{
          maxWidth: {
            xs: "100%",
            sm: 500,
            md: 700,
          },
          mx: "auto",
          px: 2,
          py: 1,
          borderRadius: "16px",
          backgroundColor: (theme) => theme.palette.background.paper,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: {
            xs: 1,
            sm: 3,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Box
            sx={{
              flex: 1,
              width: 100,
              height: 50,
            }}
          >
            <img
              src="/next.svg"
              alt="Next.js Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ margin: 1 }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontStyle: "italic",
                fontWeight: "bold",
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.secondary.main} 20%, ${theme.palette.secondary.light} 80%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textFillColor: "transparent",
                overflow: "hidden",
              }}
            >
              Neo's Blog
            </Typography>
            <Typography
              variant="subtitle1"
              noWrap
              sx={{
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.secondary.light} 20%, ${theme.palette.secondary.main} 80%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hello World
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            whiteSpace: "nowrap",
          }}
        >
          <TopCardButton>博客动态</TopCardButton>
          <TopCardButton>找到我</TopCardButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", whiteSpace: "nowrap" }}>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{ borderRadius: "12px", p: { xs: 1, sm: 2 } }}
          >
            <FavoriteBorder />
            <Box component="span" sx={{ pl: 1, display: { xs: "none", sm: "block" } }}>
              一个按钮
            </Box>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
