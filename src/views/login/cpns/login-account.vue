<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号:" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('cms-login-name') ?? '',
      password: localCache.getCache('cms-login-password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 是否需要记住密码
          if (isKeepPassword) {
            // 本地保存
            localCache.setCache('cms-login-name', account.name)
            localCache.setCache('cms-login-password', account.password)
          } else {
            // 不保存则清除本地缓存
            localCache.deleteCache('cms-login-name')
            localCache.deleteCache('cms-login-password')
          }
          // 开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
          console.log('验证通过，调用登录逻辑')
        }
      })
    }

    return { account, rules, loginAction, formRef }
  }
})
</script>

<style scoped></style>
