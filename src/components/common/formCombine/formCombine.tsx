import { defineComponent, ref, PropType, Ref, h } from 'vue';
import { ElInput } from 'element-plus';
import './index.scss';

interface FormItem {
  elType: string;
  value: string;
  prop: string;
  [prop: string]: any;
}
interface FormData {
  [prop: string]: any;
}

export default defineComponent({
  name: 'FormCombine',
  props: {
    formList: {
      type: [] as PropType<FormItem[]>,
      default: () => []
    },
    inline: {
      type: Boolean,
      default: true
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
    props.formList.forEach(item => {
      formData.value[item.formItemProps.prop] = item.value;
      fromRules.value[item.formItemProps.prop] = item.rules || [];
    });

    /* 重置 */
    const fnResetForm = function() {
      Object.keys(formData.value).forEach(prop => {
        formData.value[prop] = '';
      });
      refForm.value.clearValidate();
    };

    /* 提交 */
    const fnSubmit = function() {
      refForm.value.validate((valid: boolean) => {
        if (valid) {
          context.emit('submit', formData.value);
        } else {
          return false;
        }
      });
    };

    /* 输入 */
    const fnInput = function(item: FormItem, val: string) {
      // console.log(item);
      // console.log(val);
      context.emit('change', formData.value);
    };

    return {
      refForm,
      formData,
      fromRules,

      fnResetForm,
      fnSubmit,
      fnInput
    };
  },
  data() {
    return {
      isShowHeaderSearch: true,
      label: ''
    };
  },
  render(ctx: any) {
    const formPros = {
      rules: ctx.fromRules,
      model: ctx.formData,
      inline: ctx.inline,
      'label-width': ctx.labelWidth,
      style: {
        'text-align': ctx.formAlign
      }
    };

    const formItem = ctx.formList.map((item: FormItem) => {
      const formItemPros = {
        ...item.formItemProps,
        style: {
          width: item.formItemWidth
        }
      };

      const el = ElInput;
      const formItemEL = h(
        el,
        {
          ...item.elProps,
          modelValue: ctx.formData[item.formItemProps.prop],
          onChange: () => {
            ctx.fnInput(item, ctx.formData[item.formItemProps.prop]);
          }
        },
        123
      );

      // <component
      //   is={item.elType}
      //   v-model={ctx.formData[item.formItemProps.prop]}
      //   {...item.elProps}
      //   onChange={ctx.fnInput(item, ctx.formData[item.formItemProps.prop])}>
      //   <slot v-if={item.formItemProps.prop} name={item.formItemProps.prop} item={item}></slot>
      // </component>
      return <el-form-item {...formItemPros}>{formItemEL}</el-form-item>;
    });

    return (
      <div>
        <el-form ref="refForm" {...formPros}>
          {formItem}
        </el-form>
        <div style="text-align:ctx.buttonAlign">
          <el-button type="primary" onClick={ctx.fnSubmit}>
            提交
          </el-button>
          <el-button type="primary" onClick={ctx.fnResetForm}>
            重置
          </el-button>
        </div>
      </div>
    );
  }
});
