<template>
    <div class="morescreen-view">
        <div class="morescreen-top-view">
            <div id="top-left" class="map-item"></div>
            <div id="top-right" class="map-item"></div>
        </div>
        <div class="morescreen-bottom-view">
            <div id="buttom-left" class="map-item"></div>
            <div id="buttom-right" class="map-item"></div>
        </div>
    </div>
</template>


<script>
import { loadModules } from 'esri-loader';
import config from './config';

export default {
    name: 'MoreScreen',
    mounted: function () {
        this._initMap();
    },
    methods: {
        async _initMap() {
            const [Map, MapView, watchUtils] = await loadModules(
                ['esri/Map', 'esri/views/MapView', 'esri/core/watchUtils'],
                config.options,
            );

            const map01 = new Map({
                basemap: "hybrid",
            });
            const mapView01 = new MapView({
                container: 'top-left',
                map: map01,
                zoom: 10,
                center: [104.072745, 30.663774],
            });

            const map02 = new Map({
                basemap: "topo-vector",
            });
            const mapView02 = new MapView({
                container: 'top-right',
                map: map02,
                zoom: 10,
                center: [104.072745, 30.663774],
            });

            const map03 = new Map({
                basemap: "streets-vector",
            });
            const mapView03 = new MapView({
                container: 'buttom-left',
                map: map03,
                zoom: 10,
                center: [104.072745, 30.663774],
            });

            const map04 = new Map({
                basemap: "satellite",
            });
            const mapView04 = new MapView({
                container: 'buttom-right',
                map: map04,
                zoom: 10,
                center: [104.072745, 30.663774],
            });

            mapView01.ui.components = [];
            mapView02.ui.components = [];
            mapView03.ui.components = [];
            mapView04.ui.components = [];

            //地图联动
            // 防止循环联动标志
            var flag1 = true, flag2 = true, flag3 = true, flag4 = true;

            watchUtils.whenTrue(mapView01, 'stationary', function () {
                // Get the new center of the view only when view is stationary.
                if (flag1) {
                    mapView02.goTo({
                        center: [mapView01.center.longitude, mapView01.center.latitude],
                        zoom: mapView01.zoom,
                    });
                    mapView03.goTo({
                        center: [mapView01.center.longitude, mapView01.center.latitude],
                        zoom: mapView01.zoom,
                    });
                    mapView04.goTo({
                        center: [mapView01.center.longitude, mapView01.center.latitude],
                        zoom: mapView01.zoom,
                    });
                    flag2 = false, flag3 = false, flag4 = false;
                }else if (!flag1) {
                    flag1 = true;
                }
            });

            watchUtils.whenTrue(mapView02, 'stationary', function () {
                // Get the new center of the view only when view is stationary.
                if (flag2) {
                    mapView01.goTo({
                        center: [mapView02.center.longitude, mapView02.center.latitude],
                        zoom: mapView02.zoom,
                    });
                    mapView03.goTo({
                        center: [mapView02.center.longitude, mapView02.center.latitude],
                        zoom: mapView02.zoom,
                    });
                    mapView04.goTo({
                        center: [mapView02.center.longitude, mapView02.center.latitude],
                        zoom: mapView02.zoom,
                    });
                    flag1 = false, flag3 = false, flag4 = false;
                }else if (!flag2) {
                    flag2 = true;
                }
            });

            watchUtils.whenTrue(mapView03, 'stationary', function () {
                // Get the new center of the view only when view is stationary.
                if (flag3) {
                    mapView02.goTo({
                        center: [mapView03.center.longitude, mapView03.center.latitude],
                        zoom: mapView03.zoom,
                    });
                    mapView01.goTo({
                        center: [mapView03.center.longitude, mapView03.center.latitude],
                        zoom: mapView03.zoom,
                    });
                    mapView04.goTo({
                        center: [mapView03.center.longitude, mapView03.center.latitude],
                        zoom: mapView03.zoom,
                    });
                    flag2 = false, flag1 = false, flag4 = false;
                }else if (!flag3) {
                    flag3 = true;
                }
            });

            watchUtils.whenTrue(mapView04, 'stationary', function () {
                // Get the new center of the view only when view is stationary.
                if (flag4) {
                    mapView02.goTo({
                        center: [mapView04.center.longitude, mapView04.center.latitude],
                        zoom: mapView04.zoom,
                    });
                    mapView03.goTo({
                        center: [mapView04.center.longitude, mapView04.center.latitude],
                        zoom: mapView04.zoom,
                    });
                    mapView01.goTo({
                        center: [mapView04.center.longitude, mapView04.center.latitude],
                        zoom: mapView04.zoom,
                    });
                    flag2 = false, flag3 = false, flag1 = false;
                }else if (!flag4) {
                    flag4 = true;
                }
            });

        },
    },
};
</script>


<style>
.morescreen-view {
    width: 100%;
    height: 100%;
}
.map-item {
    width: calc(50% - 2.5px);
    height: 100%;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
}
.morescreen-top-view {
    width: 100%;
    height: calc(50% - 2.5px);
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5px;
}
.morescreen-bottom-view {
    width: 100%;
    height: calc(50% - 2.5px);
    display: flex;
    justify-content: space-between;
    margin-top: 2.5px;
}
#top-left {
    margin-right: 2.5px;
}
#top-right {
    margin-left: 2.5px;
}
#buttom-left {
    margin-right: 2.5px;
}
#buttom-right {
    margin-left: 2.5px;
}
</style>
