<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '65px' : '210px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <NavHeader @changeFold="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
import { setupStore } from '@/store'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    setupStore()
    return { isCollapse, handleFoldChange }
  }
})
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }

  .el-header {
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>
