<template>
    <div class="mapview-pannel">
        <div id="mapview"></div>
        <div id="basemapToggle"></div>
        <div id="scaleBar"></div>
        <div id="zoom"></div>
    </div>
</template>
  
<script>
import { loadModules } from 'esri-loader';
import config from './../config';

export default {
    name: 'MapView',
    components: {},
    mounted: function () {
        // console.log(this.$store.getters._defaultMapView);
        this._createMapView();
    },
    methods: {
        async _createMapView() {
            const [Map, MapView, BasemapToggle, ScaleBar, Zoom] = await loadModules(
                [
                    'esri/Map', 
                    'esri/views/MapView', 
                    // 'esri/Basemap', 
                    // 'esri/layers/TileLayer', 
                    'esri/widgets/BasemapToggle', 
                    'esri/widgets/ScaleBar',
                    'esri/widgets/Zoom'
                ],
                config.options
            );

            // create a basemap from a dynamic mapserver
            // const basemap = new Basemap({
            // baseLayers: [
            //     new TileLayer({
            //     url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer",
            //     title: "Basemap"
            //     })
            // ],
            // title: "basemap",
            // id: "basemap"
            // });

            const map = new Map({    // 实例化地图
                basemap: "topo-vector",
            });

            const mapView = new MapView({   // 实例化地图视图
                container: 'mapview',
                map: map,
                zoom: 15,
                center: [121.938118,30.968362],
            });

            //实例化底图切换控件
            this.basemapToggle = new BasemapToggle({
                view: mapView,
                nextBasemap: 'hybrid',
                container: 'basemapToggle',
            });
            mapView.ui.add(this.basemapToggle);

            //实例化比例尺
            this.scaleBar = new ScaleBar({
                view: mapView,
                unit: 'metric',
                container: 'scaleBar',
            });
            mapView.ui.add(this.scaleBar);

            //实例化缩放控件
            this.zoom = new Zoom({
                view: mapView,
                container: 'zoom',
            });
            mapView.ui.add(this.zoom);

            mapView.ui.components = [];

            this.$store.commit('_setDefaultMapView', mapView)
        }
    }
}
</script>
  
<style>
.mapview-pannel,
#mapview {
    position: relative;
    width: 100%;
    height: 100%;
}
#basemapToggle {
    position: absolute;
    right: 15px;
    bottom: 15px;
}
#scaleBar {
    position: absolute;
    left: 15px;
    bottom: 15px;
}
#zoom {
    position: absolute;
    right: 20px;
    bottom: 100px;
}
</style>
  