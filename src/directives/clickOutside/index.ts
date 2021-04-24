import { ObjectDirective, DirectiveBinding } from 'vue';

const nodeList = new Map();

/** 点击页面的时候就会触发该函数，并且执行里面添加的代码*/
document.addEventListener(
  'click',
  function(e: Event) {
    for (const { documentHandler } of nodeList.values()) {
      documentHandler(e);
    }
  },
  false
);

/** 创建文档事件 */
function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding) {
  return function(e: Event) {
    let isOutside = true;
    if (el && el.contains(e.target as Node)) {
      isOutside = false;
    }
    binding.value(isOutside);
  };
}

/** 点击元素之外的地方触发 */
const clickOutside: ObjectDirective = {
  beforeMount: function(el: HTMLElement, binding: DirectiveBinding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    });
  },
  unmounted(el: HTMLElement) {
    nodeList.delete(el);
  }
};

export default clickOutside;
