
import { NavItem } from '../types/nav'; // 导入类型

export const SIDEBAR_NAV_LIST: NavItem[] = [
  {
    text: "list-1",
    url: "home",
  },
  {
    text: "list-2",
    url: "",
    item: [
      {
        text: "list-2-1",
        url: "",
      },
      {
        text: "list-2-2",
        url: "",
        item: [
          {
            text: "list-2-2-1",
            url: "",
          },
        ],
      },
    ],
  },
];