<template>
  <div>
    <div class="register-guest-from-inputs">
      <a-input placeholder="Имя" class="input-auth">
        <a-icon
          slot="prefix"
          type="user"
          style="color:rgb(151, 151, 151)"
        />
      </a-input>
      <a-input placeholder="Фамилия" class="input-auth">
        <a-icon
          slot="prefix"
          type="user"
          style="color:rgb(151, 151, 151)"
        />
      </a-input>
    </div>
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
    <a-button type="primary" size="large" block class="submit-form">Зарегистрироваться</a-button>
    <div class="other-from-links">
      <a href="">Уже зарегистрированы?</a>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Rerister"
	}
</script>

<style lang="scss">
  .register-guest-from-inputs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .input-auth {
      width: calc(50% - 11px);
    }

    .input-auth:nth-child(odd) {
      margin-right: 22px;
    }
  }
</style>
