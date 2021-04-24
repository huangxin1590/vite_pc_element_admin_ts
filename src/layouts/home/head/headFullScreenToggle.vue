<template>
  <div class="heand-full-screen-toggle-wapper">
    <i class="el-icon-full-screen" @click="fullscreenToggel"></i>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'

interface FunctionVoid {
  (): void
}

export default {
  name: 'HeadFullScreenToggle',
  setup() {
    // esc监听全屏
    const listenfullscreenChange = (callback: FunctionVoid) => {
      const eventList = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange']

      eventList.forEach((item) => {
        window.addEventListener(item, () => callback())
      })
    }
    // 浏览器判断是否支持全屏
    // const fullscreenEnable = (): boolean => {
    //   return (
    //     window.fullScreen ||
    //     document.fullscreenEnabled ||
    //     document.mozFullscreenEnabled ||
    //     document.webkitIsFullScreen
    //   )
    // }
    // 判断浏览器是否全屏
    const isFullScreen = () => {
      return document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen
    }
    // 浏览器进入全屏
    const fullScreen = () => {
      const docEl = document.documentElement
      const fn =
        docEl.requestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.mozRequestFullScreen ||
        docEl.msRequestFullscreen
      if (typeof fn !== 'undefined' && fn) {
        fn.call(docEl)
      }
    }
    // 浏览器退出全屏
    const exitFullScreen = () => {
      const fn =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen
      if (typeof fn !== 'undefined' && fn) {
        fn.call(document)
      }
    }
    // 浏览器全屏之间的切换
    const fullscreenToggel = () => {
      if (isFullScreen()) {
        exitFullScreen()
      } else {
        fullScreen()
      }
    }

    // 监听全屏的变化
    onMounted(() => {
      listenfullscreenChange(() => {
        // console.log('listenfullscreenChange')
      })
    })

    return {
      fullscreenToggel
    }
  }
}
</script>

<style lang="scss" scoped>
.heand-full-screen-toggle-wapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-icon-full-screen {
    cursor: pointer;
  }
}
</style>
