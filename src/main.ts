import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import apis from '@/apis/index'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)
// app.use(ElementPlus, {
//   locale: zhCn,
// })

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.provide('$apis', apis)
app.mount('#app')
