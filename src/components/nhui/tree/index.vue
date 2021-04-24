<template>
  <div class="x-tree">
    <ul v-for="item in data" :key="item">
      <TreeItem :data="item"></TreeItem>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TreeItem from './treeItem.vue';
export default defineComponent({
  name: 'XTree',
  components: {
    TreeItem
  },
  props: {
    data: {
      type: [Object, Array],
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
@import '../_theme-chaik/mixins.scss';

@include componentBlockName(tree) {
  user-select: none;
}
</style>
