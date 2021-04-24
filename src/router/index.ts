import { createRouter, createWebHashHistory } from 'vue-router';

import pages from './modules/pages';
import error from './modules/error';

// 需要注意合并的舒徐 views要在第一个位置
export const constantRoutes = [...pages, error];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 1000 };
  },
});

export default router;
