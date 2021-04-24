import layout from '@/layouts/home/index.vue';
export default [
  {
    path: '/',
    name: 'Layout',
    component: layout,
    redirect: '/home',
    meta: { title: '首页', icon: 'home-4-line' },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { path: '/home', title: '首页' },
        component: () =>
          import(/* webpackChunkName: "page" */ '@/views/home.vue')
      },
      // 采用另外一种方式跳转，主要是为了route的path之间有区别，才可以进行多个tag添加
      // path: `/tableDetail/${id}`
      {
        path: 'tableDetail/:id',
        name: 'TableDetail',
        meta: {
          path: '/TableDetail',
          tabFlag: true,
          title: 'table详情',
          parentNameLink: 'Table'
        },
        component: () =>
          import(/* webpackChunkName: "page" */ '@/views/vab/tableDetail.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'login' },
    component: () =>
      import(/* webpackChunkName: "page" */ '@/layouts/login/index.vue')
  }
];
