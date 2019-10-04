<template>
    <a-form
            @submit="handleSubmit"
            :form="form"
            class="auth-form">
        <a-form-item class="form-item">
            <a-input
                    placeholder="email"
                    class="input-auth"
                    v-decorator="emailConfig">
                <a-icon
                        slot="prefix"
                        type="user"
                        style="color:rgb(151, 151, 151)"
                />
            </a-input>
        </a-form-item>
        <a-form-item
                class="form-item"
        >
            <a-input
                    placeholder="password"
                    class="input-auth"
                    type="password"
                    v-decorator="passConfig">
                <a-icon
                        slot="prefix"
                        type="lock"
                        style="color:rgb(151, 151, 151)"
                />
            </a-input>
        </a-form-item>
        <a-button type="primary" size="large" block class="submit-form" html-type="submit">Войти</a-button>
        <div class="other-from-links">
            <router-link to="/guest/register">Ещё не зарегистрированы?</router-link>
        </div>
    </a-form>
</template>

<script>
    import setUserData from "../../../methods/setUserData";

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
                {required: true, message: 'Введите пароль!'}
            ]
        }
    ];

    export default {
        name: "Login",
        data() {
            return {
                form: this.$form.createForm(this),
                emailConfig,
                passConfig
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const email = values.email;
                        const pass = values.pass;
                        this.$http.get('/user/login', {
                            params: {email, pass}
                        }).then((res) => {
                            this.$message.success('Вы успешно авторизированы');
                            setUserData(this, res.data.token, res.data.rights, email);
                            setTimeout(() => {
                                this.$router.push({path: '/user'});
                            }, 1000)
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

<style>
</style>
