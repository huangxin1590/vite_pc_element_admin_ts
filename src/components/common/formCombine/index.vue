<template>
  <el-form
    ref="refForm"
    class="from-combine"
    :rules="fromRules"
    :model="formData"
    :inline="inline"
    :label-width="labelWidth"
    :style="{
      'text-align': formAlign
    }"
  >
    <template v-for="(item, index) in formList" :key="index">
      <br v-if="item.br" />
      <el-form-item
        class="from-combine-item"
        v-bind="item.formItemProps"
        :style="item.formItemStyle"
      >
        <slot :row="{ item, form: formData, key: item.formItemProps.prop }"></slot>
      </el-form-item>
    </template>
  </el-form>
  <div
    :style="{
      'text-align': buttonAlign
    }"
  >
    <el-button type="primary" @click="fnSubmit">提交</el-button>
    <el-button type="primary" @click="fnResetForm">重置</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, Ref, onMounted } from 'vue';
interface FormList {
  [props: string]: FormItem;
}
interface FormItem {
  value: string;
  [prop: string]: any;
}
interface FormData {
  [prop: string]: any;
}

export default defineComponent({
  name: 'FormCombine',
  props: {
    // formList: {
    //   type: [] as PropType<FormList>,
    //   default: () => {
    //     return [];
    //   }
    // },
    formList: {
      type: Object as PropType<FormList>,
      default: () => {
        return {};
      }
    },
    inline: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    formAlign: {
      type: String,
      default: 'left'
    },
    buttonAlign: {
      type: String,
      default: 'center'
    }
  },
  setup(props, context) {
    const refForm = ref();
    const formData: Ref<FormData> = ref({});
    const fromRules: Ref = ref({});

    /* 初始化formData，fromRules的值 */
    Object.keys(props.formList).forEach((key) => {
      const item = props.formList[key];
      formData.value[key] = item.value;
      fromRules.value[key] = item.rules || [];
    });

    /* 清除所有值 */
    const resetFormValue = function () {
      return new Promise((resolve) => {
        Object.keys(formData.value).forEach((prop) => {
          formData.value[prop] = '';
        });
        resolve(true);
      });
    };

    /* 
      重置表单 
      clearValidate：清除校验
    */
    const fnResetForm = async function () {
      const res = await resetFormValue();
      res && refForm.value.clearValidate();
    };

    /* 提交 */
    const fnSubmit = function () {
      refForm.value.validate((valid: boolean) => {
        if (valid) {
          context.emit('submit', true, formData.value);
        } else {
          context.emit('submit', false);
          return false;
        }
      });
    };

    // 从外部设置form的
    const setForm = function (key: string, value: any) {
      formData.value[key] = value;
    };

    // 处理form-item的样式
    onMounted(() => {
      const formListKey = Object.keys(props.formList);
      const refFormItemEl = Array.from(refForm.value.$el.children).filter((item: any) => {
        return item.classList.contains('el-form-item');
      });
      refFormItemEl.map((parentNode: any, parentIndex: number) => {
        const label = parentNode.getElementsByClassName('el-form-item__label')[0];
        const content = parentNode.getElementsByClassName('el-form-item__content')[0];
        const parentWidth = parentNode.clientWidth;
        const firstChildWidth = label.clientWidth;
        const prop = formListKey[parentIndex];

        // 设置content的宽度
        let contentWidth = `${parentWidth - firstChildWidth - 1}px`;
        if (props.formList[prop].formItemContentWidth) {
          contentWidth = props.formList[prop].formItemContentWidth;
        }

        content.style.width = contentWidth;
      });
    });

    return {
      refForm,
      formData,
      fromRules,

      fnResetForm,
      fnSubmit,
      setForm
    };
  }
});
</script>

<style lang="scss" scoped>
.el-form--inline .el-form-item {
  margin-right: 0px;
}
.from-combine {
  width: 100%;
  >>> .el-form-item {
    text-align: left;
    .el-form-item__content {
      width: 300px;
      .el-date-editor.el-input {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
