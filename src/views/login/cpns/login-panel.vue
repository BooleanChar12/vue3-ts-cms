<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <LoginAccount ref="loginAccountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <LoginPhone ref="loginPhoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="accoount-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const loginAccountRef = ref<InstanceType<typeof LoginAccount>>()
    const loginPhoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')

    const handleLoginClick = () => {
      console.log('登录')
      // 账号登录
      if (currentTab.value === 'account') {
        loginAccountRef.value?.loginAction(isKeepPassword.value)
      } else {
        loginPhoneRef.value?.loginAction(isKeepPassword.value)
        console.log('手机登录')
      }
    }

    return {
      isKeepPassword,
      loginAccountRef,
      currentTab,
      loginPhoneRef,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 8%;
  .title {
    text-align: center;
  }
}

.accoount-control {
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
}

.login-btn {
  margin-top: 10px;
  width: 100%;
}
</style>
