export interface NavItem {
  text: string;
  url: string;
  unfold?:boolean;
  item?: NavItem[];
}