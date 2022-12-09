<template>
  <div id="app">
    <el-container class="app-out-pannel">
      <el-header class="sys-header">一张图项目系统</el-header>
      <el-container class="app-content-pannel">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @select="handleMenuSelect" :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-monitor"></i>
            <span slot="title">首页大屏</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-picture"></i>
            <span slot="title">一张图</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-fold"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <span slot="title">选项4</span>
              <el-menu-item index="3-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="4" disabled>
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
        <el-main class="sys-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import MapView from './components/common/MapView.vue'
export default {
  name: 'App',
  components: {
    // MapView,
  },
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleMenuSelect(index) {
      if(index === '1'){
        // 跳转到首页大屏
        this.$router.push('/')
      }else if(index === '2'){
        // 跳转到一张图
        this.$router.push('/onemap')
      }
    }
  }
}
</script>

<style>
html,
body,
#app {
  position: relative;
  widows: 100%;
  height: 100%;
  margin: 0;
}

.app-out-pannel,
.app-content-pannel {
  height: 100%;
}

.sys-header {
  background-color: #5D9A50;
  line-height: 60px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}

.sys-content {
  padding: 5px !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
