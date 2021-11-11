const Page = require('../components/Page.js');

class PageLogin extends Page {
    constructor() {
        super();
        this.route = '';
        this.pageName = 'Login';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>Login</h1>
                <a href="../">Home</a>
                <form id="login_form">
                    <p class="error">Formoje yra klaidu!</p>
                    <input type="hidden" name="action" value="login">

                    <div class="form-row">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" value="John" autocomplete="username">
                    </div>
                    <div class="form-row">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" value="john@john.john" autocomplete="current-password">
                    </div>
                    <div class="form-row">
                        <button type="submit" class="btn">Login</button>
                    </div>
                </form>
                <script src="./js/page/login.js" type="module" defer></script>`;
    }
}

module.exports = PageLogin;