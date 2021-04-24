import { RouteRecordRaw } from 'vue-router';
// 设置keepAlive为false
export function clearKeepalive(arr: RouteRecordRaw[]) {
  arr.forEach(item => {
    // 如果具有keepAliveFlag的标识，则进行false
    if (item.meta && item.meta.keepAliveFlag) {
      item.meta.keepAlive = false;
    }
    // 递归清除
    if (item.children && item.children.length > 0) {
      clearKeepalive(item.children);
    }
  });
}
