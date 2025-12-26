<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #333;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
h1 {
  text-align: center;
}
</style>
