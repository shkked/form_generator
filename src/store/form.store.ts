import type { IRootState, TConfigForm, TValueForm } from '@/types/form.types.ts'
import { createStore } from 'vuex'

export default createStore<IRootState>({
  state: {
    formValue: {
      helloForm: {
        firstName: '',
        lastName: '',
      },
      orderForm: {
        firstName: '',
        lastName: '',
        options: [],
      },
      feedbackForm: {
        firstName: '',
        lastName: '',
      },
    },
    dataConfig: {
      configHelloForm: {
        title: 'Приветственная форма',
        fields: [
          {
            key: 'firstName',
            label: 'Имя',
            type: 'input',
            name: 'firstName',
          },
          {
            key: 'lastName',
            label: 'Фамилия',
            type: 'input',
            name: 'lastName',
          },
        ],
        textSubmit: 'Сохранить',
        textCancel: 'Сбросить',
      },
    },
  },
  mutations: {
    setValueForm(state: IRootState, payload: { id: TValueForm; value: object }) {
      state.formValue[payload.id] = payload.value
    },
  },
  actions: {
    async getDataForm() {
      try {
      } catch (e) {
        console.error(e)
      }
    },
    async sendDataForm(dataForm: object) {
      try {
        alert('Форма успешно отправлена!')
      } catch (e) {
        console.error(e)
      }
    },
  },
  getters: {
    getValueForm: (state: IRootState) => (id: TValueForm) => state.formValue[id],
    getConfigForm: (state: IRootState) => (id: TConfigForm) => state.dataConfig[id],
  },
})
