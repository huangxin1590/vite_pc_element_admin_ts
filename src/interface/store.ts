import { Commit } from 'vuex';

export interface ActionProps {
  commit: Commit;
  state?: any;
}

export interface Tag {
  fullPath: string;
  path: string;
  name: string;
  meta: {
    title: string;
    keepAliveFlag?: boolean;
    tabFlag?: boolean;
    menuType?: string;
  };
  [propName: string]: any;
}

export type MenuType = 'iframe' | 'local';
export interface RouteMenu {
  path: string;
  name: string;
  title: string;
  componentPath: string;
  menuType?: MenuType;
  query?: object;
  params?: object;
  children?: RouteMenu[];
}
