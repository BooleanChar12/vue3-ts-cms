<template>
  <div class="login-phone">
    <el-form label-width="60px" :model="phone" ref="formRef">
      <el-form-item label="手机号:" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码:" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      num: '',
      code: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 是否需要记住密码
          if (isKeepPassword) {
            // 本地保存
            localCache.setCache('cms-login-phone', phone.num)
            localCache.setCache('cms-login-code', phone.code)
          } else {
            // 不保存则清除本地缓存
            localCache.deleteCache('cms-login-name')
            localCache.deleteCache('cms-login-password')
          }
          // 开始进行登录验证
          store.dispatch('login/phoneLoginAction', { ...phone })
          console.log('验证通过，调用登录逻辑')
        }
      })
    }

    return { phone, loginAction }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.get-code-btn {
  margin-left: 8px;
}
</style>
