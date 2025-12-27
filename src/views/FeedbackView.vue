<template>
  <div>
    <FormGenerator
      class="feedbackForm"
      :config="configFeedbackForm"
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

const formData = computed({
  get: () => store.getters.getValueForm('feedbackForm'),
  set: (value: unknown) => {
    store.commit('setValueForm', { id: 'feedbackForm', value })
  },
})

const saveForm = (value: unknown) => {
  store.dispatch('sendDataForm', value)
  cancelForm()
}

const cancelForm = () => {
  store.commit('resetValueForm', 'feedbackForm')
}

const configFeedbackForm = computed(() => store.getters.getConfigForm('configFeedbackForm'))
</script>

<style lang="scss" scoped>
.feedbackForm {
  margin: 50px auto;
  .form-generator__label-isPickup {
    margin-top: 15px;
  }
}
</style>
