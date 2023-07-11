<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3 + TS</span>
    </div>
    <!-- 动态菜单 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 菜单名 -->
          <el-sub-menu :index="item.id">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历二级菜单内部的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>

    <!--------------------------------------------------分割线-------------------------------------------------->

    <!-- 静态菜单 -->
    <el-menu
      background-color="#001529"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      :collapse="collapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Monitor /></el-icon>
          <span>系统总览</span>
        </template>
        <el-menu-item
          index="1-1"
          @click="handleMenuItemClick({ url: '/main/analysis/dashboard' })"
          >核心技术</el-menu-item
        >
        <el-menu-item
          index="1-2"
          @click="handleMenuItemClick({ url: '/main/analysis/overview' })"
          >商品统计</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item
          index="2-1"
          @click="handleMenuItemClick({ url: '/main/system/user' })"
          >用户管理</el-menu-item
        >
        <el-menu-item
          index="2-2"
          @click="handleMenuItemClick({ url: '/main/system/department' })"
          >部门管理</el-menu-item
        >
        <el-menu-item
          index="2-3"
          @click="handleMenuItemClick({ url: '/main/system/menu' })"
          >菜单管理</el-menu-item
        >
        <el-menu-item
          index="2-4"
          @click="handleMenuItemClick({ url: '/main/system/role' })"
          >角色管理</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Goods /></el-icon>
          <span>商品中心</span>
        </template>
        <el-menu-item
          index="3-1"
          @click="handleMenuItemClick({ url: '/main/product/category' })"
          >商品类别</el-menu-item
        >
        <el-menu-item
          index="3-2"
          @click="handleMenuItemClick({ url: '/main/product/goods' })"
          >商品信息</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><ChatDotRound /></el-icon>
          <span>随便聊聊</span>
        </template>
        <el-menu-item
          index="4-1"
          @click="handleMenuItemClick({ url: '/main/story/chat' })"
          >你的故事</el-menu-item
        >
        <el-menu-item
          index="4-2"
          @click="handleMenuItemClick({ url: '/main/story/list' })"
          >故事列表</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)

    const router = useRouter()
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return { userMenus, handleMenuItemClick }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
