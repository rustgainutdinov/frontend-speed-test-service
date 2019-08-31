<template>
  <div class="chart">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="padding">
      <v-tooltip/>
      <v-axis/>
      <v-smooth-line position="date*score" :size="2" color="domain"/>
      <v-point position="date*score" color="domain" :size="4" :v-style="style" :shape="'circle'"/>
    </v-chart>
  </div>
</template>

<script>
	const padding = [50];


	const scale = [{
		dataKey: 'score',
	}, {
		dataKey: 'date',
	}];

	export default {
		name: "MainPageDomainStatistics",
		data() {
			return {
				scale,
				height: 300,
				padding,
				style: {stroke: '#fff', lineWidth: 1}
			}
		},
		props: ['data']
	}
</script>

<style>

</style>
