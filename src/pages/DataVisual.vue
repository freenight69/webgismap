<template>
    <div class="datavisual-page">
        <iframe width="650" height="450" src="https://embed.windy.com/embed2.html?lat=30.943&lon=121.907&detailLat=30.943&detailLon=121.907&width=650&height=450&zoom=11&level=surface&overlay=temp&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=m%2Fs&metricTemp=%C2%B0C&radarRange=-1" frameborder="0"></iframe>
    </div>
</template>
  
<script>
export default {
    name: 'DataVisual',
    components: {
    },
    methods: {
    }
}
</script>
  
<style>
.datavisual-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>