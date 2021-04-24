<template>
  <div class="layout-head-wapper">
    <div class="layout-head-content">
      <!-- 箭头-左 -->
      <div class="arrow-left" v-show="isShowArrow" @click="fnArrowLeft()">
        <i class="el-icon-arrow-left"></i>
      </div>
      <!-- tags -->
      <div class="topNav-wapper" ref="topNavWapper">
        <ul class="topNav" ref="topNav">
          <li
            class="tabNav"
            v-for="(item, index) in tagsList"
            :key="item.title"
            :class="{
              'tabs-active':
                activeTag.meta.title === item.meta.title && activeTag.path === item.path
            }"
            @click="toggleTag(item)"
          >
            <span>{{ item.meta.title }}</span>
            <i class="tabNav-close-icon el-icon-close" @click.stop="fnCloseTag(item, index)"></i>
          </li>
        </ul>
      </div>
      <!-- 箭头-右 -->
      <div class="arrow-right" v-show="isShowArrow" @click="fnArrowRight()">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <!-- tags操作栏 -->
    <div class="head-ctrl">
      <el-dropdown trigger="click">
        <el-button size="mini">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="fnCloseOtherTags">关闭其他</el-dropdown-item>
            <el-dropdown-item @click="fnCloseAllTags">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Ref, ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { RouteMenu } from '@/interface/store'
export default defineComponent({
  name: 'Tags',
  setup() {
    // vuex vue-router
    const store = useStore()
    const router = useRouter()

    const activeTag = computed(() => store.getters.activeTag)
    const tagsList = computed(() => store.getters.tagsList)
    const isShowArrow = ref(false)

    const topNavWapper = ref<HTMLDivElement | null>(null)
    const topNav = ref<HTMLDivElement | null>(null)

    // 左按钮
    const fnArrowLeft = () => {
      ;(topNavWapper as Ref).value.scrollLeft -= 300
    }

    // 右按钮
    const fnArrowRight = () => {
      ;(topNavWapper as Ref).value.scrollLeft += 300
    }

    // 因为tagsList有记录（保存了相应的params，query），所以就直接跳转，不需要带参数
    const toggleTag = (menu: RouteMenu) => {
      router.push({
        path: menu.path,
        query: {
          ...menu.query
        },
        params: {
          ...menu.params
        }
      })
    }

    // 关闭标签
    const fnCloseTag = (item: object, index: number) => {
      store.dispatch('delTag', { index, tag: item })
    }

    // 关闭其他标签
    const fnCloseOtherTags = () => {
      store.dispatch('clearOtherTags')
    }

    // 关闭所有标签
    const fnCloseAllTags = () => {
      store.dispatch('clearAllTags')
    }

    // 监听激活的tag(主要目的是将激活的tag居中)
    watch(
      () => activeTag.value,
      (tag: RouteMenu) => {
        let activeIndex = 0
        tagsList.value.forEach((item: { meta: { title: string } }, index: number) => {
          if (item.meta.title === tag.title) {
            activeIndex = index
          }
        })

        nextTick(() => {
          if ((topNavWapper as Ref).value === null || (topNav as Ref).value === null) {
            return
          }
          const parent = (topNavWapper as Ref).value
          const parentScrollLeft = parent.scrollLeft
          const parentWidth = parent.clientWidth
          const childLeft =
            (topNav as Ref).value.children.length > 0
              ? ((topNav as Ref).value.children[activeIndex] as HTMLDivElement).offsetLeft
              : 0

          if (childLeft + parentScrollLeft > parentWidth / 2) {
            parent.scrollLeft = childLeft - parentWidth / 2
          } else {
            parent.scrollLeft = 0
          }
        })
      }
    )

    // 监听tags的个数（以此判断是否显示箭头图表）
    watch(
      tagsList.value,
      () => {
        nextTick(() => {
          if ((topNavWapper as Ref).value.clientWidth < (topNav as Ref).value.clientWidth) {
            isShowArrow.value = true
          } else {
            isShowArrow.value = false
          }
        })
      },
      {
        immediate: true
      }
    )

    return {
      topNavWapper,
      topNav,
      activeTag,
      tagsList,

      isShowArrow,
      toggleTag,
      fnCloseTag,
      fnCloseOtherTags,
      fnCloseAllTags,
      fnArrowLeft,
      fnArrowRight
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-head-wapper {
  display: flex;
  height: 100%;
  width: 100%;
  user-select: none;
  .layout-head-content {
    flex: 1;
    position: relative;
    display: flex;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    .arrow-left,
    .arrow-right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      cursor: pointer;
    }
    .arrow-left {
      border-right: 1px solid #ddd;
    }
    .arrow-right {
      border-left: 1px solid #ddd;
    }
    .tags-list {
      flex: 1;
    }

    .topNav-wapper {
      flex: 1;
      padding: 3px 0;
      height: 51px;
      text-align: left;
      overflow-y: hidden;
      overflow-x: scroll;
      .topNav {
        display: inline-block;
        white-space: nowrap;
        height: 28px;
        line-height: 28px;
        transition: left 0.2s ease-in;
        overflow: hidden;
      }

      .tabNav {
        position: relative;
        display: inline-block;
        margin: 0 3px;
        padding: 0 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 100%;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          padding-right: 18px;
          .tabNav-close-icon {
            display: inline-block;
          }
        }
        .tabNav-close-icon {
          position: absolute;
          display: none;
          top: 7px;
          right: 3px;
          height: 14px;
          width: 14px;
          font-size: 14px;
          &:hover {
            border-radius: 50%;
            background-color: #ddd;
          }
        }
      }
      .tabs-active {
        padding-right: 18px;
        @include g-color();
        @include g-borderColor();
        // @include g-bgColor();
        .tabNav-close-icon {
          display: inline-block;
        }
      }
    }
  }
  .head-ctrl {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    background-color: #fff;
  }
}
</style>
