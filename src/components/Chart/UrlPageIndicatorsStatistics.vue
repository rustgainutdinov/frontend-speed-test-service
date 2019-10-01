<template>
    <div class="chart">
        <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="padding">
            <v-tooltip/>
            <v-axis/>
            <v-smooth-line position="date*value" :size="lineSize" color="indicator"/>
            <v-point position="date*value" color="indicator" :size="pointSize" :v-style="style" :shape="'circle'"/>
            <v-legend/>
            <!--<v-area position="year*value" color="page"/>-->
        </v-chart>
    </div>
</template>

<script>
    const padding = [50, 50, 150];

    const scale = [{
        dataKey: 'value',
        min: 0,
        max: 1
    }, {
        dataKey: 'date'
    }];
    export default {
        name: "DomainPageStatistics",
        data() {
            return {
                scale,
                height: 500,
                padding,
                style: {stroke: '#fff', lineWidth: 1},
                lineSize: ['name', function (name) {
                    if (name === 'performance') {
                        return 5;
                    }
                    return 2;
                }],
                pointSize: ['name', function (name) {
                    if (name === 'performance') {
                        return 6;
                    }
                    return 4;
                }]
            }
        },
        props: ['data']
    }
</script>

<style>

</style>
