<template>
  <Layout>
    <template slot="title">
      Регистрация
    </template>
    <template slot="content">
      <Form/>
    </template>
  </Layout>
</template>

<script>
	import Layout from '@/layouts/Auth';
	import Form from '@/components/Guest/Form/Register'

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
