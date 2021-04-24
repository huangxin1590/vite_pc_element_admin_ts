<template>
  <div class="head-wapper">
    <div class="logo">
      <img src="../../../assets/logo.png" alt="" />
    </div>

    <!-- s 功能模块 -->
    <div class="ctrl">
      <i class="el-icon-s-unfold toggle-icon" @click="toggle"></i>
      <!-- 面包屑 /-->
      <HeadBread></HeadBread>
    </div>
    <div class="content">
      <!-- 全屏 /-->
      <HeadFullScreenToggle></HeadFullScreenToggle>
      <!-- 主题 /-->
      <HeadTheme></HeadTheme>
    </div>
    <!-- e 功能模块 -->

    <!-- s 用户模块 -->
    <div class="user">
      <HeadUserOption></HeadUserOption>
    </div>
    <!-- e 用户模块 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from 'vuex'
import HeadBread from './headBread.vue'
import HeadTheme from './headTheme.vue'
import HeadFullScreenToggle from './headFullScreenToggle.vue'
import HeadUserOption from './headUserOption.vue'

export default defineComponent({
  name: 'Head',
  components: {
    HeadBread,
    HeadTheme,
    HeadFullScreenToggle,
    HeadUserOption
  },
  setup() {
    const store = useStore()
    const collapse = computed(() => store.getters.collapse)

    const toggle = () => {
      store.commit('SET_COLLAPSE', !collapse.value)
    }
    return {
      collapse,
      toggle
    }
  }
})
</script>

<style lang="scss" scoped>
.head-wapper {
  height: 100%;
  display: flex;
  font-size: 16px;
  user-select: none;
  .logo {
    width: 200px;
    text-align: center;
    background-color: #fff;
    img {
      height: 100%;
    }
  }
  .ctrl {
    display: flex;
    align-items: center;
    justify-content: center;
    .toggle-icon {
      margin-right: 10px;
      font-size: 24px;
      cursor: pointer;
      @include g-color();
    }
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    & > * {
      padding: 0 5px;
    }
  }
  .user {
    padding-right: 12px;
    padding-left: 8px;
  }
}
</style>
