export default {
  path: '/:pathMatch(.*)*',
  name: 'error404',
  meta: {
    path: '/error/error404',
    title: '404',
    icon: 'error-warning-line'
  },
  component: () =>
    import(/* webpackChunkName: "page" */ '@/layouts/error/error404.vue')
};
