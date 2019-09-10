<template>
    <div>
        <v-chart
                :forceFit="true"
                :data="viewData"
                :padding="padding"
                height="500"
        >
            <v-tooltip :showTitle="false"/>
            <v-legend dataKey="indicator"></v-legend>
            <v-coord type='theta' :radius="0.5" :innerRadius="0.3"/>
            <v-pie position='change' :color="color" :opacity="1" :vStyle="pieStyle" :label="label"/>
            <v-view :data="data">
                <v-coord type='theta' :radius="0.8" :innerRadius="0.5 / 0.8"/>
                <v-pie position='change' :color="color" :opacity="1" :vStyle="pieStyle" :label="labelConfig"/>
            </v-view>
        </v-chart>
    </div>
</template>

<script>
    const color = ['mode', ['#1890ff', '#13c2c2', '#ffc53d', '#73d13d']];

    const scale = [{
        dataKey: 'change',
        min: 0,
        formatter: '.0%',
    }];

    const label = ['mode', {
        offset: -5,
        textStyle: {
            fill: 'white',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
        }
    }];


    export default {
        name: 'UrlPageFallenIndicators',
        data() {
            return {
                color,
                scale,
                height: 500,
                pieStyle: {
                    stroke: "#fff",
                    lineWidth: 3,
                },
                padding: [0, 130, 50],
                label,
                labelConfig: ['change', {
                    formatter: (val, item) => {
                        return item.point.indicator + ': ' + val;
                    }
                }],
            };
        },
        props: ['data'],
        computed: {
            viewData() {
                let mobileSumData = {};
                let desktopSumData = {};

                this.data.forEach(item => {
                    if (item.mode === 'mobile') {
                        mobileSumData = {
                            mode: item.mode,
                            change: item.sumChange
                        }
                    } else {
                        desktopSumData = {
                            mode: item.mode,
                            change: item.sumChange
                        }
                    }
                });

                return [mobileSumData, desktopSumData];
            }
        }
    };
</script>
