<template>
    <div class="maptree-pannel" v-show="this.$store.getters._getDefaultMapTreeVisible">
        <div class="maptree-header">
            <span>图层管理</span>
            <i class="el-icon-close" @click="closeMapTreePannel"></i>
        </div>
        <el-tree 
        :data="data" 
        :props="defaultProps" 
        accordion 
        @node-click="handleNodeClick">
      </el-tree>
    </div>
</template>
  
<script>
import { loadModules } from 'esri-loader';
import config from './config';

export default {
    name: 'MapTree',
    components: {},
    data() {
        return {
            data: [
                {
                    label: '底图图层',
                    children: [
                        {
                            label: '暖色系图层',
                            layerid: 'layerid',
                            layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                        },
                        {
                            label: '灰色系图层',
                            layerid: 'layerid',
                            layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
                        },
                        {
                            label: '深色系图层',
                            layerid: 'layerid',
                            layerurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                        },
                    ],
                },

                {
                    label: '行政区划数据',
                    children: [
                        {
                            label: '省数据',
                            layerid: 'layerid',
                            layerurl: 'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/China_Provinces_webMarcator/FeatureServer',
                        },
                        {
                            label: '市数据',
                            layerid: 'layerid',
                            layerurl: 'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/China_Cities_webMarcator/FeatureServer',
                        },
                        {
                            label: '县数据',
                            layerid: 'layerid',
                            layerurl: 'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/China_Counties_webMarcator/FeatureServer',
                        },
                    ],
                },
                {
                    label: '地块数据',
                    children: [
                        {
                            label: '进水闸门',
                            layerid: 'layerid',
                            layerurl: 'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/inlet_mercator/FeatureServer',
                        },
                        {
                            label: '出水闸门',
                            layerid: 'layerid',
                            layerurl: 'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/outlet_mercator/FeatureServer',
                        },
                        {
                            label: '进排水口',
                            layerid: 'layerid',
                            layerurl: 'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/drain_mercator/FeatureServer',
                        },
                        {
                            label: '卷帘分析 top',
                            layerid: 'swipeLayerTop',
                            layerurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHProvince_WebMokatuo/FeatureServer',
                        },
                        {
                            label: '卷帘分析 bottom',
                            layerid: 'swipeLayerBottom',
                            layerurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCity_WebMokatuo/FeatureServer',
                        },
                    ],
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
        };
    },
    mounted: function () {},
    methods: {
        async handleNodeClick(data) {
        //   console.log(data.layerurl);
          if(data.layerurl) {
            //删除已添加的图层
            const view = this.$store.getters._getDefaultMapView;
                const resultLayer = view.map.findLayerById('layerid');
                if (resultLayer) view.map.remove(resultLayer);

                //处理不同服务类型
                const [TileLayer, FeatureLayer] = await loadModules(
                    ['esri/layers/TileLayer', 'esri/layers/FeatureLayer'],
                    config.options,
                );
                const c = data.layerurl.split('/');
                const serverType = c[c.length - 1];
                let layer = '';
                let results = '';
                switch (serverType) {
                    case 'MapServer':
                        layer = new TileLayer({ url: data.layerurl, id: data.layerid });
                        break;
                    case 'FeatureServer':
                        layer = new FeatureLayer({ url: data.layerurl, id: data.layerid });
                        results = await layer.queryFeatures();
                        // console.log(results.features);
                        // 跳转到查询features的中心点
                        if (results.features[0].geometry.type == "point") {
                            // 初始化最大最小经纬度                         
                            var minLonPoint = results.features[0].geometry.longitude;
                            var maxLonPoint = results.features[0].geometry.longitude;
                            var minLatPoint = results.features[0].geometry.latitude;
                            var maxLatPoint = results.features[0].geometry.latitude;
                            for (var i=0; i<results.features.length; i++) {
                                if (maxLonPoint < results.features[i].geometry.longitude) {
                                    maxLonPoint = results.features[i].geometry.longitude;
                                }
                                if (minLonPoint > results.features[i].geometry.longitude) {
                                    minLonPoint = results.features[i].geometry.longitude;
                                }
                                if (maxLatPoint < results.features[i].geometry.latitude) {
                                    maxLatPoint = results.features[i].geometry.latitude;
                                }
                                if (minLatPoint > results.features[i].geometry.latitude) {
                                    minLatPoint = results.features[i].geometry.latitude;
                                }
                            }
                            var zoomLonPoint = (maxLonPoint + minLonPoint)/2;
                            var zoomLatPoint = (maxLatPoint + minLatPoint)/2;
                            view.goTo({
                                center: [zoomLonPoint, zoomLatPoint],
                                zoom: 15,
                            });
                        }else if (results.features[0].geometry.type == "polygon") {
                            // 初始化最大最小经纬度                         
                            var minLonPolygon = results.features[0].geometry.extent.xmin;
                            var maxLonPolygon = results.features[0].geometry.extent.xmax;
                            var minLatPolygon = results.features[0].geometry.extent.ymin;
                            var maxLatPolygon = results.features[0].geometry.extent.ymax;
                            for (var k=0; k<results.features.length; k++) {
                                if (maxLonPolygon < results.features[k].geometry.extent.xmax) {
                                    maxLonPolygon = results.features[k].geometry.extent.xmax;
                                }
                                if (minLonPolygon > results.features[k].geometry.extent.xmin) {
                                    minLonPolygon = results.features[k].geometry.extent.xmin;
                                }
                                if (maxLatPolygon < results.features[k].geometry.extent.ymax) {
                                    maxLatPolygon = results.features[k].geometry.extent.ymax;
                                }
                                if (minLatPolygon > results.features[k].geometry.extent.ymin) {
                                    minLatPolygon = results.features[k].geometry.extent.ymin;
                                }
                            }
                            var zoomLonPolygon = (maxLonPolygon + minLonPolygon)/2;
                            var zoomLatPolygon = (maxLatPolygon + minLatPolygon)/2;
                            view.goTo({
                                center: [zoomLonPolygon, zoomLatPolygon],
                                zoom: 4,
                            });
                        }
                        break;
                    default:
                        break;
                }
                view.map.add(layer);
        }
      },
      closeMapTreePannel() {
        const currentVisible = this.$store.getters._getDefaultMapTreeVisible;
        this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
      },
    }
}
</script>
  
<style>
.maptree-pannel{
    position: absolute;
    width: 225px;
    height: 300px;
    top: 15px;
    left: 30px;
    background-color: #fff;
    opacity: 0.75;
}
.maptree-header {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.maptree-header > span {
    line-height: 35px;
    font-size: 16px;
    font-weight: 600;
}
.maptree-header > i {
    line-height: 35px;
    cursor: pointer;
}
</style>
  