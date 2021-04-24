<template>
  <div v-for="(item, index) in specList" :key="index">
    <div class="title">{{ item.title }}</div>
    <div class="spec">
      <div
        class="spec-item"
        v-for="(subItem, subIndex) in item.list"
        :key="subItem.name + subIndex"
      >
        <span
          @click="changeSpec(item.title, subItem.name, subItem.able)"
          :class="[
            selectSpec[item.title] === subItem.name ? 'active' : '',
            subItem.able ? '' : 'disabled'
          ]"
          >{{ subItem.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
interface SkuList {
  [index: number]: Sku;
}
interface List {
  name: string;
  able: boolean;
}
interface SpecList {
  title: string;
  list: List[];
}
interface Sku {
  id: number;
  specs: string[];
}
type MatrixRow = number[];

export default defineComponent({
  name: 'Sku',
  setup() {
    const originSpecList = [
      { title: '颜色', list: ['红色', '紫色', '白色', '黑色'] },
      { title: '套餐', list: ['套餐一', '套餐二', '套餐三', '套餐四'] },
      { title: '内存', list: ['64G', '128G', '256G'] }
    ];

    const skuList = [
      // { id: 1608188117177, specs: ["红色", "套餐一", "64G"] },
      { id: 1608188117178, specs: ['红色', '套餐一', '128G'] },
      { id: 1608188117179, specs: ['红色', '套餐一', '256G'] },
      { id: 1608188117180, specs: ['红色', '套餐二', '64G'] },
      { id: 1608188117181, specs: ['红色', '套餐二', '128G'] },
      { id: 1608188117182, specs: ['红色', '套餐二', '256G'] },
      { id: 1608188117183, specs: ['红色', '套餐三', '64G'] },
      { id: 1608188117184, specs: ['红色', '套餐三', '128G'] },
      { id: 1608188117185, specs: ['红色', '套餐三', '256G'] },
      // { id: 1608188117186, specs: ["红色", "套餐四", "64G"] },
      // { id: 1608188117187, specs: ["红色", "套餐四", "128G"] },
      // { id: 1608188117188, specs: ["红色", "套餐四", "256G"] },
      // { id: 1608188117189, specs: ["紫色", "套餐一", "64G"] },
      // { id: 1608188117190, specs: ["紫色", "套餐一", "128G"] },
      // { id: 1608188117191, specs: ["紫色", "套餐一", "256G"] },
      { id: 1608188117192, specs: ['紫色', '套餐二', '64G'] },
      { id: 1608188117193, specs: ['紫色', '套餐二', '128G'] },
      { id: 1608188117194, specs: ['紫色', '套餐二', '256G'] },
      { id: 1608188117195, specs: ['紫色', '套餐三', '64G'] },
      { id: 1608188117196, specs: ['紫色', '套餐三', '128G'] },
      { id: 1608188117197, specs: ['紫色', '套餐三', '256G'] },
      { id: 1608188117198, specs: ['紫色', '套餐四', '64G'] },
      { id: 1608188117199, specs: ['紫色', '套餐四', '128G'] },
      { id: 1608188117200, specs: ['紫色', '套餐四', '256G'] },
      { id: 1608188117201, specs: ['白色', '套餐一', '64G'] },
      { id: 1608188117202, specs: ['白色', '套餐一', '128G'] },
      { id: 1608188117203, specs: ['白色', '套餐一', '256G'] },
      { id: 1608188117204, specs: ['白色', '套餐二', '64G'] },
      // { id: 1608188117205, specs: ["白色", "套餐二", "128G"] },
      // { id: 1608188117206, specs: ["白色", "套餐二", "256G"] },
      // { id: 1608188117207, specs: ["白色", "套餐三", "64G"] },
      // { id: 1608188117208, specs: ["白色", "套餐三", "128G"] },
      // { id: 1608188117209, specs: ["白色", "套餐三", "256G"] },
      // { id: 1608188117210, specs: ["白色", "套餐四", "64G"] },
      { id: 1608188117211, specs: ['白色', '套餐四', '128G'] },
      { id: 1608188117212, specs: ['白色', '套餐四', '256G'] },
      { id: 1608188117213, specs: ['黑色', '套餐一', '64G'] },
      { id: 1608188117214, specs: ['黑色', '套餐一', '128G'] },
      { id: 1608188117215, specs: ['黑色', '套餐一', '256G'] },
      { id: 1608188117216, specs: ['黑色', '套餐二', '64G'] },
      // { id: 1608188117217, specs: ["黑色", "套餐二", "128G"] },
      // { id: 1608188117218, specs: ["黑色", "套餐二", "256G"] },
      // { id: 1608188117219, specs: ["黑色", "套餐三", "64G"] },
      // { id: 1608188117220, specs: ["黑色", "套餐三", "128G"] },
      // { id: 1608188117221, specs: ["黑色", "套餐三", "256G"] },
      // { id: 1608188117222, specs: ["黑色", "套餐四", "64G"] },
      { id: 1608188117223, specs: ['黑色', '套餐四', '128G'] },
      { id: 1608188117224, specs: ['黑色', '套餐四', '256G'] }
    ];

    // 选择数据的对象 将已选的数据放在这个对象里面记录下来  用对象的好处在下面深拷贝处就能体验到了
    const selectSpec = reactive({});

    // 计算得出领接矩阵
    const computedPoint = function() {
      // 获取所有顶点
      const matrixPoints: string[] = originSpecList.reduce((pre: string[], cur) => {
        return [...pre, ...cur.list];
      }, []);

      // 矩阵对象关系
      const matrixRelationMap = {};
      // 未作JSON解析错误处理
      const deepSkuList = JSON.parse(JSON.stringify(skuList));
      matrixPoints.forEach(key => {
        let includePointList: string[] = [];
        deepSkuList.forEach((item: Sku) => {
          if (item.specs.includes(key)) {
            includePointList.push(...item.specs);
          }
        });

        includePointList = [...new Set([...includePointList])];
        includePointList = includePointList.filter(item => {
          return key !== item;
        });

        matrixRelationMap[key] = includePointList;
      });

      // 合成矩阵
      const matrixList: MatrixRow[] = [];
      matrixPoints.forEach(key => {
        const matrixRow: MatrixRow = [];
        matrixPoints.forEach((subKey, subIndex) => {
          if (matrixRelationMap[key] && matrixRelationMap[key].includes(subKey)) {
            matrixRow[subIndex] = 1;
          } else {
            matrixRow[subIndex] = 0;
          }
        });

        matrixList.push(matrixRow);
      });

      return {
        matrixList,
        matrixPoints
      };
    };
    const { matrixList, matrixPoints } = computedPoint();

    // 获得页面展示的数据，（title + able）
    let specList: SpecList[] = originSpecList.map(item => {
      return {
        title: item.title,
        list: item.list.map((subItem: string) => {
          return {
            name: subItem,
            able: true
          };
        })
      };
    });
    specList = reactive(specList);

    // 点击元素，进行active
    const changeSpec = function(key: string, name: string, able: boolean) {
      // 禁用状态，不允许点击
      if (!able) return;

      // 元素显隐切换
      selectSpec[key] === name ? (selectSpec[key] = '') : (selectSpec[key] = name);

      // activePoints 激活的类型
      const activePoints = Object.values(selectSpec).filter((key: any) => key.length);

      // filterActiveMatrix 激活选项对应的矩阵项
      const filterActiveMatrix: MatrixRow[] = [];
      activePoints.forEach(name => {
        const findIndex = matrixPoints.indexOf(name as string);
        if (findIndex !== -1) {
          filterActiveMatrix.push([...matrixList[findIndex]]);
        }
      });

      // 合成选项矩阵，主要用于选项的显隐
      let initMatrixRow: MatrixRow = filterActiveMatrix[0];
      if (!initMatrixRow) {
        initMatrixRow = new Array(matrixPoints.length).fill(1);
      }

      // 得到最终的交集矩阵行
      const resultRowMatrix = filterActiveMatrix.reduce((pre, item, index) => {
        if (index > 0) {
          for (let i = 0; i < pre.length; i++) {
            pre[i] = pre[i] & item[i];
          }
        }

        return pre;
      }, initMatrixRow);

      //对页面进行更新
      specList.forEach(item => {
        item.list.forEach((subItem: any) => {
          // 获取name对应的状态码
          const index = matrixPoints.indexOf(subItem.name);
          let statusNum = resultRowMatrix[index];

          // 排除已经选择的项
          let excludeTitle = '';
          if (item.title in selectSpec && selectSpec[item.title]) {
            excludeTitle = selectSpec[item.title];
          }

          if (subItem.name === excludeTitle) {
            statusNum = 1;
          }

          subItem.able = statusNum === 1;
        });
      });
    };

    return {
      specList,
      skuList,
      matrixList,
      selectSpec,

      changeSpec
    };
  }
});
</script>

<style>
.title {
  margin: 10px;
}

.spec-item {
  display: inline-block;
  margin-right: 10px;
  user-select: none;
}
.spec-item span {
  border: 1px solid #eee;
  cursor: pointer;
  padding: 5px 10px;
}
.spec-item .active {
  border: 1px solid red;
  background-color: red;
  color: #fff;
}
.spec-item .disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
</style>
