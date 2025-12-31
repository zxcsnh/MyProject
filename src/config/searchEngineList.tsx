export interface searchEngineType {
  name: string;
  icon: string;
  url: string;
}

export const SEARCH_ENGINE_LIST: searchEngineType[] = [
  {
    name: "Bing",
    icon: "/bing.svg",
    url: "https://www.bing.com/search?q=",
  },
  {
    name: "百度",
    icon: "/baidu.svg",
    url: "https://www.baidu.com/s?wd=",
  },
] as const;
