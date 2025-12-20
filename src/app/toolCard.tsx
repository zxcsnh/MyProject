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
import React, { ReactNode, useRef, useState, useCallback, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import {
  FavoriteBorder,
  Height,
  KeyboardArrowDown,
  Translate,
  Lightbulb,
} from "@mui/icons-material";
import TopCard from "./topCard";
import { Theme } from "@mui/material/styles";
import theme from "@/theme/theme";
import ObserverCardBox from "@/component/observerCardBox";

function ShowItem({ width }: { width?: number }) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: width ? width : "50px",
      }}
    >
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: "12px",
          overflow: "hidden",
          transition: "boxShadow 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: (theme) => `
            0 0px 16px ${theme.palette.text.secondary} /* 主题色发光效果 */
          `,
          },
        }}
      >
        <img
          src="/file.svg"
          alt="描述"
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            display: "block", // 解决底部间隙
          }}
        />
      </Box>

      <Typography variant="caption" color="textPrimary">
        这是标题
      </Typography>
    </Box>
  );
}
export default function ToolCard() {
  const ITEMWIDTH = 50;
  const [itemWidth, setItemWidth] = useState(ITEMWIDTH);
  return (
    <Paper
      sx={{
        width: "100%",
        p: 4,
        boxSizing: "border-box",
        containerType: "inline-size",
      }}
    >
      <Box
        sx={{
          display: "grid",
          width: "100%",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, 48px)",
          justifyContent: "center",
          gridAutoFlow: "row dense",
          "@container (min-width: 796px)": {
            gridTemplateColumns: "repeat(12, minmax(48px, 1fr))",
          },
        }}
      >
        <Box sx={{bgcolor:"green"}}>1</Box>
        <Box sx={{bgcolor:"green"}}>2</Box>
        <Box sx={{bgcolor:"green"}}>3</Box>
        <Box sx={{bgcolor:"green"}}>4</Box>
        <Box sx={{bgcolor:"green"}}>5</Box>
        <Box sx={{bgcolor:"green"}}>6</Box>
        <Box sx={{bgcolor:"green"}}>7</Box>
        <Box sx={{bgcolor:"green"}}>8</Box>
        <Box sx={{bgcolor:"green"}}>9</Box>
        <Box
          sx={{
            bgcolor:"green",
            gridColumn: "span 2", // 占 3 列
            gridRow: "span 2", //占 2 行
          }}
        >
          10
        </Box>
        <Box sx={{bgcolor:"green"}}>11</Box>
        <Box sx={{bgcolor:"green"}}>12</Box>
        <Box sx={{bgcolor:"green"}}>13</Box>
        <Box sx={{bgcolor:"green"}}>14</Box>
        <Box sx={{bgcolor:"green"}}>15</Box>
        <Box sx={{bgcolor:"green"}}>16</Box>
      </Box>
    </Paper>
  );
}

// export default function ToolCard() {
//   const ITEMWIDTH = 50;
//   const [itemWidth, setItemWidth] = useState(ITEMWIDTH);
//   return (
//     <Paper sx={{ width: "100%", p: 4, boxSizing: "border-box", borderRadius: "12px" }}>
//       <Stack direction="column" spacing={2}>
//         <Box>
//           <Typography variant="h5">
//             {" "}
//             <Lightbulb
//               sx={{
//                 "&:hover": {
//                   color: "#FFD700",
//                   cursor: "pointer",
//                 },
//               }}
//             />
//             工具栏
//           </Typography>
//         </Box>
//         <ObserverCardBox ITEMWIDTH={ITEMWIDTH} setWidth={setItemWidth}>
//           <ShowItem width={itemWidth}></ShowItem>
//           <ShowItem width={itemWidth}></ShowItem>
//           <ShowItem width={itemWidth}></ShowItem>
//           <ShowItem width={itemWidth}></ShowItem>
//         </ObserverCardBox>
//       </Stack>
//     </Paper>
//   );
// }

{
  /* <>
  <Box
    sx={{
      px: 2,
      pt: 1,
      // bgcolor: "background.default",
      display: "inline-block",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    }}
  ></Box>
  <Box
    sx={{
      // bgcolor: "background.default",
      p: 2,
      borderRadius: "12px",
      borderTopLeftRadius: "0",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    }}
  ></Box>
</>; */
}
