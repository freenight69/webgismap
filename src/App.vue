<template>
  <div id="app">
    <el-container class="app-out-pannel">
      <el-header class="sys-header">
        <el-col :span="6" class='logo-container'>
          <img src="./assets/logo_satellite.png" class='logo' alt="">
          <span class='title'>  WebGIS 地图展示系统</span>
        </el-col>
      </el-header>
      <el-container class="app-content-pannel">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @select="handleMenuSelect"
      :unique-opened="false"
      text-color="#444A51">
      <el-menu-item index="1">
        <i class="el-icon-monitor"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-cloudy"></i>
        <span slot="title">气象预报</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-map-location"></i>
        <span slot="title">地图功能</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>分析功能</span>
        </template>
        <el-submenu index="4-1">
          <template slot="title">长势监测</template>
          <el-menu-item index="4-1-1">卫星遥感</el-menu-item>
          <el-menu-item index="4-1-2">无人机遥感</el-menu-item>
        </el-submenu>
        <el-submenu index="4-2">
          <template slot="title">环境监测</template>
          <el-menu-item index="4-2-1">土壤湿度</el-menu-item>
        </el-submenu>
        <el-submenu index="4-3">
          <template slot="title">作物分析</template>
          <el-menu-item index="4-3-1">作物模型</el-menu-item>
          <el-menu-item index="4-3-2">出苗分析</el-menu-item>
          <el-menu-item index="4-3-3">测产分析</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="5" disabled>
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
        this.$router.push('/weatherforcast')
      }else if(index === '3'){
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
  background-color: #F9F9F9;
  line-height: 60px;
  color: #444A51;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 2px;
}

.sys-content {
  padding: 5px !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
