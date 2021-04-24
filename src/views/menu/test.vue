<template>
  <div style="height: 100%; overflow-y: scroll">
    test
    <div style="width:300px;">
      <XAutocomplate
        value-key="airportCode"
        v-model="autoVal"
        class="test"
        :placeholder="attrPlaceholder"
        :suggestions="allList"
        @input="fnInputAuto"
      >
        <template v-slot:default="{ item }">
          {{ item.airportCode }}|
          {{ item.cityCname }}
        </template>
      </XAutocomplate>
    </div>

    <!-- tree -->
    <XTree :data="treeData"></XTree>

    <!-- 按钮 -->
    <div style="height: 2000px">
      <el-button type="primary">123</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-input v-model="attrPlaceholder"></el-input>
      <el-radio v-model="radio" label="1">备选项</el-radio>
      <el-checkbox v-model="checked">备选项</el-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue';
import test from '@/mock/test.json';
export default defineComponent({
  name: 'Test',
  data() {
    return {
      radio: '1',
      checked: true,
      treeData: [
        {
          name: 'Web秀',
          children: [
            {
              name: 'web前端',
              children: [
                {
                  name: 'CSS'
                },
                {
                  name: 'JavaScript'
                },
                {
                  name: 'Vue'
                },
                {
                  name: '小程序'
                },
                {
                  name: 'Three.js'
                }
              ]
            },
            {
              name: '服务器'
            },
            {
              name: '工具类'
            }
          ]
        },
        {
          name: '今日头条',
          children: [
            {
              name: '图片'
            },
            {
              name: '新闻',
              children: []
            }
          ]
        },
        {
          name: 'Angular'
        }
      ]
    };
  },
  setup() {
    const autoVal: Ref = ref('');
    const allList: Ref<object[]> = ref([]);

    const newArr: any[] = [];
    function generateMixed() {
      const array = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
      const randomNum = Math.round(Math.random() * (array.length - 1));
      return array[randomNum];
    }
    for (let i = 0; i < 10000; i++) {
      const value = `${generateMixed()}${generateMixed()}${generateMixed()}`;
      newArr.push({
        airportCode: `${value}${i}`,
        cityCname: `${value}${i}`
      });
    }

    setTimeout(() => {
      allList.value = reactive(newArr);
    }, 1000);

    const fnInputAuto = (val: string) => {
      autoVal.value = val.toUpperCase();
    };
    const fnChange = (val: any) => {
      console.log(val);
    };
    const fnFocusAuto = (val: any) => {
      console.log(val);
    };

    const attrPlaceholder = ref('');

    return {
      autoVal,
      allList,
      attrPlaceholder,

      fnFocusAuto,
      fnInputAuto,
      fnChange
    };
  },
  created() {
    console.log('test');
  }
});
</script>
