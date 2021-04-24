<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in bread" :key="item">
      {{ item?.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, watch, ref, Ref } from 'vue'
import { useStore } from 'vuex'
import { findPathByName } from '@/utils/router'

export default defineComponent({
  name: 'HeadBread',
  setup() {
    const store = useStore()
    const bread: Ref<object[]> = ref([])

    // const fnBreadcrumbItemClick = function(item: object) {};

    let curBread: object[] = []

    watch(
      () => store.getters.activeTag,
      (tag) => {
        /*
          tag为当前激活的选项，menu的层级对应面包屑，分为两类：
          1-动态路由（自然存在嵌套关系）
          2-写死的路由（少了嵌套关系，所以需要在动态路由中找到对应的嵌套关系，parentNameLink链接的是动态路由的name）
        */
        const parentNameLink = tag?.meta?.parentNameLink
        const name = parentNameLink || tag.name
        curBread = findPathByName({
          menuList: store.getters.menu,
          name
        })

        if (parentNameLink) {
          curBread.push(tag.meta)
        }

        bread.value = curBread
        curBread = []
      },
      {
        immediate: true
      }
    )

    return {
      bread
    }
  }
})
</script>

<style lang="scss" scoped></style>
