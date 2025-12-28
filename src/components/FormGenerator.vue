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
          <!-- Select с множественным выбором -->
          <div v-if="field.type == 'select' && field?.attrs?.multiple" class="multiselect">
            <div class="multiselect__selected" @click="field._open = !field._open">
              <span v-if="(modelValue[field.key] as string[]).length">
                {{ (modelValue[field.key] as string[]).join(', ') }}
              </span>
              <span v-else class="placeholder">{{ field.attrs?.placeholder }}</span>
              <i class="bi bi-chevron-down"></i>
            </div>

            <div v-if="field._open" class="multiselect__dropdown">
              <div
                v-for="option in field.options"
                :key="option"
                class="multiselect__option"
                @click.stop="
                  (() => {
                    const arr = [...((modelValue[field.key] as string[]) || [])]
                    const i = arr.indexOf(option)
                    if (i >= 0) arr.splice(i, 1)
                    else arr.push(option)
                    update(field.key, arr)
                  })()
                "
              >
                <i
                  class="bi"
                  :class="
                    ((modelValue[field.key] as string[]) || []).includes(option)
                      ? 'bi-check-square'
                      : 'bi-square'
                  "
                ></i>
                <span>{{ option }}</span>
              </div>
            </div>
          </div>
          <!-- Select с одиночным выбором -->
          <div v-else-if="field.type == 'select'" class="multiselect">
            <div class="multiselect__selected" @click="field._open = !field._open">
              <span v-if="modelValue[field.key]">
                {{ modelValue[field.key] }}
              </span>
              <span v-else class="placeholder">{{ field.attrs?.placeholder }}</span>
              <i class="bi bi-chevron-down"></i>
            </div>

            <div v-if="field._open" class="multiselect__dropdown">
              <div
                v-for="option in field.options"
                :key="option"
                class="multiselect__option"
                @click.stop="
                  (() => {
                    let val = modelValue[field.key]
                    if (val === option) {
                      val = ''
                    } else {
                      val = option
                    }
                    update(field.key, val)
                  })()
                "
              >
                <i
                  class="bi"
                  :class="
                    (modelValue[field.key] as string) === option ? 'bi-check-square' : 'bi-square'
                  "
                ></i>
                <span>{{ option }}</span>
              </div>
            </div>
          </div>
          <!-- Input, Textarea, Checkbox -->
          <component
            v-else
            class="form-generator__block"
            :is="field.type"
            v-bind="field.attrs"
            :multiple="field?.attrs?.multiple"
            :id="field.key"
            :value="modelValue[field.key] ?? ''"
            @input="update(field.key, $event.target.value)"
            @change="onChange($event, field)"
          />
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
import { onBeforeUnmount, onMounted } from 'vue'

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

const closeAllMultiselects = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.multiselect')) {
    props.config.fields.forEach((field: IField) => {
      if (field._open) field._open = false
    })
  }
}

onMounted(() => {
  document.addEventListener('click', closeAllMultiselects)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeAllMultiselects)
})
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
  .multiselect {
    position: relative;
    background-color: white;
    width: 100%;
    margin-top: 5px;
  }

  .multiselect__selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
    background: #ffffff;
  }

  .multiselect__dropdown {
    position: absolute;
    z-index: 10;
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
    margin-top: 4px;
    max-height: 100px;
    overflow-y: auto;
  }

  .multiselect__option {
    padding: 6px 8px;
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
  }

  .multiselect__option:hover {
    background: #f0f0f0;
  }

  .placeholder {
    color: #757575;
  }
}
</style>
