import { Module } from 'vuex'
import router from '@/router/index'
import { ILoginState } from './types'
import { IRootState } from '../types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { IAccount } from '@/service/login/type'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token) // 触发mutations里面的方法，修改state里面的变量

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求菜单
      const userMenusResult = await requestUserMenusByRoleId(id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      // const userMenus = localCache.getCache('userMenus')
      // if (userMenus) {
      //   commit('changeUserMenus', userMenus)
      // }

      commit('changeUserMenus', []) // 链接后台这里注释，把上面打开
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLoginAction', payload)
    }
  }
}

export default loginModule
