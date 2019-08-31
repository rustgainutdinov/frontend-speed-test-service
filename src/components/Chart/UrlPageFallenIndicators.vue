<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis />
      <v-legend dataKey="item" />
      <v-pie position="percent" color="item" :vStyle="pieStyle" :label="labelConfig" />
      <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
    </v-chart>
  </div>
</template>

<script>

	const data = [
		{ item: 'ispring.ru', count: 40, percent: 0.4},
		{ item: 'payfood.ispring.ru', count: 21, percent: 0.21 },
		{ item: 'library.ispring.ru', count: 17, percent: 0.17 },
		{ item: 'travelline.ru', count: 13, percent: 0.13 },
		{ item: 'moneta.ru', count: 9, percent: 0.09 }
	];

	const scale = [{
		dataKey: 'percent',
		min: 0,
		formatter: '.0%',
	}];

	export default {
		name: 'UrlPageFallenIndicators',
		data() {
			return {
				data,
				scale,
				height: 400,
				pieStyle: {
					stroke: "#fff",
					lineWidth: 1,
				},
				labelConfig: ['percent', {
					formatter: (val, item) => {
						return item.point.item + ': ' + val;
					}
				}],
			};
		}
	};
</script>
