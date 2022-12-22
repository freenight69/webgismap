<template>
    <div class="maptools-view">
      <el-button-group>
        <el-button id="xzqh" type="info" class="maptools-item" size="medium" @click="handleMapToolsItemClick">行政导航</el-button>
        <el-button id="maptree" type="info" class="maptools-item" size="medium" @click="handleMapToolsItemClick">图层管理</el-button>
        <el-button id="distance" type="info" class="maptools-item" size="medium" @click="handleMapToolsItemClick">距离测量</el-button>
        <el-button id="area" type="info" class="maptools-item" size="medium" @click="handleMapToolsItemClick">面积测量</el-button>
        <el-button id="clear" type="info" class="maptools-item" size="medium" @click="handleMapToolsItemClick">清屏</el-button>
      </el-button-group>
    </div>
</template>
  
<script>
  export default {
    name: 'MapTools',
    methods: {
      handleMapToolsItemClick(e) {
        console.log(e.target.id);
        // 点击到button上的span时，转换到button
        let target = e.target;
        if(e.target.nodeName == "SPAN"){
            target = e.target.parentNode;
        }
        switch(target.id) {
          case 'xzqh':
            this.openXZQHPannel();
            break;
          case 'maptree':
            this.openMapTreePannel();
            break;
          case 'distance':
            break;
          case 'area':
            break;
          case 'clear':
            break;
          default:
            break;
        }
      },
      openXZQHPannel() {
        let currentVisible = this.$store.getters._getDefaultXZQHVisible;
        this.$store.commit('_setDefaultXZQHVisible', !currentVisible);
        },
      openMapTreePannel(){
        let currentVisible = this.$store.getters._getDefaultMapTreeVisible;
        this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
      }
    }
  }
</script>
  
<style>
  .maptools-view{
    position: absolute;
    width: 460px;
    height: 30px;
    top: 15px;
    right: 15px;
  }
  .maptools-item{
    cursor: pointer;
  }
</style>
  