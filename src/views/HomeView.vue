<template>
  <div>
    <FormGenerator :config="configHomeView">
      <slot name="form"> </slot>
    </FormGenerator>
  </div>
</template>

<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator.vue'

const configHomeView = {
	title: 'Dynamic Form',
	fields: [
		{ label: 'First Name', type: 'text', name: 'firstName' },
		{ label: 'Last Name', type: 'text', name: 'lastName' },
		{
			label: 'Options',
			type: 'select',
			name: 'options',
			options: ['Option 1', 'Option 2', 'Option 3'],
		},
	],
}
</script>

<style scoped></style>
