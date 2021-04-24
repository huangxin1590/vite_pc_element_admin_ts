<template>
  <div class="x-autocomplete" ref="refAutocomplete" v-cloak v-clickoutside="close">
    <input
      class="x-autocomplete__input"
      type="text"
      ref="refAutocompleteInput"
      v-bind="attrs"
      v-model="nativeValue"
      @input="fnInput"
      @focus.stop="fnFocus"
    />
    <ul
      v-show="isShowContent"
      class="x-autocomplete__content"
      :style="{
        width: contentWidth
      }"
    >
      <!-- 空数据 -->
      <li v-show="isEmpty" style="color: #ddd; text-align: center">暂无数据</li>
      <li
        v-for="item in curList"
        :key="item.value"
        :title="item.label"
        @click.stop="fnItemCLick(item)"
      >
        <!-- 父组件有设置默认slot则显示 -->
        <slot v-if="$slots.default" :item="item"></slot>
        <div v-else :item="item">{{ item[valueKey] }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, Ref } from 'vue'
import { clickOutside } from '@/directives'
import { debounce, Debounce } from '@/utils/index'
import { useAttrs } from '../_hook/index'
interface Fn {
  (): void
}

interface Air {
  airportCode: string
  cityCname: string
}

export default defineComponent({
  name: 'XAutocomplate',
  inheritAttrs: false,
  props: {
    // 选中的值
    modelValue: {
      type: [String],
      default: ''
    },
    // 所有建议项
    suggestions: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    // 输入的值为空时，显示所有建议项
    triggerOnFocus: {
      type: Boolean,
      default: false
    },
    contentWidth: {
      type: [Number, String],
      default: '100%'
    },
    debounceTime: {
      type: Number,
      default: 300
    }
  },
  directives: {
    clickoutside: clickOutside
  },
  emits: ['update:modelValue', 'focus', 'input', 'change'],
  setup(props, ctx) {
    const attrs = useAttrs()
    const refAutocomplete: Ref = ref(null)
    const refAutocompleteInput: Ref = ref(null)

    const nativeValue: Ref<string> = ref(props.modelValue)
    const isShowContent: Ref<boolean> = ref(false)
    const isEmpty: Ref<boolean> = ref(false)
    const curList: Ref<Air[]> = ref([])
    let initDebounce: Debounce

    /** * 根据输入的值，获取匹配的建议输入项 */
    const reflashContentByNativeValue = function (val: any): void {
      const reg = new RegExp('^' + val)
      let newArr: Air[] = []

      // 没有条件的时候全部显示
      if (props.triggerOnFocus && val === '') {
        newArr = props.suggestions as Air[]
      } else {
        // 如果输入的值不为空，则进行数据过滤
        ;(props.suggestions as Air[]).forEach(function (item) {
          if (reg.test(item[props.valueKey])) {
            newArr.push(item)
          }
        })
      }

      curList.value = newArr
    }

    /** * 根据 triggerOnFocus与value 是否允许刷新内容 */
    const reflashContentFromTriggerOnFocus = function () {
      if (props.triggerOnFocus || nativeValue.value) {
        reflashContentByNativeValue(nativeValue.value)
      }
    }

    /** * 根据是否有值，判断内容的显隐 */
    const fnJudgeContentShow = function (val: string) {
      if (props.triggerOnFocus || val !== '') {
        isShowContent.value = true
      } else {
        isShowContent.value = false
      }
    }

    /** * input的input事件 */
    const fnInput = function (event: any) {
      ctx.emit('input', event.target.value)
      initDebounce(() => {
        fnJudgeContentShow(nativeValue.value.trim())
      })
    }

    /** * input的focus事件 */
    const fnFocus = function () {
      const naValue: string = nativeValue.value.trim()
      fnJudgeContentShow(naValue)
      reflashContentFromTriggerOnFocus()
      ctx.emit('focus', naValue)
    }

    /** * item:选中的项 */
    const fnItemCLick = function (item: any) {
      nativeValue.value = item[props.valueKey]
      isShowContent.value = false
      ctx.emit('change', item)
    }

    /** * 数表点击是元素的其他地方之后的回调 */
    const close = function (isOutside: boolean) {
      if (isOutside) {
        isShowContent.value = false
      }
    }

    onMounted(() => {
      initDebounce = debounce(props.debounceTime)
    })

    // modelValue
    watch(
      () => props.modelValue,
      (val) => {
        nativeValue.value = val
      },
      {
        deep: true,
        immediate: true
      }
    )

    // nativeValue
    watch(
      () => nativeValue.value,
      (val) => {
        ctx.emit('update:modelValue', val)
        reflashContentFromTriggerOnFocus()
      },
      {
        deep: true,
        immediate: true
      }
    )

    // 根据curList是否有值，去显隐 空内容提示
    watch(
      () => curList.value,
      (newVal) => {
        if (newVal.length > 0) {
          isEmpty.value = false
        } else {
          isEmpty.value = true
        }
      }
    )

    return {
      attrs,
      refAutocomplete,
      refAutocompleteInput,

      fnInput,
      fnFocus,
      fnItemCLick,
      close,

      isShowContent,
      isEmpty,
      nativeValue,
      curList
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../_theme-chaik/mixins.scss';

@include componentBlockName(autocomplete) {
  position: relative;
  width: 100%;

  /* 输入框 */
  @include element(input) {
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    height: 28px;
    text-indent: 12px;
    transition: all 0.3s;
    &:focus {
      outline: none;
      @include g-borderColor();
    }
  }

  /* 下拉框内容 */
  @include element(content) {
    position: absolute;
    padding-top: 5px;
    border: 1px solid #ddd;
    min-height: 40px;
    max-height: 300px;
    width: 100%;
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 99;
    & li {
      line-height: 28px;
      height: 28px;
      text-indent: 14px;
      @include rowEllopsis();
      &:hover {
        background-color: #f3f3f3;
        cursor: pointer;
      }
    }
  }
}
</style>
