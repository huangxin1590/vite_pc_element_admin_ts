<template>
  <li class="x-tree__item">
    <span class="x-tree__title" @click="toggle">
      <em v-if="hasChild" class="x-tree__title--icon">{{ open ? '-' : '+' }}</em>
      <em v-if="!hasChild" class="x-tree__title--icon file-text"></em>
      {{ data.name }}
    </span>
    <ul class="x-tree__content" v-show="open" v-if="hasChild">
      <tree-item v-for="(item, index) in data.children" :data="item" :key="index"></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    data: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    hasChild() {
      return this.data.children && this.data.children.length;
    }
  },
  methods: {
    toggle() {
      if (this.hasChild) {
        this.open = !this.open;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../_theme-chaik/mixins.scss';

@include componentBlockName(tree) {
  @at-root #{& + '__item'} {
    padding: 3px 0;
    .x-tree__title {
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;
      &:visited {
        background: #fff;
      }
      #{& + '--icon'} {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        background-repeat: no-repeat;
        vertical-align: middle;
      }
    }
  }

  @at-root #{& + '__content'} {
    list-style: none;
    margin: 10px 0;
  }
}
</style>
