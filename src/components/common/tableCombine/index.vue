<template>
  <el-table
    ref="tableCombine"
    style="width: 100%"
    tooltip-effect="light"
    header-cell-class-name="table-combine-table"
    v-loading="loading"
    :data="data"
    :row-style="{ height: '40px' }"
    :cell-style="{ padding: '0 0' }"
    v-bind="$attrs"
    v-on="$attrs"
  >
    <slot></slot>
  </el-table>

  <!-- 分页/ -->
  <div
    class="table_pagination"
    :style="{
      'text-align': page.direction
    }"
  >
    <el-pagination
      ref="tableCombinePagination"
      layout="total, sizes, prev, pager, next, jumper"
      background
      prev-text="上一页"
      next-text="下一页"
      :current-page="page.currentPage"
      :page-sizes="page.sizes"
      :page-size="page.size"
      :total="page.total"
      @size-change="$attrs.onPagSizeChange || function () {}"
      @current-change="$attrs.onPagCurrentChange || function () {}"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TableCombine',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // table的数据
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    // 翻页
    page: {
      type: Object,
      default() {
        return {
          currentPage: 1,
          sizes: [10, 20, 30, 40],
          size: 10,
          total: 100,
          direction: 'right'
        };
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.el-table {
  >>> .table-combine-table {
    color: white;
    @include g-bgColor();
    &:nth-child(1) {
      background-color: white;
    }
  }
}

.table_pagination {
  padding-top: 5px;
}
</style>
