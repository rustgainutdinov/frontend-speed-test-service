<template>
  <div class="long-dark-container">
    <div class="form">
      <h3 class="auth-form-title">
        <slot name="title"></slot>
      </h3>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Auth"
	}
</script>

<style lang="scss">
  .long-dark-container {
    background-color: rgb(45, 58, 75);
    min-height: 100%;

    .form {
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;

      .auth-form-title {
        font-family: 'Noto Sans', sans-serif;
        font-size: 32px;
        line-height: 1.5em;
        color: #eee;
        margin: 0 auto 40px auto;
        text-align: center;
        font-weight: 700;
      }
    }
  }
</style>
