import './assets/main.css'
import ErrorStackParser from 'error-stack-parser'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { findCodeBySourceMap } from './utils/index'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.errorHandler = (err, vm) => {
  const errorStack = ErrorStackParser.parse(err as Error)
  findCodeBySourceMap(errorStack[0])
  console.log('stack', errorStack)
  //   console.log(err, 'error')
  //   console.error(err, 'error')
  //   console.error(vm, 'vm')
}

app.mount('#app')
