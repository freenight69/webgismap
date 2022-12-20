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
        // console.log(this.$store.getters._defaultMapView);
        this._createMapView();
    },
    methods: {
        async _createMapView() {
            const [Map, MapView, Basemap, TileLayer, BasemapToggle, ScaleBar] = await loadModules(
                [
                    'esri/Map', 
                    'esri/views/MapView', 
                    'esri/Basemap', 
                    'esri/layers/TileLayer', 
                    'esri/widgets/BasemapToggle', 
                    'esri/widgets/ScaleBar'
                ],
                options
            );

            // create a basemap from a dynamic mapserver
            const basemap = new Basemap({
            baseLayers: [
                new TileLayer({
                url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer",
                title: "Basemap"
                })
            ],
            title: "basemap",
            id: "basemap"
            });

            const map = new Map({    // 实例化地图
                basemap,
            });

            const mapView = new MapView({   // 实例化地图视图
                container: 'mapview',
                map: map,
                zoom: 15,
                center: [121.938118,30.966362],
            });

            // 实例化底图切换控件
            const basemapToggle = new BasemapToggle({
                view: mapView,  // The view that provides access to the map's "streets-vector" basemap
                nextBasemap: "hybrid"  // Allows for toggling to the "hybrid" basemap
            });
            // Add the widget to the top-right corner of the view
            mapView.ui.add(basemapToggle, {
                position: "bottom-right"
            });

            // 实例化比例尺控件
            const scaleBar = new ScaleBar({
                view: mapView,
                unit: 'metric'
            });
            // Add widget to the bottom left corner of the view
            mapView.ui.add(scaleBar, {
                position: "bottom-left"
            });

            // mapView.ui.components = [];   // 清除掉地图左上角默认的缩放图标

            this.$store.commit('_setDefaultMapView', mapView)
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
  