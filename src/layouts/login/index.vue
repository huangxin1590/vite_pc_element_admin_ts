<template>
  <div>
    <el-button>按钮</el-button>
  </div>
</template>

<script lang="ts">
import { getData } from '@/api/login/index'
export default {
  name: 'Login',
  created() {
    getData().then((res: any) => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped></style>
