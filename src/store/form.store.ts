import type { IFormData, IRootState, TConfigForm, TValueForm } from '@/types/form.types.ts'
import { createStore } from 'vuex'

export default createStore<IRootState>({
  state: {
    formValue: {
      helloForm: {
        firstName: '',
        lastName: '',
        middleName: '',
        sex: '',
      },
      orderForm: {
        firstName: '',
        lastName: '',
        email: '',
        paymentMethod: '',
        isPickup: false,
      },
      feedbackForm: {
        firstName: '',
        lastName: '',
        typeQuestion: '',
        mostImportant: [],
        message: '',
      },
    },
    dataConfig: {
      configHelloForm: {
        title: 'Введите данные',
        fields: [
          {
            key: 'firstName',
            label: 'Имя',
            type: 'input',
            name: 'firstName',
            attrs: { placeholder: 'Введите имя', required: true},
          },
          {
            key: 'lastName',
            label: 'Фамилия',
            type: 'input',
            name: 'lastName',
            attrs: { placeholder: 'Введите фамилию', required: true },
          },
          {
            key: 'middleName',
            label: 'Отчество',
            type: 'input',
            name: 'middleName',
            attrs: { placeholder: 'Введите отчество', required: true },
          },
          {
            key: 'sex',
            label: 'Пол',
            type: 'select',
            name: 'sex',
            options: ['Мужской', 'Женский'],
            attrs: { required: true },
          },
        ],
        textSubmit: 'Сохранить',
        textCancel: 'Сбросить',
      },
      configOrderForm: {
        title: 'Оформление заказа',
        fields: [
          {
            key: 'firstName',
            label: 'Имя',
            type: 'input',
            name: 'firstName',
            attrs: { placeholder: 'Введите имя', required: true },
          },
          {
            key: 'lastName',
            label: 'Фамилия',
            type: 'input',
            name: 'lastName',
            attrs: { placeholder: 'Введите фамилию', required: true },
          },
          {
            key: 'email',
            label: 'Электронная почта',
            type: 'input',
            name: 'email',
            attrs: { type: 'email', placeholder: 'Введите почту', required: true },
          },
          {
            key: 'paymentMethod',
            label: 'Выберите способ оплаты',
            type: 'select',
            name: 'paymentMethod',
            options: ['Карта', 'Наличные'],
            attrs: { required: true },
          },
          {
            key: 'isPickup',
            label: 'Самовывоз',
            type: 'input',
            attrs: { type: 'checkbox' },
            name: 'isPickup',
          },
        ],
        textSubmit: 'Оформить',
        textCancel: 'Сбросить',
      },
      configFeedbackForm: {
        title: 'Обратная связь',
        fields: [
          {
            key: 'FIO',
            label: 'ФИО',
            type: 'input',
            name: 'FIO',
            attrs: { placeholder: 'Введите ФИО', required: true },
          },
          {
            key: 'email',
            label: 'Электронная почта',
            type: 'input',
            name: 'email',
            attrs: { type: 'email', placeholder: 'Введите почту', required: true },
          },
          {
            key: 'typeQuestion',
            label: 'Выберите ваш вопрос',
            type: 'select',
            name: 'typeQuestion',
            options: ['Похвала', 'Жалоба', 'Вопрос', 'Предложение'],
            attrs: { required: true },
          },
          {
            key: 'mostImportant',
            label: 'Что больше всего понравилось в компании? (Можно выбрать несколько вариантов)',
            type: 'select',
            name: 'mostImportant',
            options: ['Уровень дохода', 'Коллеги', 'Руководство', 'График работы'],
            attrs: { multiple: true },
          },
          {
            key: 'message',
            label: 'Сообщение',
            type: 'textarea',
            name: 'message',
            attrs: { placeholder: 'Введите сообщение', required: true },
          },
        ],
        textSubmit: 'Отправить',
        textCancel: 'Сбросить',
      },
    },
  },
  mutations: {
    setValueForm(state: IRootState, payload: { id: TValueForm; value: IFormData }) {
      state.formValue[payload.id] = payload.value
    },
    resetValueForm(state: IRootState, id: TValueForm) {
      const resetObj: Record<string, string | string[] | boolean> = {}
      Object.keys(state.formValue[id]).forEach((key) => {
        if (Array.isArray(state.formValue[id][key])) {
          resetObj[key] = []
        } else if (typeof state.formValue[id][key] === 'boolean') {
          resetObj[key] = false
        } else {
          resetObj[key] = ''
        }
      })
      state.formValue[id] = resetObj
    },
  },
  actions: {
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
