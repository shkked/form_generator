<template>
  <div class="form-generator">
    <form action="#">
      <h2 v-if="config.title" class="form-title">{{ config.title }}</h2>
      <div>
        <div v-for="field in config.fields" :key="field.name">
          <label :for="field.name">{{ field.label }}</label>
          <input
            v-if="field.type === 'text'"
            :id="field.name"
            :name="field.name"
            type="text"
          />
          <select
            v-else-if="field.type === 'select'"
            :id="field.name"
            :name="field.name"
          >
            <option v-for="option in field.options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <input type="reset" value="Сбросить" />
      <input type="submit" value="Отправить" />
    </form>
  </div>
</template>

<script setup lang="ts">
interface IField {
  label: string
  type: string
  name: string
  options?: string[]
  style?: object
}

interface IProps {
  config: {
    title?: string
    fields: IField[]
  }
}

defineProps<IProps>()

</script>

<style lang="scss" scoped>
.form-generator {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  form {
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
}
</style>
