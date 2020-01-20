class LoginForm extends Seemple.Object {
    constructor() {
        super({
            userName: '',
            password: '',
            rememberMe: true
        });

        this
            .calc('isValid', ['userName', 'password'],
            (userName, password) => userName.length >= 4 && password.length >= 5)
            .bindNode({
                sandbox: '.login-form',
                userName: ':sandbox .user-name',
                password: ':sandbox .password',
                showPassword: ':sandbox .show-password',
                rememberMe: ':sandbox .remember-me'
            })
            .bindNode('isValid', ':sandbox .submit',
                Seemple.binders.className('disabled', false))
            .bindNode('showPassword', ':bound(password)', {
                getValue: null,
                setValue(v) {
                    this.type = v ? 'text' : 'password';
                }
            })
            .on('submit::sandbox', (evt) => {
                this.login();
                evt.preventDefault();
            });
    }

    login() {
        if (this.isValid) {
            alert(JSON.stringify(this)); // eslint-disable-line no-alert
        }

        return this;
    }
}

const loginForm = new LoginForm(); // eslint-disable-line no-unused-vars
