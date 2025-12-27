import type { CSSProperties } from 'vue'

export type TFieldType = 'input' | 'select' | 'checkbox' | 'textarea'

export interface IField {
  key: string
  label: string
  type: TFieldType
  name: string
  options?: string[]
  style?: CSSProperties
}
export interface IFormConfig {
  title: string
  fields: IField[]
  textSubmit: string
  textCancel: string
}
export interface IFormData {
  [key: string]: unknown
}
export interface IRootState {
  formValue: {
    helloForm: IFormData
    orderForm: IFormData
    feedbackForm: IFormData
  }
  dataConfig: {
    configHelloForm: IFormConfig
    configOrderForm: IFormConfig
    configFeedbackForm: IFormConfig
  }
}
export type TConfigForm = keyof IRootState['dataConfig']
export type TValueForm = keyof IRootState['formValue']
