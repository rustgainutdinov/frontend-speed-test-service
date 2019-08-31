<template>
  <Layout>
    <div slot="content" class="container">
      <router-view/>
    </div>
  </Layout>
</template>

<script>
	import Layout from '@/layouts/Base';

	export default {
		components: {
			Layout
		},
		name: "index"
	}
</script>

<style>
  .container {
    margin: 0 auto;
    width: 1400px;
  }
</style>
