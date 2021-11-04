const Page = require('../components/Page.js');

class PageHome extends Page {
    constructor() {
        super();
        this.route = '';
        this.pageName = 'List';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>TODO list</h1>`;
    }
}

module.exports = PageHome;