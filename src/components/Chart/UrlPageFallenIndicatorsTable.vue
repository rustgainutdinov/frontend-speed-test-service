<template>
    <a-table :columns="columns" :dataSource="data" size="middle" :pagination="false" rowKey="indicator"
             class="fallen-indicators-table">
                        <span slot="indicator" slot-scope="text" class="indicator-title">
                            <span class="text">{{text}}</span>
                            <a v-if="auditsIndicatorsDescriptionList[text].link"
                               :href="auditsIndicatorsDescriptionList[text].link" target="_blank"><a-icon
                                    type="question-circle"/></a>
                        </span>
        <div slot="before" slot-scope="text" class="urls-table-chart">
            <a-progress :percent="text" :strokeColor="getColorByScoreForTable(text)" :width="50"
                        class="progress-bar" :strokeWidth="5"/>
        </div>

        <div slot="after" slot-scope="text" class="urls-table-chart">
            <a-progress :percent="text" :strokeColor="getColorByScoreForTable(text)" :width="50"
                        class="progress-bar" :strokeWidth="5"/>
        </div>

        <div slot="change" slot-scope="changeOn" class="urls-table-chart">
            <span :style="{color:getColorByChangedPercentForTable(changeOn)}"
                  class="changeOnCol">{{changeOn}} %</span>
        </div>
    </a-table>
</template>

<script>
    import auditsIndicatorsDescriptionList from "../../config/auditsIndicatorsDescriptionLinks";

    const columns = [{
        title: 'Наименование показателя',
        dataIndex: 'indicator',
        width: '20%',
        scopedSlots: {customRender: 'indicator'}
    }, {
        title: 'Средний показатель за период',
        dataIndex: 'before',
        scopedSlots: {customRender: 'before'},
        width: '30%',
        align: 'center'
    }, {
        title: 'Текущий показатель',
        dataIndex: 'after',
        scopedSlots: {customRender: 'after'},
        width: '30%',
        align: 'center'
    }, {
        title: 'Изменение на',
        dataIndex: 'change',
        scopedSlots: {customRender: 'change'},
        width: '20%',
        align: 'center'
    }];


    export default {
        name: "UrlPageFallenIndicatorsTable",
        data() {
            return {
                columns,
                auditsIndicatorsDescriptionList
            }
        },
        methods: {
            getColorByScoreForTable(performance) {
                if (performance >= 75) return 'rgba(10, 187, 135, 0.6)';
                else if (performance >= 50) return 'rgba(255, 184, 34, 0.6)';
                else if (performance > 0) return 'rgba(245, 34, 45, 0.6)';
            },
            getColorByChangedPercentForTable(performance) {
                if (performance < 15) return 'rgba(255, 184, 34, 0.8)';
                else return 'rgba(245, 34, 45, 0.8)';
            },
        },
        props: ['data']
    }
</script>

<style lang="scss">
    .fallen-indicators-table {
        .ant-table-body {
            tr {
                .indicator-title {
                    font: 16px/1.2em 'Source Sans Pro', sans-serif;

                    .text {
                        margin-right: 5px;
                    }
                }

                th:first-child, td:first-child {
                    padding-left: 20px !important;
                }

                th:last-child, td:first-child {
                    padding-right: 20px !important;
                }

                .progress-bar {
                    padding: 0 40px;
                }

                .changeOnCol {
                    font: 16px/1.2em 'Source Sans Pro', sans-serif,
                }
            }
        }
    }
</style>