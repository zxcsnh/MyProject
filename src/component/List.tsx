import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { NavItem } from "@/types/nav";
function Item({ text = "" }: { text: string }) {
  return (
    <Box
      sx={{
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "1px",
          height: "100%",
          left: "-10px",
          backgroundColor: "text.secondary",
        },
      }}
    >
      {text}
    </Box>
  );
}
function ListItem({
  item = null,
  allUnFold = false,
  selectedUrl = "",
  padding = 0,
}: {
  item?: NavItem | null;
  allUnFold?: boolean;
  selectedUrl?: string;
  padding?: number;
}) {
  if(!item)return;
  if (!item.item) {
    const onClick = () => {
      console.log(item.url);
    };
    return (
      <Box
        onClick={onClick}
        sx={{
          ...(padding !== 0 && { paddingLeft: padding * 20 + "px" }),
          ...(item.url === selectedUrl && {
            backgroundColor: "primary.light",
            color:"primary.dark"
          }),
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            "&::before": {
              content: '" "',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "action.hover",
            },
            cursor: "pointer",
          },
        }}
      >
        <Item text={item.text}></Item>
      </Box>
    );
  }
  const [isUnFold, setUnFold] = useState(allUnFold);

  useEffect(() => {
    setUnFold(allUnFold);
  }, [allUnFold]);

  const onClick = () => {
    setUnFold(!isUnFold);
  };
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          ...(padding !== 0 && { paddingLeft: padding * 20 + "px" }),
          ...(item.url === selectedUrl && {
            backgroundColor: "primary.light",
            color:"primary.dark"
          }),
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          "&:hover": {
            "&::before": {
              content: '" "',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "action.hover",
              opacity: 0.6,
            },
            cursor: "pointer",
          },
        }}
      >
        <Item text={item.text}></Item>
        {isUnFold ? (
          <KeyboardArrowUp color="primary" />
        ) : (
          <KeyboardArrowDown color="primary" />
        )}
      </Box>
      <Box sx={isUnFold ? {} : { display: "none" }}>
        {item.item?.map((it, index) => {
          return (
            <ListItem
              selectedUrl={selectedUrl}
              allUnFold={allUnFold}
              key={index}
              item={it}
              padding={padding + 1}
            />
          );
        })}
      </Box>
    </>
  );
}
function List({
  list,
  allUnFold = false,
  selectedUrl = "",
}: {
  list: Array<NavItem>;
  allUnFold?: boolean;
  selectedUrl?: string;
}) {
  return (
    <>
      {list.map((item, index) => {
        return (
          <ListItem
            selectedUrl={selectedUrl}
            allUnFold={allUnFold}
            key={index}
            item={item}
          />
        );
      })}
    </>
  );
}

export default List;
