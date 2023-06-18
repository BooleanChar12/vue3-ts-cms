// service 统一接口
import BCRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const bcRequest = new BCRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      const token = ''
      if (token) {
        if (config.headers?.Authorization) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch(err) {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor(config) {
      console.log('响应成功的拦截')
      return config
    },
    responseInterceptorCatch(err) {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default bcRequest
