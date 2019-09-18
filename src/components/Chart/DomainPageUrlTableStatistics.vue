<template>
  <div class="chart">
    <v-chart :forceFit="true" height="50" width="200" :data="scoreList" :scale="scale" :padding="padding">
      <v-smooth-line position="mouth*score" :size="2" color="mouth"/>
      <!--<v-point position="mouth*score" :size="3" :v-style="style" :shape="'circle'"/>-->
      <!--<v-area position="year*value" color="page"/>-->
    </v-chart>
  </div>
</template>

<script>
	const padding = [0];

	let data = [];

	const scale = [{
		dataKey: 'score',
		min: 40,
	}, {
		dataKey: 'mouth',
	}];
	export default {
		name: "DomainPageUrlTableStatistics",
		data() {
			return {
				scale,
				padding,
				data,
				style: {stroke: '#fff', lineWidth: 1}
			}
		},
		props: {
			scoreList: Array
		}
	}
</script>

<style scoped>

</style>
