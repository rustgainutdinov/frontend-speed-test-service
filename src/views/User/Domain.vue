<template>
  <a-row :gutter="20">
    <a-col :span="14">
      <DefaultBlock>
        <div slot="content" class="domain-page-domain-statistics">
          <div class="block-title">
            <div class="title">ispring.ru</div>
            <a-range-picker class="date-picker"/>
          </div>
          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="mobile" key="1">
              <DomainChart/>
            </a-tab-pane>
            <a-tab-pane tab="desktop" key="2" forceRender>
              <DomainChart/>
            </a-tab-pane>
          </a-tabs>
        </div>
      </DefaultBlock>
    </a-col>
    <a-col :span="10">
      <DefaultBlock title>
        <div slot="title">
          <div class="title">Список url-ов</div>
        </div>
        <div slot="content" class="urls-list">
          <a-table :columns="columns" :dataSource="data" size="middle" :pagination="false" :rowSelection="rowSelection">
            <span slot="url" slot-scope="text, record">{{text}} <a-icon type="link"/></span>
            <div slot="mobile-score" slot-scope="text, record" class="urls-table-chart">
              <a-progress type="circle" :percent="text.value" :strokeColor="text.color" :width="50"/>
            </div>

            <div slot="desktop-score" slot-scope="text, record" class="urls-table-chart">
              <a-progress type="circle" :percent="text.value" :strokeColor="text.color" :width="50"/>
            </div>
          </a-table>
        </div>
      </DefaultBlock>
    </a-col>
  </a-row>
</template>

<script>
	import DefaultBlock from '@/components/User/Block';
	import DomainChart from '@/components/Chart/DomainPageStatistics';

	const columns = [{
		title: 'Url',
		dataIndex: 'url',
		width: '34%',
		scopedSlots: {customRender: 'url'},
	}, {
		title: 'Mobile score',
		dataIndex: 'mobile-score',
		scopedSlots: {customRender: 'mobile-score'},
		width: '33%',
		align: 'center'
	}, {
		title: 'Desktop score',
		dataIndex: 'desktop-score',
		scopedSlots: {customRender: 'desktop-score'},
		width: '33%',
		align: 'center'
	}];

	const data = [{
		key: '1',
		url: 'ispring.ru',
		'desktop-score': {
			value: 95,
			color: '#0abb87'
		},
		'mobile-score': {
			value: 51,
			color: '#ffb822'
		},
		actions: {
			favourite: true
		},
	}, {
		key: '2',
		url: 'travelline.ru',
		'desktop-score': {
			value: 81,
			color: ''
		},
		'mobile-score': {
			value: 45,
			color: '#f5222d'
		},
		actions: {
			favourite: false
		},
	}, {
		key: '3',
		url: 'moneta.ru',
		'desktop-score': {
			value: 73,
			color: ''
		},
		'mobile-score': {
			value: 82,
			color: '#0abb87'
		},
		actions: {
			favourite: true
		},
	}];

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
		},
		onSelect: (record, selected, selectedRows) => {
		},
		onSelectAll: (selected, selectedRows, changeRows) => {
		},
	};

	export default {
		name: "Domain",
		components: {
			DefaultBlock,
			DomainChart,
		},
		data() {
			return {
				columns,
				data,
				rowSelection
			}
		},
		methods: {}
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
