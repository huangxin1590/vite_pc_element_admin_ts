<template>
  <div>KeyCombine</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'KeyCombine',
  created() {
    let ctrl = 0;
    let d = 0;
    document.addEventListener('keydown', event => {
      // console.log(event)
      if (event.keyCode === 17) {
        event.returnValue = this.preventDefault(event);
        ctrl = 17;
        if (ctrl && d) {
          this.show();
        }
      } else if (event.keyCode === 68) {
        event.returnValue = this.preventDefault(event);
        d = 68;
        if (ctrl && d) {
          this.show();
        }
      }
    });

    document.addEventListener('keyup', event => {
      if (event.keyCode === 17) {
        ctrl = 0;
      } else if (event.keyCode === 68) {
        d = 0;
      }
    });
  },
  methods: {
    show() {
      console.log(123);
    },
    preventDefault(event: KeyboardEvent) {
      event.preventDefault();
      return false;
    }
  }
});
</script>
