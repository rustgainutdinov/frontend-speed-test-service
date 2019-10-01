<template>
  <div class="chart">
    <v-chart :forceFit="true" :height="height" :data="chartData" :scale="scale" :padding="padding">
      <v-tooltip/>
      <v-axis/>
      <v-smooth-line position="date*value" :size="2" color="url"/>
      <v-point position="date*value" color="url" :size="4" :v-style="style" :shape="'circle'"/>
      <v-legend/>
      <!--<v-area position="year*value" color="page"/>-->
    </v-chart>
  </div>
</template>

<script>
	const padding = [50, 50, 80];

	const scale = [{
		dataKey: 'date'
	}, {
		dataKey: 'value',
	}];
	export default {
		name: "DomainPageStatistics",
		data() {
			return {
				scale,
				height: 500,
				padding,
				data: [],
				style: {stroke: '#fff', lineWidth: 1}
			}
		},
		methods: {
			changeData() {
				const count = 7;
				this.data = [];
				for (let i = 0; i < count * 3; i++) {
					this.data.push({
						page: Math.floor(i / count).toString(),
						year: (i % count).toString() + ' Марта',
						value: 50 + Math.round(Math.random() * 20)
					});
				}
			}
		},
		beforeMount() {
			this.changeData();
			setInterval(() => {
				this.changeData();
			}, 1000);
		},
		props: ['chartData']
	}
</script>

<style>

</style>
