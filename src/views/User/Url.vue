<template>
    <a-row :gutter="20">
        <a-col :span="24">
            <DefaultBlock borderedTitle class="main-url-indicators-chart">
                <div slot="title">
                    <div class="title">Статистика показателей <a :href="'http://' + urlName"
                                                                 target="_blank">{{urlName}}</a></div>
                </div>
                <div slot="content">
                    <UrlChart :data="mainChartData"/>
                </div>
            </DefaultBlock>
        </a-col>
        <a-col :span="11">
            <DefaultBlock borderedTitle class="fallen-indicators-chart">
                <div slot="title" class="title-block">
                    <div class="title">Упавшие показатели</div>
                    <div class="space"></div>
                    <a-range-picker class="date-picker"
                                    :format="dateFormat"
                                    :defaultValue="[moment(getLastWeekDay, dateFormat), moment(getToday, dateFormat)]"
                                    @change="onDateChange"/>
                </div>
                <div slot="content">
                    <FallenIndicators :data="fallenIndicatorsData"/>
                </div>
            </DefaultBlock>
        </a-col>
        <a-col :span="13">
            <DefaultBlock title class="indicators-statistics-chart">
                <div slot="title">
                    <div class="text-block">
                        <div class="title">Список показателей</div>
                        <div class="space"></div>
                        <a-range-picker class="date-picker"
                                        :format="dateFormat"
                                        :defaultValue="[moment(getLastWeekDay, dateFormat), moment(getToday, dateFormat)]"
                                        @change="onIndicatorsChartDateChange"/>
                    </div>
                    <a-select mode="multiple" :defaultValue="defaultSelectedIndicators"
                              @change="handleIndicatorsListChange"
                              placeholder="Please select" class="indicators-list">
                        <a-select-option v-for="item in filteredIndicators" :key="item">
                            {{item}}
                        </a-select-option>
                    </a-select>
                </div>
                <div slot="content">
                    <a-tabs defaultActiveKey="1">
                        <a-tab-pane tab="mobile" key="1">
                            <IndicatorsChart :data="indicatorsChartData.mobile"/>
                        </a-tab-pane>
                        <a-tab-pane tab="desktop" key="2" forceRender>
                          <IndicatorsChart :data="indicatorsChartData.desktop"/>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </DefaultBlock>
        </a-col>
    </a-row>
</template>

<script>
    import date from 'date-and-time';
    import moment from 'moment';
    import DefaultBlock from '@/components/User/Block';
    import UrlChart from '@/components/Chart/UrlPageUrlStatistics';
    import FallenIndicators from '@/components/Chart/UrlPageFallenIndicators';
    import IndicatorsChart from '@/components/Chart/UrlPageIndicatorsStatistics';
    import auditsIndicators from "../../config/auditsIndicators";

    const defaultSelectedIndicators = ['performance'];

    export default {
        name: "Url",
        components: {
            UrlChart,
            DefaultBlock,
            FallenIndicators,
            IndicatorsChart
        },
        data() {
            return {
                urlName: this.$route.query.url,
                mainChartData: [],
                fallenIndicatorsData: [],
                dateFormat: 'YYYY-MM-DD',
                selectedStartDate: null,
                selectedEndDate: null,
                indicatorsChartSelectedStartDate: null,
                indicatorsChartSelectedEndDate: null,
                auditsIndicators,
                defaultSelectedIndicators,
                selectedAuditIndicators: defaultSelectedIndicators,
                indicatorsChartData: {}
            }
        },
        methods: {
            moment,
            handleIndicatorsListChange(selectedItems) {
                this.selectedAuditIndicators = selectedItems;
                this.getDataForSelectedIndicatorsChart();
            },
            onDateChange(date, dateString) {
                this.selectedStartDate = dateString[0];
                this.selectedEndDate = dateString[1];
                this.getDataForFallenIndicatorsChart();
            },
            onIndicatorsChartDateChange(date, dateString) {
                this.indicatorsChartSelectedStartDate = dateString[0];
                this.indicatorsChartSelectedEndDate = dateString[1];
                this.getDataForSelectedIndicatorsChart();
            },
            getMainChartData() {
                this.$http.get('/test/get_all_indicators_by_url_name', {
                    params: {
                        token: this.$store.getters.userData.token,
                        url: this.urlName
                    }
                })
                    .then((res) => {
                        this.mainChartData = res.data;
                    })
                    .catch((error) => {
                        if (error.response) {
                            this.$message.error(error.response.data, 10);
                        } else {
                            // console.log(error);
                        }
                    })
            },
            getDataForFallenIndicatorsChart() {
                this.$http.get('/test/get_fallen_indicators_for_chart_bar_in_url_page', {
                    params: {
                        token: this.$store.getters.userData.token,
                        url: this.urlName,
                        startDate: this.selectedStartDate,
                        endDate: date.format(date.addDays(new Date(this.selectedEndDate), 1), this.dateFormat),
                    }
                })
                    .then((res) => {
                        this.fallenIndicatorsData = res.data;
                    })
                    .catch((error) => {
                        if (error.response) {
                            this.$message.error(error.response.data, 10);
                        } else {
                            // console.log(error);
                        }
                    })
            },
            getDataForSelectedIndicatorsChart() {
                this.$http.get('/test/get_selected_indicators_by_url_and_date', {
                    params: {
                        token: this.$store.getters.userData.token,
                        url: this.urlName,
                        startDate: this.indicatorsChartSelectedStartDate,
                        endDate: date.format(date.addDays(new Date(this.indicatorsChartSelectedEndDate), 1), this.dateFormat),
                        indicators: this.selectedAuditIndicators.toString(),
                    }
                })
                    .then((res) => {
                        for (let k in res.data) {
                            res.data[k].forEach(item => {
                                item['date'] = date.format(new Date(item['date']), 'DD MMM');
                            });
                        }
                        this.indicatorsChartData = res.data;
                    })
                    .catch((error) => {
                        if (error.response) {
                            this.$message.error(error.response.data, 10);
                        } else {
                            // console.log(error);
                        }
                    })
            }
        },
        computed: {
            filteredIndicators() {
                return auditsIndicators.filter(o => !this.selectedAuditIndicators.includes(o));
            },
            getToday() {
                return date.format(new Date(), this.dateFormat);
            },
            getLastWeekDay() {
                return date.format(date.addDays(new Date(), -7), this.dateFormat);
            }
        },
        beforeMount() {
            this.selectedStartDate = this.indicatorsChartSelectedStartDate = this.getLastWeekDay;
            this.selectedEndDate = this.indicatorsChartSelectedEndDate = this.getToday;
            this.getMainChartData();
            this.getDataForFallenIndicatorsChart();
            this.getDataForSelectedIndicatorsChart();
        },
    }
</script>

<style lang="scss">
    .main-url-indicators-chart {
        a {
            margin-left: 5px;
            text-decoration: underline;
        }
    }

    .fallen-indicators-chart {
        .title-block {
            width: 100%;
            display: flex;

            .title {
                font: 16px/30px 'Open Sans', sans-serif;
                color: #48465b;
                margin-right: 10px;
            }

            .space {
                flex-grow: 1;
            }

            .date-picker {
                display: block;

                .ant-calendar-picker-input {
                    border: none;
                    background: rgb(228, 240, 254);

                    .ant-calendar-range-picker-separator, .ant-calendar-picker-icon,
                    .ant-calendar-range-picker-input::-webkit-input-placeholder {
                        color: rgba(61, 148, 251, 0.8);
                    }
                }

                .ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active {
                    box-shadow: none;
                }
            }
        }
    }

    .indicators-statistics-chart {
        .block-title {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-bottom: 0;

            .text-block {
                width: 100%;
                display: flex;
                margin-bottom: 15px;

                .title {
                    line-height: 30px !important;
                }

                .space {
                    flex-grow: 1;
                }

                .date-picker {
                    display: block;

                    .ant-calendar-picker-input {
                        border: none;
                        background: rgb(228, 240, 254);

                        .ant-calendar-range-picker-separator, .ant-calendar-picker-icon,
                        .ant-calendar-range-picker-input::-webkit-input-placeholder {
                            color: rgba(61, 148, 251, 0.8);
                        }
                    }

                    .ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active {
                        box-shadow: none;
                    }
                }
            }

            .indicators-list {
                width: 100%;

                .ant-select-selection {
                    border: none;
                    background: rgb(228, 240, 254);

                    .ant-select-selection__choice {
                        border: none;
                        margin-top: 4px;
                    }
                }
            }
        }

        .ant-tabs-bar {
            margin-top: 16px;

            .ant-tabs-nav-scroll {
                display: flex;
                flex-direction: row-reverse;
            }

            .ant-tabs-tab {
                padding: 2px 16px 22px;
            }
        }
    }
</style>
