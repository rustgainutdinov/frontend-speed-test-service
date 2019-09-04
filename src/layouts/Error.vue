<template>
  <div class="error-page">
    <h1>Ой!</h1>
    <h3>Что-то пошло не так</h3>
    <h3>Ошибка 404</h3>
  </div>
</template>

<script>
	export default {
		name: "Error"
	}
</script>

<style lang="scss">
  .error-page {
    width: 600px;
    margin: 200px auto;

    h1 {
      text-align: center;
      color: #314DA7;
      font: 196px/1.2em 'Source Sans Pro', sans-serif;
      margin-bottom: 30px;
    }

    h3 {
      text-align: center;
      color: #595d6e;
      font: 28px/1.2em 'Source Sans Pro', sans-serif;
    }
  }
</style>
