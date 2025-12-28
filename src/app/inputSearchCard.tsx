import { Box, InputBase } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Search, ArrowDropDown } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

function SearchSuggestionItem({
  setInput,
  text,
  id,
  selectId,
}: {
  setInput: Function;
  text: String;
  id: Number;
  selectId: Number;
}) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100%",
        px: "16px",
        transition: "background-color 0.2s ease",
        bgcolor:
          id === selectId ? (theme) => alpha(theme.palette.primary.light, 0.5) : "",
        "&:hover": {
          bgcolor: (theme) => alpha(theme.palette.primary.light, 0.7),
        },
      }}
      onClick={() => {
        setInput(text);
      }}
    >
      <Box
        sx={{
          width: "100%",
          py: "8px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          lineHeight: "1em",
          transition: "transform 0.2s ease",
          transform: id === selectId ? "translateX(8px)" : "",
          "&:hover": {
            transform: "translateX(8px)",
          },
        }}
      >
        <Search fontSize="small" />
        <Box component="span">{text}</Box>
      </Box>
    </Box>
  );
}
export default function SearchInputBox() {
  const [isSearchSuggestionShow, setSearchSuggestionShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchSuggestionList, setSearchSuggestionList] = useState<string[]>([]);
  const [selectId, setSelectId] = useState(0);
  const selectionDown = () => {
    const size = searchSuggestionList.length;
    if (size <= 0) return;
    setSelectId((selectId % size) + 1);
    setInputValue(searchSuggestionList[selectId % size]);
  };
  const selectionUp = () => {
    const size = searchSuggestionList.length;
    if (size <= 0) return;
    setSelectId(((selectId + size - 2) % size) + 1);
    setInputValue(searchSuggestionList[(selectId + size - 2) % size]);
  };
  const searchCallBackId = useRef<number | null>(null);
  const submmitSearch = () => {
    const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(inputValue)}`;
    // 打开新标签页
    window.open(searchUrl, "_blank", "noopener,noreferrer");
  };
  useEffect(() => {
    // 如果之前有定时器，先清掉
    if (searchCallBackId.current !== null) {
      clearTimeout(searchCallBackId.current);
    }

    // 新建定时器
    searchCallBackId.current = window.setTimeout(() => {
      if (inputValue === "") {
        setSearchSuggestionList([]);
      } else {
        setSearchSuggestionList(["test1", "test2", "test3", "test4", "test5", "test6"]);
        // fetch(`/api/ddg/?q=${inputValue}&type=list`)
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     return response.json(); // 将响应解析成 JSON
        //   })
        //   .then((data) => {
        //     console.log(data);
        //   })
        //   .catch((error) => {
        //     console.error("Fetch error:", error);
        //   });
      }
    }, 300);

    // 可选：组件卸载时清理定时器
    return () => {
      if (searchCallBackId.current !== null) {
        clearTimeout(searchCallBackId.current);
      }
    };
  }, [inputValue]);

  return (
    <Box sx={{position: "relative",}}>
      <Box
        sx={{
          position: "relative",
          height: "48px",
          width: {
            md: "600px",
            xs: "100%",
          },
          borderRadius: "24px",
          display: "flex",
          overflow:"hidden",
          bgcolor: (theme) => theme.palette.background.paper,
          transition: "all 0.3s ease",
          boxShadow: (theme) => `0 2px 4px 0 ${alpha(theme.palette.common.black, 0.3)}`,
          "&:hover": {
            boxShadow: (theme) =>
              `0 8px 24px 0 ${alpha(theme.palette.common.black, 0.3)}`,
          },
        }}
      >
        <Box
          sx={{
            width: "64px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            "&:hover": {
              cursor: "pointer",
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.05),
            },
          }}
        >
          <Box
            component="img"
            src="/bing.svg"
            alt="bing"
            sx={{
              width: "20px",
              height: "20px",
            }}
          />
          <ArrowDropDown sx={{ fontSize: "16px" }} />
        </Box>

        <InputBase
          sx={{
            width: "100%",
            height: "100%",
            paddingLeft: "8px",
          }}
          placeholder="输入搜索内容"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setSearchSuggestionShow(true)}
          onBlur={() => setSearchSuggestionShow(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              selectionDown();
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              selectionUp();
            }
            if (e.key === "Enter") {
              console.log("enter");
              submmitSearch();
            }
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
          onClick={() => {
            submmitSearch();
          }}
        >
          <Search />
        </Box>
      </Box>
      <Box
        onMouseDown={(e) => e.preventDefault()}
        sx={{
          width: "100%",
          maxHeight: isSearchSuggestionShow && inputValue ? "320px" : "0",
          bgcolor: (theme) => theme.palette.background.paper,
          position: "absolute",
          top: "100%",
          borderRadius: "24px",
          mt: "8px",
          overflow: "hidden",
          cursor: "pointer",
          transition: "max-height 0.3s ease",
          boxShadow: (theme) => `0 2px 4px 0 ${alpha(theme.palette.common.black, 0.3)}`,
        }}
      >
        {searchSuggestionList.map((item, index) => {
          return (
            // 只有设置了position，zIndex才生效
            <Box key={index}>
              <SearchSuggestionItem
                setInput={setInputValue}
                text={item}
                id={index + 1}
                selectId={selectId}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
