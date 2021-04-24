<template>
  <template v-for="item in list" :key="item.path + item.title">
    <!-- 折叠 -->
    <el-submenu v-if="item.children && item.children.length > 0" :index="item.path + item.title">
      <template v-slot:title>
        <!-- <i :class="'el-icon-menu'"></i> -->
        <span>{{ item.title }}</span>
      </template>
      <MenuSub :list="item.children"></MenuSub>
    </el-submenu>

    <!-- 不折叠 -->
    <el-menu-item v-else :index="item.path + item.title" @click="fnRouterPush(item)">
      <!-- <i :class="'el-icon-menu'"></i> -->
      <template v-slot:title>
        <span>{{ item.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteMenu } from '@/interface/store'
export default defineComponent({
  name: 'MenuSub',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 路由跳转
    fnRouterPush(menu: RouteMenu) {
      this.$router.push({
        path: menu.path,
        query: {
          ...menu.query
        },
        params: {
          ...menu.params
        }
      })
    }
  }
})
</script>
