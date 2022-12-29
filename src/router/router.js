import Vue from 'vue';
import VueRouter from 'vue-router';

import DataVisual from './../pages/DataVisual';
import WeatherForcast from './../pages/WeatherForcast'
import OneMap from './../pages/OneMap';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: DataVisual
        },
        {
            path: '/onemap',
            component: OneMap
        },
        {
            path: '/weatherforcast',
            component: WeatherForcast
        }
    ],
    mode: 'history'
});