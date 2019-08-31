<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
    class="auth-form">
    <div class="register-guest-from-inputs">
      <a-form-item class="form-item">
        <a-input placeholder="Имя" class="input-auth" v-decorator="nameConfig">
          <a-icon
            slot="prefix"
            type="user"
            style="color:rgb(151, 151, 151)"
          />
        </a-input>
      </a-form-item>
      <a-form-item class="form-item">
        <a-input placeholder="Фамилия" class="input-auth" v-decorator="fullNameConfig">
          <a-icon
            slot="prefix"
            type="user"
            style="color:rgb(151, 151, 151)"
          />
        </a-input>
      </a-form-item>
    </div>
    <a-form-item class="form-item">
      <a-input placeholder="email" class="input-auth" v-decorator="emailConfig">
        <a-icon
          slot="prefix"
          type="user"
          style="color:rgb(151, 151, 151)"
        />
      </a-input>
    </a-form-item>
    <a-form-item class="form-item">
      <a-input placeholder="password" class="input-auth" v-decorator="passConfig" type="password">
        <a-icon
          slot="prefix"
          type="lock"
          style="color:rgb(151, 151, 151)"
        />
      </a-input>
    </a-form-item>
    <a-button type="primary" size="large" block class="submit-form" html-type="submit">Зарегистрироваться</a-button>
    <div class="other-from-links">
      <a href="">Уже зарегистрированы?</a>
    </div>
  </a-form>
</template>

<script>
	const nameConfig = [
		'name',
		{
			rules: [{
				required: true, message: 'Введите имя!',
			}]
		}
	];

	const fullNameConfig = [
		'fullName',
		{
			rules: [{
				required: true, message: 'Введите фамилию!',
			}]
		}
	];

	const emailConfig = [
		'email',
		{
			rules: [{
				type: 'email', message: 'Введите корректный e-mail!',
			}, {
				required: true, message: 'Введите email!',
			}]
		}
	];

	const passConfig = [
		'pass',
		{
			rules: [
				{required: true, message: 'Введите пароль!'},
				{min: 6, message: ''},
			]
		}
	];

	export default {
		name: "Rerister",
		data() {
			return {
				form: this.$form.createForm(this),
				nameConfig,
				fullNameConfig,
				emailConfig,
				passConfig
			}
		},
		methods: {
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFieldsAndScroll((err, values) => {
					if (!err) {
						const name = values.name;
						const fullName = values.fullName;
						const email = values.email;
						const pass = values.pass;
						console.log(values);
						this.$http.post('/user/register', null, {
							params: {email, pass, name}
						})
						.then((res) => {
							this.$message.success('Вы успешно зарегистрированы');
						}).catch((error) => {
							if (error.response) {
								this.$message.error(error.response.data, 10);
							} else {
								// console.log(error);
							}
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
  .register-guest-from-inputs {
    display: flex;
    flex-direction: row;

    .form-item:nth-child(odd) {
      margin-right: 22px;
    }

    .form-item {
      width: calc(50% - 11px);
    }
  }
</style>
