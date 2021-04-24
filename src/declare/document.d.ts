declare interface Document {
  // 浏览器是否全屏
  isFullScreen: any
  mozIsFullScreen: any
  webkitIsFullScreen: any
  // 进入全屏
  mozFullscreenEnabled: any
  fullScreen: any
  mozFullScreen: any
  webkitIsFullScreen: any
  // 退出全屏
  exitFullScreen: any
  webkitCancelFullScreen: any
  mozCancelFullScreen: any
  webkitExitFullscreen: any
  msExitFullscreen: any
}

declare interface HTMLElement {
  requestFullScreen: any
  webkitRequestFullScreen: any
  mozRequestFullScreen: any
  msRequestFullscreen: any
}
