<template>
    <div class="XZQHComponent-pannel" v-show="this.$store.getters._getDefaultXZQHVisible">
        <div class="XZQHComponent-header">
            <span>行政区划导航</span>
            <i class="el-icon-close" @click="closeXZQHPannel"></i>
        </div>
        <div class="XZQH-select-pannel">
            <span class="XZQH-select-label">省份：</span>
            <el-select
                v-model="provinceValue"
                @change="handleProvinceValueChange"
                size="mini"
                clearable
                placeholder="请选择省份"
            >
                <el-option v-for="item in provinceOptions" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="XZQH-content-pannel">
            <tbody>
                <tr v-for="item in cityAndCountyOptions" :key="item.label">
                    <td style="min-width: 50px; vertical-align: text-top">
                        <span class="city-item" :value="item.value" @click="handleItemClick(item.value, 'city')">
                            {{ item.label }}
                        </span>
                    </td>
                    <td>
                        <span
                            class="county-item"
                            v-for="item2 in item.children"
                            :key="item2.attributes.label"
                            :value="item2.attributes.Code"
                            @click="handleItemClick(item2.attributes.Code, 'county')"
                            >{{ item2.attributes.District }}</span
                        >
                    </td>
                </tr>
            </tbody>
        </div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import config from './config';

let graphic = '';

export default {
    name: 'XZQHComponent',
    components: {},
    data() {
        return {
            provinceOptions: [],
            provinceValue: '',
            cityAndCountyOptions: [],
        };
    },
    mounted: function () {
        this.getProvinceData();
    },
    methods: {
        //获取行政区划 省份数据
        async getProvinceData() {
            const _self = this;
            const [FeatureLayer, Query] = await loadModules(
                ['esri/layers/FeatureLayer', 'esri/rest/support/Query'],
                config.options,
            );
            const featureLayer = new FeatureLayer({
                url: 'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/China_Provinces_webMarcator/FeatureServer',
            });
            let query = new Query();
            query.returnGeometry = false;
            query.outFields = ['*'];
            query.where = '1=1';

            //Promise then 链式调用
            featureLayer.queryFeatures(query).then(function (results) {
                let currentData = [];
                if (results.features.length > 0) {
                    results.features.map((item) => {
                        currentData.push({
                            value: item.attributes.Code,
                            label: item.attributes.City,
                        });
                    });
                    _self.provinceOptions = currentData;
                } else {
                    _self.$message({
                        message: '暂时没有省份数据',
                        type: 'warning',
                    });
                }
            });
        },
        //行政区划 省份数据变化事件
        async handleProvinceValueChange(value) {
            this.getCityAndCountyData(value);
        },
        async getCityAndCountyData(value) {
            const _self = this;
            const provinceCode = value.toString().substring(0, 2);
            const [FeatureLayer, Query] = await loadModules(
                ['esri/layers/FeatureLayer', 'esri/rest/support/Query'],
                config.options,
            );
            const featureLayer = new FeatureLayer({
                url: 'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/China_Cities_webMarcator/FeatureServer',
            });
            let query = new Query();
            query.returnGeometry = false;
            query.outFields = ['*'];
            query.where = "Code like '" + provinceCode + "%'";

            //async await用法
            let results = await featureLayer.queryFeatures(query);
            let currentCityData = [];
            if (results.features.length > 0) {
                results.features.map((item) => {
                    currentCityData.push({
                        value: item.attributes.Code,
                        label: item.attributes.City,
                    });
                });
                //循环遍历 获取每一市级对应的区县数据
                Promise.all(
                    currentCityData.map(async (item2) => {
                        const cityCode = item2.value.toString().substring(0, 4);
                        const featureLayer2 = new FeatureLayer({
                            url: 'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/China_Counties_webMarcator/FeatureServer',
                        });
                        let query2 = new Query();
                        query2.returnGeometry = false;
                        query2.outFields = ['*'];
                        query2.where = "Code like '" + cityCode + "%'";

                        const result2 = await featureLayer2.queryFeatures(query2);
                        item2.children = result2.features;
                        return item2;
                    }),
                ).then((res) => {
                    this.cityAndCountyOptions = res;
                });
            } else {
                _self.$message({
                    message: '暂时没有市级数据',
                    type: 'warning',
                });
            }
        },
        //定位跳转并高亮
        async handleItemClick(val, type) {
            let serverUrl = '';
            let code = '';
            const view = this.$store.getters._getDefaultMapView;
            if (type === 'city') {
                code = val.toString().substring(0, 4);
                serverUrl =
                    'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/China_Cities_webMarcator/FeatureServer';
            } else if (type === 'county') {
                code = val.toString().substring(0, 6);
                serverUrl =
                    'https://services7.arcgis.com/rfJQF2MONqIFMBhn/arcgis/rest/services/China_Counties_webMarcator/FeatureServer';
            }
            const [FeatureLayer, Query, Graphic] = await loadModules(
                ['esri/layers/FeatureLayer', 'esri/rest/support/Query', 'esri/Graphic'],
                config.options,
            );
            const featureLayer = new FeatureLayer({
                url: serverUrl,
            });
            let query = new Query();
            query.returnGeometry = true;
            query.outFields = ['*'];
            query.where = "Code like '" + code + "%'";

            let results = await featureLayer.queryFeatures(query);

            //渲染和定位
            const featuresResult = results.features[0];
            if (graphic) {
                view.graphics.remove(graphic);
            }
            const fillSymbol = {
                type: 'simple-fill',
                color: [188, 240, 234, 0.1],
                outline: {
                    color: '#00FFFF',
                    width: 2,
                },
            };

            graphic = new Graphic({
                geometry: featuresResult.geometry,
                symbol: fillSymbol,
            });
            view.graphics.add(graphic);

            view.goTo({
                center: [
                    featuresResult.geometry.extent.center.longitude,
                    featuresResult.geometry.extent.center.latitude,
                ],
                zoom: 9,
            });
        },
        closeXZQHPannel() {
            const currentVisible = this.$store.getters._getDefaultXZQHVisible;
            this.$store.commit('_setDefaultXZQHVisible', !currentVisible);
        },
    },
};
</script>

<style>
.XZQHComponent-pannel {
    position: absolute;
    top: 15px;
    left: 30px;
    width: 400px;
    height: 600px;
    background-color: #E9E9EB;
    opacity: 0.75;
}
.XZQHComponent-header {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.XZQHComponent-header > span {
    line-height: 35px;
    font-size: 16px;
    font-weight: 600;
}
.XZQHComponent-header > i {
    line-height: 35px;
    cursor: pointer;
}
.XZQH-select-pannel {
    width: 100%;
    height: 30px;
    padding: 0 5px;
    box-sizing: border-box;
    margin: 5px 0;
}
.XZQH-select-label {
    font-size: 13px;
}
.XZQH-content-pannel {
    width: 100%;
    height: 525px;
    overflow: auto;
    padding: 0 5px;
    box-sizing: border-box;
}
.city-item {
    font-size: 12px;
    color: #444A51;
    font-weight: 600;
    cursor: pointer;
}
.county-item {
    font-size: 12px;
    color: #545C64;
    margin: 0 10px 5px 0;
    cursor: pointer;
}
.county-item:hover {
    color: #409eff;
}

.XZQHComponent-pannel tr {
    display: block; /*将tr设置为块体元素*/
    margin-bottom: 15px; /*设置tr间距为15px*/
}
</style>
