import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface BCRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface BCRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: BCRequestInterceptors<T>
  showLoading?: boolean
}
