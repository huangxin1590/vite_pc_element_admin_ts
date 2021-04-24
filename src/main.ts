import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import App from './App.vue'
import store from './store'

// 初始化所有样式为项目需求的样式（浏览器，第三方的样式）
import '@/styles/reset/index.scss'
import Xui from './components/nhui/index'

import '@/router/permission'
import router from './router'

createApp(App)
  .use(store)
  .use(ElementPlus, { size: 'small', locale })
  .use(Xui)
  .use(router)
  .mount('#app')
