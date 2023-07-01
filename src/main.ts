import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store'
// import './service/axios_demo'
// import bcRequest from './service'

const app = createApp(App)
app.use(router)
app.use(store)
setupStore()
app.use(globalRegister) // 会自动执行函数globalRegister()

app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// bcRequest
//   .request<DataType>({
//     url: '/get',
//     method: 'GET',
//     interceptors: {
//       requestInterceptor(config) {
//         console.log('单独请求的config')
//         return config
//       },
//       responseInterceptor(res) {
//         console.log('单独响应的response')
//         return res
//       }
//     },
//     showLoading: false // 关闭默认的请求loading
//   })
//   .then((res) => {
//     console.log(res)
//   })

// bcRequest
//   .get<DataType>({
//     url: '/get',
//     interceptors: {
//       requestInterceptor(config) {
//         console.log('单独请求的config')
//         return config
//       },
//       responseInterceptor(res) {
//         console.log('单独响应的response')
//         return res
//       }
//     },
//     showLoading: true // 关闭默认的请求loading
//   })
//   .then((res) => {
//     console.log(res)
//   })
