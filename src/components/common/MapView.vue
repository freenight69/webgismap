<template>
    <div id="mapview"></div>
</template>
  
<script>
import { loadModules } from 'esri-loader';

const options = {
    url: 'https://js.arcgis.com/4.25/init.js',
    css: 'https://js.arcgis.com/4.25/esri/themes/light/main.css',
}

export default {
    name: 'MapView',
    components: {},
    mounted: function () {
        this._createMapView();
    },
    methods: {
        async _createMapView() {
            const [Map, MapView] = await loadModules(
                ['esri/Map', 'esri/views/MapView'],
                options
            );

            const map = new Map({    // 实例化地图
                basemap: 'osm',
            });

            const view = new MapView({   // 实例化地图视图
                container: 'mapview',
                map: map,
                zoom: 15,
                center: [121.936125, 30.973266],
            });

            view.ui.components = [];   // 清除掉地图左上角默认的缩放图标

            console.log(view)
        }
    }
}
</script>
  
<style>
#mapview {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
  