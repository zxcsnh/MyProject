import { ReactNode, useEffect, useState, MouseEventHandler } from "react";
import { Box, Paper } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { NavItem } from "@/types/nav";

function Item({
  onClick,
  padding,
  item,
  selectedUrl,
  children,
}: {
  children?: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
  padding: number;
  item: NavItem;
  selectedUrl: string;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        margin: 0.5,
        p: 0.5,
        ...(padding !== 0 && { paddingLeft: padding * 3 }),
        ...(item.url === selectedUrl && {
          backgroundColor: "primary.light",
          color: "primary.dark",
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
        {item.text}
      </Box>
      {children}
    </Box>
  );
}

function ListItem({
  item = null,
  allUnFold = null,
  selectedUrl = "",
  padding = 0,
}: {
  item?: NavItem | null;
  allUnFold?: boolean | null;
  selectedUrl?: string;
  padding?: number;
}) {
  if (!item) return;
  if (!item.item) {
    const onClick = () => {
      console.log(item.url);
    };
    return (
      <Item
        onClick={onClick}
        item={item}
        padding={padding}
        selectedUrl={selectedUrl}
      ></Item>
    );
  }
  const [isUnFold, setUnFold] = useState(item.unfold);

  useEffect(() => {
    if (allUnFold !== null) {
      setUnFold(allUnFold);
    }
  }, [allUnFold]);

  const onClick = () => {
    setUnFold(!isUnFold);
  };

  return (
    <>
      <Item onClick={onClick} item={item} padding={padding} selectedUrl={selectedUrl}>
        {isUnFold ? (
          <KeyboardArrowUp color="primary" />
        ) : (
          <KeyboardArrowDown color="primary" />
        )}
      </Item>

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
  allUnFold = null,
  selectedUrl = "",
}: {
  list: Array<NavItem>;
  allUnFold?: boolean | null;
  selectedUrl?: string;
}) {
  const [processedList, setProcessedList] = useState<NavItem[]>(() => {
    const listCopy: NavItem[] = [];
    list.forEach((itm) => {
      const temp = deepcopy(itm, selectedUrl);
      listCopy.push(temp);
    });
    return listCopy;
  });
  function deepcopy(it: NavItem, selectedUrl: string): NavItem {
    let ans: NavItem = { ...it };
    const isSelected = it.url === selectedUrl;
    ans.unfold = isSelected;
    if (it.item && it.item.length > 0) {
      ans.item = [];
      let childIsUnfolded = false;
      it.item.forEach((itm) => {
        const temp = deepcopy(itm, selectedUrl);
        ans.item!.push(temp);
        if (temp.unfold) {
          childIsUnfolded = true;
        }
      });
      if (childIsUnfolded) {
        ans.unfold = true;
      }
    } else {
      delete ans.item;
    }
    return ans;
  }

  return (
    <Box sx={{ userSelect: "none" }}>
      {processedList.map((item, index) => {
        return (
          <ListItem
            selectedUrl={selectedUrl}
            allUnFold={allUnFold}
            key={index}
            item={item}
          />
        );
      })}
    </Box>
  );
}

export default List;
