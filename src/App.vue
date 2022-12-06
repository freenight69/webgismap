<template>
  <div id="app">
    <el-container class="app-out-pannel">
      <el-header class="sys-header">一张图项目系统</el-header>
      <el-container class="app-content-pannel">
        <el-aside class="sys-menu" width="200px">左侧菜单</el-aside>
        <el-main class="sys-content">
          <MapView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MapView from './components/common/MapView.vue'
export default {
  name: 'App',
  components: {
    MapView,
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
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
}

.sys-menu {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.sys-content {
  padding: 5px !important;
}
</style>
