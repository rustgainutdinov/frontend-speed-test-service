<template>
  <div class="chart">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="padding">
      <v-tooltip/>
      <v-axis/>
      <v-smooth-line position="date*score" :size="2" color="url"/>
      <v-point position="date*score" color="url" :size="4" :v-style="style" :shape="'circle'"/>
      <!--<v-area position="year*value" color="page"/>-->
    </v-chart>
  </div>
</template>

<script>
	const padding = [50];


	const scale = [{
		dataKey: 'score',
    min: 0,
    max: 1
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
