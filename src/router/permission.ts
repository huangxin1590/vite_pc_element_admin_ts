import router from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { utilSetRouterByMenu } from '@/utils/router'
// import { getSession } from '@/utils/storage';
NProgress.configure({ showSpinner: false })

// 本地是否保存有menu，如果有就直接使用,否则请求数据获取
if (store.getters.menu.length > 0) {
  utilSetRouterByMenu(store.getters.menu)
} else {
  store.dispatch('getMenu').then(() => {
    store.commit('SET_MENU', store.getters.menu)
    utilSetRouterByMenu(store.getters.menu)
  })
}

// 跳转前
router.beforeEach(async (to: any, from: any, next: any) => {
  NProgress.start()

  // 具有缓存标识和tag标识才添加到tags列表上
  store.dispatch('addTag', {
    fullPath: to.fullPath,
    path: to.path,
    name: to.name,
    meta: {
      ...to.meta,
      title: to.query.title || to.meta.title
    },
    params: to.params,
    query: to.query
  })
  next()
})

// 跳转后
router.afterEach((to: any) => {
  NProgress.done()

  // 设置文档title
  let title = 'igroup'
  if (to.meta && to.meta.title) {
    title = to.meta.title
  }
  document.title = title
})
