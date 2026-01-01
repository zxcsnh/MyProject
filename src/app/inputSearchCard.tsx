import { Box, IconButton, InputBase, Button, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Search, ArrowDropDown, Clear } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import IconTextItem from "@/component/IconTextItem";
import { SEARCH_ENGINE_LIST, searchEngineType } from "@/config/searchEngineList";

/**
 * 获取搜索的值跳转搜索页面
 * @param inputValue 搜索框的值
 */
const submmitSearch = (inputValue: string, url: string) => {
  const searchUrl = `${url}${encodeURIComponent(inputValue)}`;
  // 打开新标签页
  window.open(searchUrl, "_blank", "noopener,noreferrer");
};

/**
 * 获取搜索框下拉栏的联想词
 * 使用百度api
 * @param inputValue
 * @param setSearchSuggestionList
 */
interface BaiduResponse {
  g?: Array<{ q: string; [key: string]: any }>;
  [key: string]: any;
}
const getSearchSuggestion = (inputValue: string, setSearchSuggestionList: Function) => {
  if (inputValue === "") {
    setSearchSuggestionList([]);
  } else {
    const suggestionList: string[] = [inputValue];
    fetch(`/api/baidu/sugrec?prod=pc&wd=${inputValue}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // 将响应解析成 JSON
      })
      .then((data: BaiduResponse) => {
        data?.g?.forEach((item) => {
          suggestionList.push(item?.q);
        });
        setSearchSuggestionList(suggestionList);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
};
function ChangeSearchEngine({
  isShow,
  setSearchEngine,
}: {
  isShow: Boolean;
  setSearchEngine: Function;
}) {
  return (
    <Box
      onMouseDown={(e) => e.preventDefault()}
      sx={{
        width: "100%",
        height: isShow ? "90px" : "0px",
        bgcolor: (theme) => theme.palette.background.paper,
        borderRadius: "24px",
        boxSizing: "border-box",
        mt: "8px",
        px: "16px",
        gap: "8px",
        overflow: "hidden",
        transition: "height 0.3s ease",
        boxShadow: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      {SEARCH_ENGINE_LIST.map((engine, index) => {
        return (
          <IconTextItem
            key={index}
            onClick={() => {
              setSearchEngine(SEARCH_ENGINE_LIST[index]);
            }}
            icon={
              <Box
                component="img"
                src={engine.icon}
                alt={engine.name}
                sx={{
                  width: "24px",
                  height: "24px",
                }}
              />
            }
            label={engine.name}
            sx={{
              borderRadius: "12px",
              "&:hover": {
                // boxShadow: 1,
                backgroundImage: (theme) =>
                  `linear-gradient(${alpha(theme.palette.common.black, 0.05)})`,
              },
            }}
          />
        );
      })}
    </Box>
  );
}
function SearchSuggestion({
  isSearchSuggestionShow,
  inputValue,
  searchSuggestionList,
  setInputValue,
  selectId,
}: {
  isSearchSuggestionShow: boolean;
  inputValue: string;
  searchSuggestionList: string[];
  setInputValue: Function;
  selectId: number;
}) {
  return (
    <Box
      onMouseDown={(e) => e.preventDefault()}
      sx={{
        width: "100%",
        maxHeight: isSearchSuggestionShow && inputValue !== "" ? "480px" : "0",
        bgcolor: (theme) => theme.palette.background.paper,
        borderRadius: "24px",
        mt: "8px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "max-height 0.3s ease",
        boxShadow: (theme) => `0 2px 4px 0 ${alpha(theme.palette.common.black, 0.3)}`,
      }}
    >
      {searchSuggestionList.map((item, index) => {
        if (index === 0) return;
        return (
          <Box key={index}>
            <SearchSuggestionItem
              setInput={setInputValue}
              text={item}
              id={index}
              selectId={selectId}
            />
          </Box>
        );
      })}
    </Box>
  );
}

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
  const [isInput, setInput] = useState(false);
  const [searchSuggestionList, setSearchSuggestionList] = useState<string[]>([]);
  const [selectId, setSelectId] = useState(0);
  const [isSeachEngineSelectShow, setSeachEngineSelectShow] = useState(false);
  const [searchEngine, setSearchEngine] = useState(SEARCH_ENGINE_LIST[0]);
  const searchCallBackId = useRef<number | null>(null);
  // 处理上下键
  const selectionDown = () => {
    const size = searchSuggestionList.length;
    if (size <= 0) return;
    setSelectId((selectId + 1) % size);
    setInputValue(searchSuggestionList[(selectId + 1) % size]);
  };
  const selectionUp = () => {
    const size = searchSuggestionList.length;
    if (size <= 0) return;
    setSelectId((selectId + size - 1) % size);
    setInputValue(searchSuggestionList[(selectId + size - 1) % size]);
  };
  // 联想词缓冲
  useEffect(() => {
    // 如果之前有定时器，先清掉
    if (searchCallBackId.current !== null) {
      clearTimeout(searchCallBackId.current);
    }
    if (isInput == false) return;
    // 新建定时器
    searchCallBackId.current = window.setTimeout(() => {
      getSearchSuggestion(inputValue, setSearchSuggestionList);
      setInput(false);
    }, 300);
    // 可选：组件卸载时清理定时器
    return () => {
      if (searchCallBackId.current !== null) {
        clearTimeout(searchCallBackId.current);
      }
    };
  }, [inputValue, isInput]);

  return (
    <Box
      sx={{
        position: "relative",
        width: {
          xs: "100%",
          md: "720px",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "52px",
          width: "100%",
          borderRadius: "24px",
          display: "flex",
          overflowX: "hidden",
          bgcolor: (theme) => theme.palette.background.paper,
          transition: "all 0.3s ease",
          boxShadow: 1,
          "&:hover": {
            boxShadow: 3,
            backgroundImage: (theme) =>
              `linear-gradient(${alpha(theme.palette.common.black, 0.01)})`,
          },
        }}
      >
        <IconButton
          color="inherit"
          disableRipple
          sx={{
            borderRadius: 0,
            width: "52px",
            padding: 0,
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.05),
            },
          }}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setSeachEngineSelectShow(!isSeachEngineSelectShow)}
        >
          <Box
            component="img"
            src={searchEngine.icon}
            alt={searchEngine.name}
            sx={{
              width: "20px",
              height: "20px",
            }}
          />
          <ArrowDropDown sx={{ fontSize: "16px" }} />
        </IconButton>
        <InputBase
          sx={{
            flex: 1,
            height: "100%",
            paddingLeft: "4px",
            userSelect: "none",
          }}
          placeholder="输入搜索内容"
          value={inputValue}
          onChange={(e) => {
            setInput(true);
            setInputValue(e.target.value);
          }}
          onFocus={() => setSearchSuggestionShow(true)}
          onBlur={() => {
            setSearchSuggestionShow(false);
            console.log("Blur");
          }}
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
              submmitSearch(inputValue, searchEngine.url);
            }
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="clear"
            color="inherit"
            sx={{
              width: "32px",
              height: "32px",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.common.black, 0.05),
              },
            }}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setInputValue("")}
          >
            <Clear fontSize="medium" />
          </IconButton>
        </Box>
        <IconButton
          color="inherit"
          disableRipple
          sx={{
            borderRadius: 0,
            width: "52px",
            padding: 0,
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.05),
            },
          }}
          onClick={() => {
            submmitSearch(inputValue, searchEngine.url);
          }}
        >
          <Search fontSize="medium" />
        </IconButton>
      </Box>
      <Box sx={{ position: "absolute", top: "100%", width: "100%", height: 0 }}>
        <ChangeSearchEngine
          isShow={isSeachEngineSelectShow}
          setSearchEngine={setSearchEngine}
        />
        <SearchSuggestion
          isSearchSuggestionShow={isSearchSuggestionShow}
          inputValue={inputValue}
          searchSuggestionList={searchSuggestionList}
          setInputValue={setInputValue}
          selectId={selectId}
        />
      </Box>
    </Box>
  );
}
