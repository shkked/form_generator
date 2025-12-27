<template>
  <div>
    <HeaderLayout />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import HeaderLayout from '@/components/HeaderLayout.vue'
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>
