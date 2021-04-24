export default [
  {
    path: '/menu',
    name: 'Menu',
    title: '菜单',
    icon: 'home-4-line',
    componentPath: 'home',
    children: [
      {
        path: '/menu/test',
        name: 'Test',
        menuType: 'local',
        title: '动态路由测试',
        icon: 'test-tube-line',
        componentPath: '/menu/test',
        tabFlag: true,
        keepAliveFlag: true
      },
      {
        path: '/menu/noKeep',
        name: 'NoKeep',
        menuType: 'local',
        title: '不缓存',
        icon: 'test-tube-line',
        componentPath: '/menu/noKeep',
        tabFlag: true
      },
      {
        path: '/menu/noKeep1',
        name: 'NoKeep1',
        menuType: 'local',
        title: '不缓存1',
        icon: 'test-tube-line',
        componentPath: '/menu/noKeep1',
        tabFlag: true
      },
      {
        path: '/menu/fileUpload',
        name: 'FileUpload',
        menuType: 'local',
        title: '文件上传',
        icon: 'test-tube-line',
        componentPath: '/menu/fileUpload',
        keepAliveFlag: true,
        tabFlag: true
      },
      {
        path: '/menu/keyCombine',
        name: 'KeyCombine',
        menuType: 'local',
        title: '组合按键',
        icon: 'test-tube-line',
        componentPath: '/menu/keyCombine',
        keepAliveFlag: true,
        tabFlag: true
      }
    ]
  },
  {
    path: '/vab',
    name: 'vab',
    title: '组件',
    icon: 'apps-line',
    componentPath: 'home',
    children: [
      {
        path: '/vab/table',
        name: 'Table',
        menuType: 'local',
        title: '表格',
        componentPath: '/vab/table',
        tabFlag: true,
        keepAliveFlag: true
      }
    ]
  },
  {
    path: '/iframeCommon2',
    name: 'IframeCommon2',
    title: '掘金404',
    menuType: 'iframe',
    icon: 'test-tube-line',
    componentPath: '/iframeCommon',
    tabFlag: true,
    keepAliveFlag: true,
    query: {
      title: '掘金404',
      src: 'https://juejin.cn/poswt/690308307266148712624?utm_source=gold_browser_extension'
    }
  },
  {
    path: '/iframeCommon1',
    name: 'IframeCommon1',
    title: '百度',
    menuType: 'iframe',
    icon: 'test-tube-line',
    componentPath: '/iframeCommon',
    tabFlag: true,
    keepAliveFlag: true,
    query: {
      title: '百度',
      src: 'https://www.baidu.com'
    }
  },
  {
    path: '/iframeCommon3',
    name: 'IframeCommon3',
    title: '百度',
    menuType: 'iframe',
    icon: 'test-tube-line',
    componentPath: '/iframeCommon',
    tabFlag: true,
    keepAliveFlag: true,
    query: {
      title: '百度',
      src: 'https://www.baidu.com?id=123'
    }
  }
]
