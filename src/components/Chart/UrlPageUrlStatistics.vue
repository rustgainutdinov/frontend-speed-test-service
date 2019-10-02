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
