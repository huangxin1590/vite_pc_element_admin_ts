<template>
  <div>{{ userLocation }}</div>
  <div>{{ userGeolocation }}</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
export default defineComponent({
  name: 'XUpload',
  setup() {
    const userLocation = inject('location', 'The Universe');
    const userGeolocation = inject('geolocation', {});

    return {
      userLocation,
      userGeolocation
    };
  }
});
</script>
