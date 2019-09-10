<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="[50, 50, 120]">
      <v-tooltip/>
      <v-axis/>
      <v-legend/>
      <v-bar position="indicator*value" color="mode" :adjust="adjust"/>
    </v-chart>
  </div>
</template>

<script>
	const data = [
		{year: '1951 年', sales: 38, color: 'mobile'},
		{year: '1952 年', sales: 52, color: 'mobile'},
		{year: '1956 年', sales: 61, color: 'mobile'},
		{year: '1957 年', sales: 45, color: 'mobile'},
		{year: '1958 年', sales: 48, color: 'mobile'},
		{year: '1959 年', sales: 38, color: 'mobile'},
		{year: '1960 年', sales: 38, color: 'mobile'},
		{year: '1962 年', sales: 38, color: 'mobile'},
		{year: '1951 年', sales: 46, color: 'desktop'},
		{year: '1952 年', sales: 82, color: 'desktop'},
		{year: '1956 年', sales: 29, color: 'desktop'},
		{year: '1957 年', sales: 95, color: 'desktop'},
		{year: '1958 年', sales: 88, color: 'desktop'},
		{year: '1959 年', sales: 51, color: 'desktop'},
		{year: '1960 年', sales: 31, color: 'desktop'},
		{year: '1962 年', sales: 49, color: 'desktop'},
	];

	const scale = [{
		dataKey: 'value',
	}];

	export default {
		data() {
			return {
				scale,
				height: 600,
				adjust: [{
					type: 'dodge',
					marginRatio: 1 / 32,
				}],
			};
		},
      props: ['data']
	};
</script>
