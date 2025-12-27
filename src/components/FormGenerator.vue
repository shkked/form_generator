<template>
  <div>
    <form @submit.prevent="emit('submit')" class="form-generator">
      <h2 v-if="config.title">{{ config.title }}</h2>
      <div v-for="field in config.fields" :key="field.key">
        <slot
          :name="field.key"
          :field="field"
          :value="modelValue[field.key]"
          :update="(v: unknown) => update(field.key, v)"
        >
          <label :for="field.key">{{ field.label }}</label>

          <component
            :is="field.type"
            :style="field.style"
            :id="field.key"
            :value="modelValue[field.key]"
            @input="update(field.key, $event.target.value)"
          />
        </slot>
      </div>

      <slot name="actions">
        <button type="button" @click="emit('cancel')">{{ config.textCancel }}</button>
        <button type="button" @click="emit('submit')">{{ config.textSubmit }}</button>
      </slot>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { IFormConfig } from '@/types/form.types.ts'

interface IPropsForm {
  config: IFormConfig
  modelValue: Record<string, unknown>
}

const props = defineProps<IPropsForm>()

const emit = defineEmits(['submit', 'cancel', 'update:modelValue'])

const update = (fieldKey: string, fieldValue: unknown) => {
  emit('update:modelValue', { ...props.modelValue, [fieldKey]: fieldValue })
}
</script>

<style lang="scss" scoped>
.form-generator {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  label {
    margin-top: 10px;
  }
  input,
  select,
  textarea {
    margin-top: 5px;
    padding: 5px;
    font-size: 16px;
  }
  input[type='submit'],
  input[type='reset'] {
    margin-top: 15px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
