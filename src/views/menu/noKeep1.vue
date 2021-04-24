<template>
  <div style="height: 100%; overflow-y: scroll">
    NoKeep1
    <div style="height: 2000px">
      <Sku></Sku>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sku from '@/components/functionalComponent/sku/index.vue';

export default defineComponent({
  name: 'NoKeep1',
  components: {
    Sku
  },
  setup() {
    console.log('NoKeep1');
  }
});
</script>
