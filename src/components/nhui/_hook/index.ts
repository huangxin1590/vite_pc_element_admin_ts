import {
  getCurrentInstance,
  reactive,
  watchEffect,
  shallowRef,
  ComponentInternalInstance
} from 'vue';
interface Params {
  excludeListeners?: boolean;
  excludeKeys?: string[];
}

const remainAttrs = ['style', 'class'];

// export const useAttrs = (params: Params = {}) => {
//   const { excludeKeys = [] } = params;
//   const instance = getCurrentInstance();
//   const finallyExcludeKeys = remainAttrs.concat(excludeKeys);
//   // const attrs = reactive(instance?.attrs || {});

//   // for (const key in attrs) {
//   //   // 获取过滤后最终的attrs
//   //   if (Object.prototype.hasOwnProperty.call(attrs, key) && finallyExcludeKeys.includes(key)) {
//   //     delete attrs[key];
//   //   }
//   // }

//   console.log(instance?.attrs);
//   console.log(typeof instance?.attrs);

//   const obj = new Proxy((instance as ComponentInternalInstance).attrs, {
//     get: function(target, propKey, receiver) {
//       console.log(`getting !`);
//       return Reflect.get(target, propKey, receiver);
//     },
//     set: function(target, propKey, value, receiver) {
//       console.log(`setting!`);
//       return Reflect.set(target, propKey, value, receiver);
//     }
//   });

//   return {};
// };

function entries<T>(obj: any): [string, T][] {
  return Object.keys(obj).map((key: string) => [key, obj[key]]);
}
export const useAttrs = (params: Params = {}) => {
  const { excludeKeys = [] } = params;
  const instance = getCurrentInstance();
  const attrs = shallowRef({});
  const allExcludeKeys = excludeKeys.concat(remainAttrs);

  // Since attrs are not reactive, make it reactive instead of doing in `onUpdated` hook for better performance
  if (instance?.attrs) {
    instance.attrs = reactive((instance as ComponentInternalInstance)?.attrs);
  }

  watchEffect(() => {
    const res = entries(instance?.attrs).reduce((acm, [key, val]) => {
      if (!allExcludeKeys.includes(key)) {
        acm[key] = val;
      }

      return acm;
    }, {});

    attrs.value = res;
  });

  return attrs;
};
