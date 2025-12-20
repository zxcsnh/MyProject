import { Box, InputBase } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Search, ArrowDropDown } from "@mui/icons-material";
export default function InputSearchCard() {
  return (
    <Box
      sx={{
        height: "48px",
        width: {
          md: "600px",
          xs: "100%",
        },
        borderRadius: "24px",
        display: "flex",
        overflow: "hidden",
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
        transition: "all 0.3s ease",
        boxShadow: (theme) => `0 2px 4px 0 ${alpha(theme.palette.common.black, 0.3)}`,
        "&:hover": {
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.9),
          boxShadow: (theme) => `0 8px 24px 0 ${alpha(theme.palette.common.black, 0.3)}`,
        },
      }}
    >
      <Box
        sx={{
          width: "64px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            cursor: "pointer",
            bgcolor: (theme) => alpha(theme.palette.common.black, 0.05),
          },
        }}
      >
        Bing
        <ArrowDropDown sx={{ fontSize: "16px" }} />
      </Box>

      <InputBase
        placeholder="输入搜索内容"
        sx={{
          width: "100%",
          height: "100%", // InputBase 的 height 直接作用于容器
        }}
      />
      <Box
        sx={{
          width: "64px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            cursor: "pointer",
            bgcolor: (theme) => alpha(theme.palette.common.black, 0.05),
          },
        }}
      >
        <Search />
      </Box>
    </Box>
  );
}
