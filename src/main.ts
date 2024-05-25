import './assets/main.css'
import ErrorStackParser from 'error-stack-parser'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
// import { findCodeBySourceMap } from './utils/index'
const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

// app.config.errorHandler = (err: any, vm) => {
//     const errorStack = ErrorStackParser.parse(err as Error)
//     const jsError = {
//         stack_frames: errorStack,
//         message: err.message,
//         stack: err.stack,
//         error_name: err.name
//     }
//     vm!.$message.error(`您触发了一个${err.name} 错误`)
//     localStorage.setItem('jsErrorList', JSON.stringify(jsError))
//     //   findCodeBySourceMap(errorStack[0])
//     //   console.log('stack', errorStack)
//     //   console.log(err, 'error')
//     //   console.error(err, 'error')
//     //   console.error(vm, 'vm')
// }

app.mount('#app')
