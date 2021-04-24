<template>
  <el-container style="height: 100%">
    <el-header class="head-bg-img">
      <Head />
    </el-header>

    <el-container style="overflow: hidden">
      <!-- el-aside的宽度是一个假值，只是为了不让出现默认300 /-->
      <el-aside width="200">
        <Menu />
      </el-aside>
      <el-main>
        <div class="layout-tags-wapper">
          <Tags />
        </div>
        <div class="layout-main bg-img">
          <div class="layout-main-inner">
            <!-- 对iframe进行tab页的切换 /-->
            <div v-show="isIframeLayout" style="height: 100%">
              <ViewsIframe />
            </div>
            <!-- 缓存keepArray,每一次删除都是需要变成不一样的array栈地址才能起效 /-->
            <div v-show="!isIframeLayout" style="height: 100%">
              <router-view v-slot="{ Component }">
                <keep-alive :include="keepArray">
                  <component :is="Component"></component>
                </keep-alive>
              </router-view>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

import ViewsIframe from '@/layouts/viewsIframe/index.vue'
import Head from './head/index.vue'
import Menu from './menu/index.vue'
import Tags from './tags/index.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Head,
    Menu,
    Tags,
    ViewsIframe
  },
  data() {
    return {
      isIframeLayout: false
    }
  },
  computed: {
    ...mapGetters(['collapse', 'keepArray'])
  },
  watch: {
    '$route.fullPath': {
      immediate: true,
      handler(val) {
        if (val && val.indexOf('iframe') !== -1) {
          this.isIframeLayout = true
        } else {
          this.isIframeLayout = false
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  border: 1px solid #ddd;
  height: 50px;
  color: #333;
  font-size: 12px;
}

.el-aside {
  // border-right: 1px solid #ddd;
  height: 100%;
  color: #333;
  >>> .el-menu {
    border-right: none;
  }
}

.el-main {
  display: flex;
  flex-direction: column;
  padding: 0;
  .layout-tags-wapper {
    height: 34px;
  }
  .layout-main {
    flex: 1;
    padding: 7px;
    background-color: #efefef;
    overflow: hidden;
    .layout-main-inner {
      height: 100%;
      background-color: white;
      overflow: hidden;
    }
  }
}

#theme-custom .head-bg-img {
  background-color: white;
}

#theme-custom .bg-img {
  text-align: left;
}
</style>
