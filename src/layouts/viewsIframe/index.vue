<template>
  <div class="iframe-wapper">
    <div
      style="height: 100%"
      v-for="iframe in iframeList"
      :key="iframe.fullPath"
      v-show="iframe.fullPath === activeIframeFullPath"
    >
      <iframe class="iframe-inner" :src="iframe.query.src"></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
// import { MenuType } from '@/interface/store'

interface IframeList {
  fullPath: string
  path: string
  params?: object
  query?: object
}

export default defineComponent({
  name: 'ViewsIframe',
  setup() {
    const store = useStore()
    const route = useRoute()

    // tag中iframe列表
    const iframeList: Ref = ref([])
    let iframeFullPathList: string[] = []

    // 激活iframe的路径
    const activeIframeFullPath = ref('')

    const fnGetIframeList = (to: any, from?: any, next?: any) => {
      const tagsList = computed(() => store.getters.tagsList)
      const activeTag = computed(() => store.getters.activeTag)
      const fullPath = activeTag.value.fullPath || ''

      // 设置激活的iframe
      if (to.meta.menuType === 'iframe') {
        ;(activeIframeFullPath as Ref).value = fullPath
      }

      // 需要一份已选择的iframe列表
      let newArr: string[] = []
      newArr = [...new Set([...iframeFullPathList, fullPath])]
      tagsList.value.forEach((item: any) => {
        if (newArr.includes(item.fullPath)) {
          newArr.push(item.fullPath)
        }
      })
      iframeFullPathList = newArr

      // 重新生成具有iframe的列表
      iframeList.value = tagsList.value.filter((item: any) => {
        return (
          item.query &&
          item.query.src &&
          item.meta.menuType === 'iframe' &&
          iframeFullPathList.includes(item.fullPath)
        )
      })

      next && next()
    }

    // 初始化的时候, 判断路径否是是iframe，
    // 如果是则调用，否则给一个空数组  "/iframeCommon2"
    const reg = /^\/iframe/g
    if (reg.test(route.path)) {
      fnGetIframeList(route)
    }

    // 路由更新时候调用
    onBeforeRouteUpdate(fnGetIframeList)

    return {
      iframeList,
      activeIframeFullPath
    }
  }
})
</script>

<style lang="scss" scoped>
.iframe-wapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .iframe-inner {
    border: none;
    height: 100%;
    width: 100%;
  }
}
</style>
