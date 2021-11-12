const Page = require('../components/Page.js');

class PageHomeGuest extends Page {
    constructor(globalData) {
        super(globalData);
        this.route = '';
        this.pageName = 'Home';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>Home page</h1>
                <a href="/register" class="btn">Register</a>
                <a href="/login" class="btn">Login</a>
                <p>Puslapis tuscias - eik ir susikurk ko nori 🚀</p>`;
    }
}

module.exports = PageHomeGuest;