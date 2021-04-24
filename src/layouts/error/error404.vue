<template>
  <div class="view not-found-view">
    <div class="where-is-panfish">
      <img src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/bg.1f516b3.png" class="elem bg" />
      <img src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/sea.892cf5d.png" class="elem sea" />
      <img src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/spray.bc638d2.png" class="elem spray" />
    </div>
  </div>
  <div style="text-align:center;">
    <el-button @click="backHome" size="mini">返回首页</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Error404',
  methods: {
    backHome() {
      this.$router.push('/');
    }
  }
});
</script>

<style lang="scss" scoped>
.not-found-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.where-is-panfish {
  position: relative;
  width: 52rem;
  max-width: 50%;
  padding-top: 42%;
  .bg {
    width: 77.724%;
    transform: translate(-50%, -50%);
  }
  .elem {
    position: absolute;
    top: 35%;
    left: 50%;
  }
  .sea {
    width: 99.199%;
    transform: translate(-50%, 75.3%);
    opacity: 0.7;
  }
  .spray {
    width: 40.545%;
    transform: translate(-55%, 162%);
    opacity: 0.4;
  }
}
</style>
