<template>
  <a-row :gutter="20">
    <a-col :span="12"
           v-for="(data, domain) in statisticsData">
      <DefaultBlock>
        <div slot="content" class="domain-statistics">
          <div class="block-title">
            {{domain}}
          </div>
          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="mobile" key="1">
              <DomainChart color="#a1c4fd" :data="data.mobile"/>
            </a-tab-pane>
            <a-tab-pane tab="desktop" key="2" forceRender>
              <DomainChart color="#96e6a1" :data="data.desktop"/>
            </a-tab-pane>
          </a-tabs>
        </div>
      </DefaultBlock>
    </a-col>
  </a-row>
</template>

<script>
	import DefaultBlock from '@/components/User/Block';
	import DomainChart from '@/components/Chart/MainPageDomainStatistics'

	export default {
		name: "Main",
		components: {
			DefaultBlock,
			DomainChart
		},
		data() {
			return {
				statisticsData: []
			}
		},
		async beforeMount() {
			await this.$http.get('/test/get_statistics_for_main_page', {
				params: {
					token: this.$store.getters.userData.token
				}
			})
			.then((res) => {
				const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

				for (let i in res.data) {
					for (let k in res.data[i]) {
						res.data[i][k].forEach(item => {
							const date = new Date(item['date']);
							item['date'] = `${date.getDate()} ${months[date.getMonth()]  }`
						});
					}
				}
				this.statisticsData = res.data;
			})
			.catch((error) => {
				if (error.response) {
					this.$message.error(error.response.data, 10);
				} else {
					// console.log(error);
				}
			})
		}
	}
</script>

<style lang="scss">
  .domain-statistics {
    .ant-tabs-nav-scroll {
      display: flex;
      flex-direction: row-reverse;
    }

    .block-title {
      position: absolute;
      color: #48465b;
      padding: 13px 15px 0;
      font: 16px/1.2em 'Open Sans', sans-serif;
    }

    .chart {
      margin-bottom: -5px;

      canvas {
        border-radius: 4px;
      }
    }
  }
</style>
