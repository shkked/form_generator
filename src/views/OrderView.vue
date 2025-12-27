<template>
  <div>
    <FormGenerator
      class="orderForm"
      :config="configOrderForm"
      v-model="formData"
      @submit="saveForm"
      @cancel="cancelForm"
    >
      <template #isPickup="{ field }">
        <label :for="field.key" class="form-generator__label-isPickup">
          {{ field.label }}
          <input
            type="checkbox"
            :id="field.key"
            :checked="formData[field.key]"
            @change="formData[field.key] = ($event.target as HTMLInputElement).checked"
          />
        </label>
      </template>
    </FormGenerator>
  </div>
</template>

<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const formData = computed({
  get: () => store.getters.getValueForm('orderForm'),
  set: (value: unknown) => {
    store.commit('setValueForm', { id: 'orderForm', value })
  },
})

const saveForm = (value: unknown) => {
  store.dispatch('sendDataForm', value)
  cancelForm()
}

const cancelForm = () => {
  store.commit('resetValueForm', 'orderForm')
}

const configOrderForm = computed(() => store.getters.getConfigForm('configOrderForm'))
</script>

<style lang="scss" scoped>
.orderForm {
  margin: 50px auto;
  .form-generator__label-isPickup {
    margin-top: 15px;
  }
}
</style>
