const Page = require('../components/Page.js');

class Page404 extends Page {
    constructor(globalData) {
        super(globalData);
        this.route = '404';
        this.pageName = '404';
        this.pageTemplateName = '404';
    }

    bodyHTML() {
        return `<h1>TODO - 404</h1>
                <p>Puslapis nerastas 😥</p>`;
    }
}

module.exports = Page404;