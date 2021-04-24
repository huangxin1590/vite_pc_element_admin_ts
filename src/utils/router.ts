import { RouteRecordRaw } from 'vue-router';
import router from '@/router/index';
import { RouteMenu } from '@/interface/store';
import Layout from '@/layouts/home/index.vue';
import IframeCommono from '@/views/iframeCommon.vue';

// route的格式数据（其余都放入meta中）
const routePropInfo: string[] = ['path', 'name', 'componentPath', 'children'];

const curRouteMenus: any[] = [];
/** 扁平化菜单 */
function filterRouteMenus(routers: any): void {
  routers.forEach((route: any) => {
    if ('menuType' in route) {
      curRouteMenus.push(route);
    }

    if ('children' in route && route.children.length > 0) {
      filterRouteMenus(route.children);
    }
  });
}

// 根据menu转换成router格式的数据
export function utilFilterRouter(routers: RouteMenu[]) {
  filterRouteMenus(routers);

  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = curRouteMenus.map((item) => {
    // 具有文件路径跟menu类型才进行构建路由
    if (item.componentPath && item.menuType) {
      const newRoute: RouteRecordRaw = {
        path: '',
        name: '',
        meta: {},
        component: Layout,
      };

      Object.keys(item).forEach((prop) => {
        if (!routePropInfo.includes(prop) && newRoute.meta) {
          newRoute.meta[prop] = item[prop];
        }
      });

      newRoute.path = item.path;
      newRoute.name = item.name;

      // home (主页框架)
      // menuType:菜单类型（iframe与本地菜单）
      if (item.componentPath === 'home' && item.menuType !== 'iframe') {
        newRoute.component = Layout;
      } else if (item.menuType === 'iframe') {
        newRoute.component = IframeCommono;
      } else {
        newRoute.component = () =>
          // 此模式不支持@符号
          import(/* webpackChunkName: "views" */ `../views${item.componentPath}.vue`);
      }

      return newRoute;
    }
  });
  return accessedRouters;
}

// 根据menu，动态设置路由
export function utilSetRouterByMenu(menu = []) {
  // filter为了过滤undefined
  utilFilterRouter(menu)
    .filter((item) => item)
    .forEach((item) => router.addRoute('Layout', item as RouteRecordRaw));
}

interface FindPathByName {
  menuList: RouteMenu[];
  name: string;
  level?: number;
}

interface FindPathByNameItem extends FindPathByName {
  level: number;
}

export function findPathByName({ menuList, name, level = 0 }: FindPathByName): any[] {
  const curBread: object[] = [];
  // 使用some，是为了更好break
  function findPathByNameItem({ menuList, name, level }: FindPathByNameItem) {
    menuList.some((item) => {
      let isFind = false;
      // 递归
      if (item.children && item.children.length) {
        findPathByNameItem({
          menuList: item.children,
          name,
          level: level + 1,
        });
      }
      // 匹配到相同名称则加入到对应的index位置
      // 如果curBread的length是>0的，说明是已经找对应的路径，需要把父级title添加进去
      if (item.name === name || curBread.length) {
        curBread[level] = item;
        isFind = true;
      }
      return isFind;
    });
  }

  findPathByNameItem({
    menuList,
    name,
    level,
  });

  return curBread;
}
