const Page = require('../components/Page.js');

class PageRegister extends Page {
    constructor(globalData) {
        super(globalData);
        this.route = '';
        this.pageName = 'Register';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>Register</h1>
                <a href="../">Home</a>
                <form id="register_form">
                    <p class="error">Formoje yra klaidu!</p>
                    <input type="hidden" name="action" value="register">
                    
                    <div class="form-row">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" value="John" autocomplete="username">
                    </div>
                    <div class="form-row">
                        <label for="email">email</label>
                        <input type="email" name="email" id="email" value="john@john.john" autocomplete="email">
                    </div>
                    <div class="form-row">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" value="john@john.john" autocomplete="new-password">
                    </div>
                    <div class="form-row">
                        <label for="rePass">Repeat password</label>
                        <input type="password" name="rePass" id="rePass" value="john@john.john" autocomplete="off">
                    </div>
                    <div class="form-row">
                        <button type="submit" class="btn">Register</button>
                        <button type="reset" class="btn">Clear form</button>
                    </div>
                </form>
                <script src="./js/page/register.js" type="module" defer></script>`;
    }
}

module.exports = PageRegister;