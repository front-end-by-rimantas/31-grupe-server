const Page = require('../components/Page.js');

class PageEmpty extends Page {
    constructor(globalData) {
        super(globalData);
        this.route = 'Empty';
        this.pageName = 'Empty';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>EMPTY</h1>
                <a href="/register" class="btn">Register</a>
                <a href="/login" class="btn">Login</a>
                <p>Puslapis tuscias - eik ir susikurk ko nori 🚀</p>`;
    }
}

module.exports = PageEmpty;