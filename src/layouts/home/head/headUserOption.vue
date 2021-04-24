<!-- @format -->

<template>
  <div class="head-user-wapper" v-clickOutside="fnOuterSideClick">
    <div class="head-user-name" @click="fnToggleUserOption">张三</div>
    <ul
      class="head-user-option"
      :class="{
        'is-show-user-option': isShowUserOption
      }"
      @click="fnHiddenUserOption"
    >
      <li class="option-item">个人中心</li>
      <li class="option-item" @click="fnOutLogin">退出登录</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { clickOutside } from '@/directives/index'

console.log(clickOutside)

export default defineComponent({
  name: 'HeadUserOption',
  directives: {
    clickOutside
  },
  setup() {
    const store = useStore()
    const isShowUserOption = ref(false)

    // 用户面板显隐
    function fnToggleUserOption() {
      isShowUserOption.value = !isShowUserOption.value
    }

    // 点击过子项的就隐藏
    function fnHiddenUserOption() {
      isShowUserOption.value = false
    }

    // 点击了用户面板之外的地方
    function fnOuterSideClick(isOuter: boolean) {
      if (isOuter) {
        isShowUserOption.value = false
      }
    }

    /** 退出登录 */
    function fnOutLogin() {
      store.dispatch('outlogin')
      // sessionStorage.clear();
      window.location.href = 'http://localhost:8081'
      // window.location.href = 'https://www.baidu.com';
    }

    return {
      isShowUserOption,

      fnHiddenUserOption,
      fnToggleUserOption,
      fnOuterSideClick,
      fnOutLogin
    }
  }
})
</script>

<style lang="scss" scoped>
.head-user-wapper {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  .head-user-name {
    cursor: pointer;
  }
  .head-user-option {
    position: absolute;
    top: 101%;
    right: -12px;
    height: 0;
    width: 100px;
    text-align: center;
    background-color: white;
    box-shadow: 0 0 5px #666;
    transition: all 0.3s;
    overflow: hidden;
    z-index: 99;
    .option-item {
      padding: 10px;
      cursor: pointer;
      &:hover {
        color: #337ab7;
      }
    }
  }
  .is-show-user-option {
    height: initial;
  }
}
</style>
