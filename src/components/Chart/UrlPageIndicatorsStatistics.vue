<template>
  <div class="chart">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="padding">
      <v-tooltip/>
      <v-axis/>
      <v-smooth-line position="year*value" :size="2" color="page"/>
      <v-point position="year*value" color="page" :size="4" :v-style="style" :shape="'circle'"/>
      <v-legend/>
      <!--<v-area position="year*value" color="page"/>-->
    </v-chart>
  </div>
</template>

<script>
	const padding = [50, 50, 80];

	let data = [];

	const count = 7;

	for (let i = 0; i < count * 3; i++) {
		data.push({
			page: Math.floor(i / count).toString(),
			year: (i % count).toString() + ' Марта',
			value: 50 + Math.round(Math.random() * 20)
		});
	}

	const scale = [{
		dataKey: 'value',
		min: 40,
	}, {
		dataKey: 'year',
		min: 0,
		max: 1,
	}];
	export default {
		name: "DomainPageStatistics",
		data() {
			return {
				scale,
				height: 500,
				padding,
				data,
				style: {stroke: '#fff', lineWidth: 1}
			}
		}
	}
</script>

<style>

</style>
