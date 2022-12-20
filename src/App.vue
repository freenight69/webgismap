<template>
  <div id="app">
    <el-container class="app-out-pannel">
      <el-header class="sys-header">WebGIS地图展示系统</el-header>
      <el-container class="app-content-pannel">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @select="handleMenuSelect"
      :unique-opened="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-monitor"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-s-home"></i>
        <span slot="title">地图门户</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>地图功能</span>
        </template>
        <el-submenu index="3-1">
          <template slot="title">测量功能</template>
          <el-menu-item index="3-1-1">距离测量</el-menu-item>
          <el-menu-item index="3-1-1">面积测量</el-menu-item>
        </el-submenu>
        <el-submenu index="3-2">
          <template slot="title">功能2</template>
          <el-menu-item index="3-2-1">功能2-1</el-menu-item>
        </el-submenu>
        <el-submenu index="3-3">
          <template slot="title">功能3</template>
          <el-menu-item index="3-3-1">功能3-1</el-menu-item>
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
export default {
  name: 'App',
  components: {},
  data() {
    return {};
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
  background-color: #444A51;
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
