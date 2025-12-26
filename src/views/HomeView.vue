<template>
  <div>
    <CreateForm>
      <slot name="form"> </slot>
    </CreateForm>
  </div>
</template>

<script setup lang="ts">
import CreateForm from '@/components/createForm.vue'
</script>

<style scoped></style>
