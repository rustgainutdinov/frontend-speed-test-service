<template>
    <div class="chart">
        <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="padding">
            <v-tooltip/>
            <v-axis/>
            <v-smooth-line position="date*value" :size="2" color="name"/>
            <v-point position="date*value" color="name" :size="4" :v-style="style" :shape="'circle'"/>
            <v-legend/>
            <!--<v-area position="year*value" color="page"/>-->
        </v-chart>
    </div>
</template>

<script>
    const padding = [50, 50, 150];

    const scale = [{
        dataKey: 'value'
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
                style: {stroke: '#fff', lineWidth: 1}
            }
        },
        props: ['data'],
        beforeMount() {
            console.log(this.data);
        }
    }
</script>

<style>

</style>
