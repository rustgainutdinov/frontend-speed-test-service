<template>
    <a-row :gutter="20">
        <a-col :span="24">
            <DefaultBlock>
                <div slot="content" class="domain-page-domain-statistics">
                    <div class="block-title">
                        <div class="title">{{domainName}}</div>
                        <a-range-picker class="date-picker"
                                        :format="dateFormat"
                                        :defaultValue="[moment(getLastWeekDay, dateFormat), moment(getToday, dateFormat)]"
                                        @change="onDateChange"/>
                        <a-checkbox @change="onUserSubscribedToDomainChanged" class="domain-subscribed-checkbox"
                                    :checked="userSubscribedToDomain"> Подписка на домен
                        </a-checkbox>
                    </div>
                    <a-tabs defaultActiveKey="1">
                        <a-tab-pane tab="mobile" key="1">
                            <DomainChart :chartData="mobileChartData"/>
                        </a-tab-pane>
                        <a-tab-pane tab="desktop" key="2" forceRender>
                            <DomainChart :chartData="desktopChartData"/>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </DefaultBlock>
        </a-col>
        <a-col :span="24">
            <DefaultBlock title>
                <div slot="title">
                    <div class="title">Список url-ов</div>
                </div>
                <div slot="content" class="urls-list">
                    <a-table :columns="columns" :dataSource="urlsListData" size="middle" :pagination="false"
                             :rowSelection="{onChange: onTableChange}"
                             rowKey="url">
                        <span slot="url" slot-scope="text">
                          <router-link
                                  :to="{ path: `${domainName}/url-info`, query: {url: text}}">{{text}} </router-link>
                          <a :href="'http://' + text" target="_blank"><a-icon type="link"/></a>
                        </span>
                        <div slot="mobile_performance" slot-scope="text" class="urls-table-chart">
                            <a-progress type="circle" :percent="Math.round(text.value * 100)" :strokeColor="text.color"
                                        :width="50"/>
                        </div>

                        <div slot="desktop_performance" slot-scope="text" class="urls-table-chart">
                            <a-progress type="circle" :percent="Math.round(text.value * 100)" :strokeColor="text.color"
                                        :width="50"/>
                        </div>
                    </a-table>
                </div>
            </DefaultBlock>
        </a-col>
    </a-row>
</template>

<script>
    import date from 'date-and-time';
    import moment from 'moment';
    import DefaultBlock from '@/components/User/Block';
    import DomainChart from '@/components/Chart/DomainPageStatistics';

    const columns = [{
        title: 'Url',
        dataIndex: 'url',
        width: '34%',
        scopedSlots: {customRender: 'url'},
    }, {
        title: 'Mobile score',
        dataIndex: 'mobile_performance',
        scopedSlots: {customRender: 'mobile_performance'},
        width: '33%',
        align: 'center'
    }, {
        title: 'Desktop score',
        dataIndex: 'desktop_performance',
        scopedSlots: {customRender: 'desktop_performance'},
        width: '33%',
        align: 'center'
    }];

    export default {
        name: "Domain",
        components: {
            DefaultBlock,
            DomainChart,
        },
        data() {
            return {
                columns,
                urlsListData: [],
                dateFormat: 'YYYY-MM-DD',
                selectedUrls: [],
                selectedStartDate: null,
                selectedEndDate: null,
                mobileChartData: [],
                desktopChartData: [],
                userSubscribedToDomain: false
            }
        },
        methods: {
            moment,
            getColorByPerformanceForTable(performance) {
                if (performance >= .75) return '#0abb87';
                else if (performance >= .5) return '#ffb822';
                else if (performance > 0) return '#f5222d';
            },
            onTableChange(selectedRowKeys, selectedRows) {
                this.selectedUrls = [];
                selectedRows.forEach(item => {
                    this.selectedUrls.push(item.url);
                });
                this.getDataForChart();
            },
            onDateChange(date, dateString) {
                this.selectedStartDate = dateString[0];
                this.selectedEndDate = dateString[1];
                this.getDataForChart();
            },
            getUrlsList() {
                this.$http.get('/domain/get_urls_list_with_performance', {
                    params: {
                        token: this.$store.getters.userData.token,
                        domain: this.domainName
                    }
                })
                    .then((res) => {
                        for (let key in res.data) {
                            res.data[key]['mobile_performance'] = {
                                value: res.data[key]['mobile_performance'],
                                color: this.getColorByPerformanceForTable(res.data[key][['mobile_performance']])
                            };

                            res.data[key]['desktop_performance'] = {
                                value: res.data[key]['desktop_performance'],
                                color: this.getColorByPerformanceForTable(res.data[key][['desktop_performance']])
                            };
                        }
                        this.urlsListData = res.data;
                    });
            },
            getDataForChart() {
                this.$http.get('/test_data_getters/get_performance_data_by_url_and_date', {
                    params: {
                        token: this.$store.getters.userData.token,
                        startDate: this.selectedStartDate,
                        endDate: date.format(date.addDays(new Date(this.selectedEndDate), 1), this.dateFormat),
                        urls: this.selectedUrls,
                    }
                }).then((res) => {
                    for (let k in res.data) {
                        res.data[k].forEach(item => {
                            item['date'] = date.format(new Date(item['date']), 'DD MMM');
                        });
                    }
                    this.mobileChartData = res.data.mobile;
                    this.desktopChartData = res.data.desktop;
                });
            },
            onUserSubscribedToDomainChanged(e) {
                let route = '';
                if (e.target.checked) {
                    route = 'subscribe_to_domain';
                } else {
                    route = 'unsubscribe_to_domain';
                }
                this.$http.post('/user/' + route, undefined, {
                    params: {
                        token: this.$store.getters.userData.token,
                        domain: this.domainName,
                    }
                })
                    .then(() => {
                        this.getUserSubscribedInfo();
                        this.$message.success('Изменения успешно сохранены', 5);
                    })
                    .catch((error) => {
                        this.$message.error('Изменения не сохранены', 5);
                        if (error.response) {
                            this.$message.error(error.response.data, 5);
                        } else {
                            // console.log(error);
                        }
                    })
            },
            getUserSubscribedInfo() {
                this.$http.get('/user/get_user_subscriptions', {
                    params: {
                        token: this.$store.getters.userData.token
                    }
                }).then((res) => {
                    this.userSubscribedToDomain = false;
                    res.data.forEach(domainItem => {
                        if (domainItem.domain === this.domainName) {
                            this.userSubscribedToDomain = true;
                        }
                    })
                });
            }
        },
        computed: {
            getToday() {
                return date.format(new Date(), this.dateFormat);
            },
            getLastWeekDay() {
                return date.format(date.addDays(new Date(), -7), this.dateFormat);
            },
            domainName() {
                return this.$route.params.domainName
            }
        },
        beforeMount() {
            this.selectedStartDate = this.getLastWeekDay;
            this.selectedEndDate = this.getToday;
            this.getUrlsList();
            this.getUserSubscribedInfo();
        }
    }
</script>

<style lang="scss">
    .domain-page-domain-statistics {
        .block-title {
            position: absolute;
            z-index: 1;
            display: flex;
            padding: 14px 20px 0;

            .title {
                font: 16px/30px 'Open Sans', sans-serif;
                color: #48465b;
                margin-right: 30px;
            }

            .space {
                flex-grow: 1;
            }

            .select-button {
                border: none;
                background: rgb(228, 240, 254);
                color: rgba(61, 148, 251, 1);
            }

            .date-picker {
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

            .domain-subscribed-checkbox {
                font: 14px/30px 'Open Sans', sans-serif;
                color: #48465b;
                margin-left: 30px;
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

    .urls-list {
        .block-title {
            padding: 20px;

            .title {
                color: #48465b;
                font: 16px/1.2em 'Noto Sans', sans-serif;
            }
        }

        .urls-table-chart {
            margin: 5px auto;
        }

        .ant-table-row:last-child {
            td {
                border-bottom: none;
            }
        }
    }
</style>
