<template>
  <el-scrollbar class="scrollbar-wrapper">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="activeMenu"
      :collapse="collapse"
      :unique-opened="true"
    >
      <MenuSub :list="menu"></MenuSub>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import MenuSub from './menuSub.vue';

export default defineComponent({
  name: 'Menu',
  components: { MenuSub },
  setup() {
    const store = useStore();

    const menu = computed(() => store.getters.menu);
    const collapse = computed(() => store.getters.collapse);
    const activeTag = computed(() => store.getters.activeTag);

    const activeMenu = computed(() => {
      return activeTag.value.path + activeTag.value?.meta?.title || '';
    });

    return {
      menu,
      collapse,
      activeTag,

      activeMenu
    };
  }
});
</script>

<style lang="scss" scoped>
.scrollbar-wrapper {
  height: 100%;
  user-select: none;
  >>> .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.el-menu-vertical-demo {
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  >>> .el-menu-item,
  >>> .el-submenu__title {
    text-align: left;
  }

  >>> .el-menu-item.is-active {
    background-color: #ecf5ff;
    @include g-color();
  }
}
</style>
