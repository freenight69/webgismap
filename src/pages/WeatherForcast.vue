<template>
    <div class="weatherforcast-page">
        <iframe width="100%" height="100%" src="https://embed.windy.com/embed2.html?lat=30.918&lon=121.887&detailLat=30.971&detailLon=121.942&width=650&height=450&zoom=11&level=surface&overlay=temp&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=true&metricWind=m%2Fs&metricTemp=%C2%B0C&radarRange=-1" frameborder="0"></iframe>
    </div>
</template>
  
<script>
export default {
    name: 'WeatherForcast',
    components: {
    },
    methods: {
    }
}
</script>
  
<style>
.weatherforcast-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>