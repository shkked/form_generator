<template>
  <div>
    <form @submit.prevent="emit('submit')" class="form-generator">
      <h2 v-if="config.title" class="form-generator__title">{{ config.title }}</h2>
      <div v-for="field in config.fields" :key="field.key" class="label-parent">
        <slot
          :name="field.key"
          :field="field"
          :style="field.style"
          :value="modelValue[field.key]"
          :update="(v: unknown) => update(field.key, v)"
        >
          <label class="form-generator__label" :for="field.key">{{ field.label }}</label>

          <component
            v-if="field.type == 'select' && field?.attrs?.multiple"
            class="form-generator__block"
            :is="field.type"
            v-bind="field.attrs"
            :id="field.key"
            @change="onChange($event, field)"
          >
            <template v-if="field.type === 'select'">
              <option
                v-for="option in field.options"
                :key="option"
                :value="option"
                :selected="
                  field?.attrs?.multiple
                    ? ((modelValue[field.key] as string[]) || []).includes(option)
                    : modelValue[field.key] === option
                "
              >
                {{ option }}
              </option>
            </template>
          </component>
          <component
            v-else
            class="form-generator__block"
            :is="field.type"
            v-bind="field.attrs"
            :multiple="field?.attrs?.multiple"
            :id="field.key"
            :value="modelValue[field.key]"
            @input="update(field.key, $event.target.value)"
            @change="onChange($event, field)"
          >
            <template v-if="field.type === 'select'">
              <option
                v-for="option in field.options"
                :key="option"
                :value="option"
                :selected="
                  field?.attrs?.multiple
                    ? ((modelValue[field.key] as string[]) || []).includes(option)
                    : modelValue[field.key] === option
                "
              >
                {{ option }}
              </option>
            </template>
          </component>
        </slot>
      </div>

      <slot name="actions">
        <div class="form-generator__actions">
          <button
            class="form-generator__button form-generator__button-reset"
            type="button"
            @click="emit('cancel')"
          >
            {{ config.textCancel }}
          </button>
          <button class="form-generator__button form-generator__button-submit" type="submit">
            {{ config.textSubmit }}
          </button>
        </div>
      </slot>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { IField, IFormConfig } from '@/types/form.types.ts'

interface IPropsForm {
  config: IFormConfig
  modelValue: Record<string, unknown>
}

const props = defineProps<IPropsForm>()

const emit = defineEmits(['submit', 'cancel', 'update:modelValue'])

const update = (fieldKey: string, fieldValue: unknown) => {
  emit('update:modelValue', { ...props.modelValue, [fieldKey]: fieldValue })
}

const onChange = (event: Event, field: IField) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement
  if (field.type === 'select' && field?.attrs?.multiple) {
    const values = Array.from((target as HTMLSelectElement).selectedOptions).map((o) => o.value)
    update(field.key, values)
  } else if (field.type === 'checkbox') {
    update(field.key, (target as HTMLInputElement).checked)
  } else {
    update(field.key, (target as HTMLInputElement).value)
  }
}
</script>

<style lang="scss" scoped>
.form-generator {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  .form-generator__title {
    font-family: 'NeueMontreal Bold', sans-serif;
  }
  .label-parent {
    font-family: 'NeueMontreal', sans-serif;
    display: flex;
    flex-direction: column;
  }
  .form-generator__label {
    margin-top: 15px;
    margin-right: 10px;
  }
  .form-generator__block {
    font-family: 'NeueMontreal', sans-serif;
    margin-top: 5px;
    padding: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    option {
      font-family: 'NeueMontreal', sans-serif;
    }
  }
  .form-generator__actions {
    display: flex;
    align-items: center;
  }
  .form-generator__button {
    width: 50%;
    margin-top: 15px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  .form-generator__button-reset {
    font-family: 'NeueMontreal', sans-serif;
    background-color: #757575;
    color: white;
    border-radius: 5px;
    margin-right: 10px;
    border: none;
    &:hover {
      background-color: #474747;
    }
  }
  .form-generator__button-submit {
    font-family: 'NeueMontreal', sans-serif;
    background-color: #2777fe;
    color: white;
    border-radius: 5px;
    border: none;
    &:hover {
      background-color: #1249a7;
    }
  }
}
</style>
