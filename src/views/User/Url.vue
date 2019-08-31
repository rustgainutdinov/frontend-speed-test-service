<template>
  <a-row :gutter="20">
    <a-col :span="15">
      <DefaultBlock borderedTitle>
        <div slot="title">
          <div class="title">Статистика показателей ispring.ru/main</div>
        </div>
        <div slot="content">
          <UrlChart/>
        </div>
      </DefaultBlock>
    </a-col>
    <a-col :span="9">
      <DefaultBlock borderedTitle>
        <div slot="title">
          <div class="title">Упавшие показатели</div>
        </div>
        <div slot="content">
          <FallenIndicators/>
        </div>
      </DefaultBlock>
    </a-col>
    <a-col :span="24">
      <DefaultBlock borderedTitle>
        <div slot="title" class="indicatorsStatisticsChart">
          <div class="title">Список показателей</div>
          <a-select mode="multiple" :defaultValue="['a1', 'b2']" @change="handleChange" placeholder="Please select" class="indicators-list">
            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
          </a-select>
        </div>
        <div slot="content">
          <IndicatorsChart/>
        </div>
      </DefaultBlock>
    </a-col>
  </a-row>
</template>

<script>
	import DefaultBlock from '@/components/User/Block';
	import UrlChart from '@/components/Chart/UrlPageUrlStatistics';
	import FallenIndicators from '@/components/Chart/UrlPageFallenIndicators';
	import IndicatorsChart from '@/components/Chart/UrlPageIndicatorsStatistics';

	const columns = [{
		title: 'Показатель',
		dataIndex: 'url',
		width: '15%',
		scopedSlots: {customRender: 'url'},
	}];

	export default {
		name: "Url",
    components: {
			UrlChart,
      DefaultBlock,
			FallenIndicators,
			IndicatorsChart
    }
	}
</script>

<style lang="scss">
  .indicatorsStatisticsChart {
    display: flex;

    .title {
      line-height: 30px !important;
    }

    .indicators-list {
      width: 400px;

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
</style>
