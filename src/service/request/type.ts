import type { AxiosRequestConfig } from 'axios'

export interface BCRequestInterceptors {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (error: any) => any
}

export interface BCRequestConfig extends AxiosRequestConfig {
  interceptors?: BCRequestInterceptors
  showLoading?: boolean
}
