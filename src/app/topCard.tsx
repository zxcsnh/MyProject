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
        position: "sticky",
        top: 0,
        // zIndex: 1100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box", // 设置后，width 现在包括了 padding 和 border
        width: "100%", // 占据全部宽度
        p: 2,
      }}
    >
      <Card
        sx={{
          px: 2,
          py: 1,
          borderRadius: (theme) => theme.shape.borderRadius,
          backgroundColor: (theme) => theme.palette.background.paper,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Box
            sx={{
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
            <Box
              sx={{
                fontSize: 24,
                fontStyle: "italic",
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
            >
              Neo's Blog
            </Box>
            <Box sx={{ fontSize: 16 }}>Hello World</Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", whiteSpace: "nowrap" }}>
          <TopCardButton>博客动态</TopCardButton>
          <TopCardButton>找到我</TopCardButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", whiteSpace: "nowrap" }}>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<FavoriteBorder />}
            sx={{ borderRadius: "12px" }}
          >
            一个按钮
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
