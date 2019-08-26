<template>
  <div>
    <a-input placeholder="email" class="input-auth">
      <a-icon
        slot="prefix"
        type="user"
        style="color:rgb(151, 151, 151)"
      />
    </a-input>
    <a-input placeholder="password" class="input-auth">
      <a-icon
        slot="prefix"
        type="lock"
        style="color:rgb(151, 151, 151)"
      />
    </a-input>
    <a-button type="primary" size="large" block class="submit-form">Войти</a-button>
    <div class="other-from-links">
      <a href="">Ещё не зарегистрированы?</a>
      <a href="">Забыли пароль?</a>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Login"
	}
</script>

<style>
</style>
