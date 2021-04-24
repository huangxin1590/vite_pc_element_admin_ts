<script lang="ts">
import { defineComponent, h } from 'vue';
import { useRoute } from 'vue-router';
import { ElButton } from 'element-plus';
export default defineComponent({
  name: 'TableDetail',
  setup() {
    console.log('tableDetail');
    const route = useRoute();
    return () => h(ElButton, {}, route.params.id);
  }
});
</script>
