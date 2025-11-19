import { useEffect, useState } from "react";
import "./List.css";

import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
type ListItem = {
  text: string;
  url?: string | null;
  item?: Array<object> | null;
};

function getFromList(list: unknown): ListItem {
  // 使用类型保护，避免直接访问未知类型属性时报错
  if (typeof list === "object" && list !== null) {
    const l = list as Record<string, any>;
    return {
      text: typeof l.text === "string" ? l.text : "",
      url: typeof l.url === "string" ? l.url : null,
      item: typeof l.item === "object" && l.item !== null ? l.item : null,
    };
  }

  // 如果传入不是对象，返回默认值
  return {
    text: "",
    url: null,
    item: null,
  };
}

function ListItem({
  text = "",
  url = null,
  item = null,
  allUnFold = false,
  selectedUrl = "",
  padding = 0,
}: {
  text?: string;
  url?: string | null;
  item?: Array<object> | null;
  allUnFold?: boolean;
  selectedUrl?: string;
  padding?: number;
}) {
  if (item === null) {
    const onClick = () => {
      console.log(url);
    };
    return (
      <div
        onClick={onClick}
        className={(url === selectedUrl ? "select " : "") + "listItem"}
        style={padding === 0 ? {} : { paddingLeft: padding * 20 + "px" }}
      >
        {text}
      </div>
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
      <div
        onClick={onClick}
        className="listItem"
        style={padding === 0 ? {} : { paddingLeft: padding * 20 + "px" }}
      >
        <div>{text}</div>
        {isUnFold ? (
          <KeyboardArrowUp color="primary" />
        ) : (
          <KeyboardArrowDown color="primary" />
        )}
      </div>
      <div style={isUnFold ? {} : { display: "none" }}>
        {item?.map((it, index) => {
          return (
            <ListItem
              selectedUrl={selectedUrl}
              allUnFold={allUnFold}
              key={index}
              {...getFromList(it)}
              padding={padding + 1}
            />
          );
        })}
      </div>
    </>
  );
}
function List({
  list,
  allUnFold = false,
  selectedUrl = "",
}: {
  list: Array<object>;
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
            {...getFromList(item)}
          />
        );
      })}
    </>
  );
}

export default List;
