import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/form.store'
import './assets/css/fonts.css'

const app = createApp(App)

app.use(router)
app.use(store)
	
app.mount('#app')
