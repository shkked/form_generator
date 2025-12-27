<template>
  <div>
    <FormGenerator
      :config="configHelloForm"
      v-model="formData"
      @submit="saveForm"
      @cancel="cancelForm"
    />
  </div>
</template>

<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
console.log(store)

const formData = computed({
  get: () => store.getters.getValueForm('helloForm'),
  set: (value: unknown) => {
    store.commit('setValueForm', { id: 'helloForm', value })
  },
})

const saveForm = (value: unknown) => {
  console.log('Form submitted:', value)

  store.dispatch('sendDataForm', value)
}

const cancelForm = () => {
  formData.value = {
    firstName: '',
    lastName: '',
    options: '',
  }
}

const configHelloForm = computed(() => store.getters.getConfigForm('configHelloForm'))
</script>

<style scoped></style>
