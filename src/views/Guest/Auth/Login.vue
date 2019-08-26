<template>
  <Layout>
    <template slot="title">
      Авторизация
    </template>
    <template slot="content">
      <Form/>
    </template>
  </Layout>
</template>

<script>
	import Layout from '@/layouts/Auth';
	import Form from '@/components/Guest/Form/Login'

	export default {
		name: "Login",
		components: {
			Layout,
			Form
		}
	}
</script>

<style>

</style>
