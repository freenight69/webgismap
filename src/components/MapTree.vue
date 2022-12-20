<template>
    <div class="maptree-pannel" v-show="this.$store.getters._getDefaultMapTreeVisible">
        <el-tree 
        :data="data" 
        node-key="id"
        :default-expanded-keys="[1, 2]"
        :props="defaultProps" 
        style="background-color: #E9E9EB" 
        @node-click="handleNodeClick">
      </el-tree>
    </div>
  </template>
  
<script>
import { loadModules } from 'esri-loader';

const options = {
    url: 'https://js.arcgis.com/4.25/init.js',
    css: 'https://js.arcgis.com/4.25/esri/themes/light/main.css',
}

export default {
    name: 'MapTree',
    components: {},
    data() {
        return {
            data: [
                {
                    id: 1,
                    label: '底图图层',
                    children: [
                        {
                            id: 4,
                            label: '暖色系图层',
                            layerid: 'layerid',
                            layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                        },
                        {
                            id: 5,
                            label: '灰色系图层',
                            layerid: 'layerid',
                            layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
                        },
                        {
                            id: 6,
                            label: '深色系图层',
                            layerid: 'layerid',
                            layerurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                        },
                    ],
                },

                {
                    id: 2,
                    label: '行政区划数据',
                    children: [
                        {
                            label: '省数据',
                            layerid: 'layerid',
                            layerurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHProvince_WebMokatuo/FeatureServer',
                        },
                        {
                            label: '市数据',
                            layerid: 'layerid',
                            layerurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCity_WebMokatuo/FeatureServer',
                        },
                        {
                            label: '县数据',
                            layerid: 'layerid',
                            layerurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCounty_WebMokatuo/FeatureServer',
                        },
                    ],
                },
                {
                    id: 3,
                    label: '业务数据',
                    children: [
                        {
                            label: '火车站数据 84',
                            layerid: 'layerid',
                            layerurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/trainstationdata/FeatureServer',
                        },
                        {
                            label: '火车站数据 Mekatuo',
                            layerid: 'layerid',
                            layerurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/trainstation_WebMokatuo/FeatureServer',
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
          console.log(data.layerurl);
          if(data.layerurl) {
            const view = this.$store.getters._getDefaultMapView;
            const resultLayer = view.map.findLayerById('layerid');
            if (resultLayer) view.map.remove(resultLayer);

            const [TileLayer] = await loadModules(
                ['esri/layers/TileLayer'],
                options
            );
            const layer = new TileLayer({ 
              url: data.layerurl,
              id: data.layerid
            })
            view.map.add(layer);
        }
      }
    }
  }
</script>
  
<style>
  .maptree-pannel{
    position: absolute;
    width: 225px;
    height: 300px;
    top: 15px;
    left: 60px;
    background-color: #E9E9EB;
    opacity: 0.75;
  }
</style>
  