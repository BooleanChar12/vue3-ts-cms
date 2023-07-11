<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <template v-if="!isFold">
        <Fold />
      </template>
      <template v-else>
        <Expand />
      </template>
    </el-icon>
    <div class="content">
      <div>面包屑</div>
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'

export default defineComponent({
  components: {
    UserInfo
  },
  emits: ['changeFold'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('changeFold', isFold.value)
    }

    return { isFold, handleFoldClick }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
