<template>
  <div style="height: 100%; overflow-y: scroll; padding: 10px">
    <el-button @click="fnClick(1)">跳转详情1</el-button>
    <el-button @click="fnClick(2)">跳转详情2</el-button>
    <el-button @click="fnClickIframe()">跳转Iframe</el-button>
    <hr />
    <div style="height: 2000px">
      <!-- form-combine / -->
      <form-combine
        ref="refFormCombine"
        buttonAlign="center"
        :formList="formList"
        :inline="true"
        @submit="fnSubmit"
      >
        <template #default="{ row }">
          <!-- qwe1 -->
          <el-input
            v-if="row.key === 'qwe1'"
            v-model="row.form[row.key]"
            suffixIcon="el-icon-date"
            placeholder="请输入"
          >
            <template #append>.com</template>
          </el-input>

          <!-- qwe15 -->
          <el-select v-if="row.key === 'qwe15'" v-model="row.form[row.key]" placeholder="请输入">
            <el-option
              v-for="item in row.item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <!-- qwe2 -->
          <el-input
            v-if="row.key === 'qwe2'"
            autosize
            type="textarea"
            placeholder="请输入"
            v-model="row.form[row.key]"
          >
          </el-input>

          <!-- qwe4 -->
          <el-date-picker
            v-if="row.key === 'qwe4'"
            v-model="row.form[row.key]"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>

          <!-- qwe6 -->
          <XAutocomplate
            v-if="row.key === 'qwe6'"
            v-model="row.form[row.key]"
            value-key="airportCode"
            :suggestions="row.item.suggestions"
          >
            <template #default="{ item }">
              {{ item.airportCode }}|
              {{ item.cityCname }}
            </template>
          </XAutocomplate>
        </template>
      </form-combine>

      <!-- table-combine / -->
      <table-combine
        border
        center
        style="width: 100%"
        :data="tableData"
        @selection-change="fnTableSelectionChange"
        @pagSizeChange="pagSizeChange"
        @pagCurrentChange="pagCurrentChange"
      >
        <el-table-column align="center" type="selection" width="55"> </el-table-column>
        <el-table-column align="center" prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column align="center" prop="address" label="地址"> </el-table-column>
      </table-combine>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import FormCombine from '@/components/common/formCombine/index.vue'
import TableCombine from '@/components/common/tableCombine/index.vue'

export default defineComponent({
  name: 'Table',
  components: {
    'form-combine': FormCombine,
    'table-combine': TableCombine
  },
  setup() {
    console.log('table')

    const router = useRouter()
    const refFormCombine = ref()
    const tableData = [
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }
    ]

    const newArr: any[] = []
    function generateMixed() {
      const array = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
      const randomNum = Math.round(Math.random() * (array.length - 1))
      return array[randomNum]
    }
    for (let i = 0; i < 10000; i++) {
      const value = `${generateMixed()}${generateMixed()}${generateMixed()}`
      newArr.push({
        airportCode: `${value}${i}`,
        cityCname: `${value}${i}`
      })
    }

    const formList = {
      qwe1: {
        value: 'q',
        formItemStyle: {
          width: '50%',
          'text-align': 'right',
          'padding-right': '100px'
        },
        formItemProps: {
          prop: 'qwe1',
          label: '姓名1',
          labelWidth: '20%',
          rules: [
            { required: true, message: '请输入字段', trigger: 'change' },
            { pattern: /^[A-Z]{3}$/, message: '请输入三位大写英文', trigger: 'change' }
          ]
        },
        formItemContentWidth: '300px'
      },
      qwe15: {
        value: 'a',
        formItemStyle: {
          width: '50%'
        },
        formItemProps: {
          prop: 'qwe15',
          label: '姓名15',
          labelWidth: '20%',
          rules: [{ required: true, message: '请输入字段', trigger: 'change' }]
        },
        formItemContentWidth: '300px',
        options: [
          { value: 'a', label: '黄金糕' },
          { value: 'b', label: '双皮奶' },
          { value: 'c', label: '蚵仔煎' },
          { value: 'd', label: '龙须面' },
          { value: 'e', label: '北京烤鸭' }
        ]
      },
      qwe2: {
        value: '',
        formItemStyle: {
          width: '50%',
          'text-align': 'right',
          'padding-right': '100px'
        },
        formItemProps: {
          prop: 'qwe2',
          label: '姓名2',
          labelWidth: '20%',
          rules: [
            { required: true, message: '请输入字段', trigger: 'change' },
            { pattern: /^[A-Z]+$/, message: '请输入大写英文', trigger: 'change' }
          ]
        },
        formItemContentWidth: '300px'
      },
      qwe4: {
        value: '',
        br: true,
        formItemStyle: {
          width: '50%',
          'text-align': 'right',
          'padding-right': '100px'
        },
        formItemProps: {
          prop: 'qwe4',
          label: '姓名3',
          labelWidth: '20%'
        },
        formItemContentWidth: '300px'
      },
      qwe6: {
        value: '',
        formItemStyle: {
          width: '50%'
        },
        formItemProps: {
          prop: 'qwe6',
          label: '姓名3',
          labelWidth: '20%'
        },
        formItemContentWidth: '300px',
        suggestions: reactive(newArr)
      }
    }

    const fnClick = function (id: any) {
      router.push({
        path: `/tableDetail/${id}`
      })
    }
    const fnClickIframe = function () {
      router.push({
        path: '/myiframe/iframeCommon'
      })
    }

    const fnSubmit = function (value: object) {
      console.log(value)
    }

    const fnTableSelectionChange = function () {
      console.log('fnTableSelectionChange')
    }
    const pagSizeChange = function () {
      console.log('pagSizeChange')
    }
    const pagCurrentChange = function () {
      console.log('pagCurrentChange')
    }

    return {
      refFormCombine,
      tableData,
      formList,
      fnClick,
      fnSubmit,
      fnClickIframe,
      pagSizeChange,
      pagCurrentChange,
      fnTableSelectionChange
    }
  }
})
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
