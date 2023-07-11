<template>
  <el-dropdown>
    <span class="el-dropdown-link user-info">
      <el-avatar :src="avatarSrc" />{{ name }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          ><el-icon><RemoveFilled /></el-icon>退出登录</el-dropdown-item
        >
        <el-dropdown-item divided>用户信息</el-dropdown-item>
        <el-dropdown-item>系统管理</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name ?? '用户昵称')
    const avatarSrc = computed(
      () =>
        store.state.login.userInfo.avatar ??
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    )
    return { name, avatarSrc }
  }
})
</script>
<style scoped>
.user-info {
  cursor: pointer;
  display: flex;
  cursor: pointer;
  align-items: center;
}
</style>
