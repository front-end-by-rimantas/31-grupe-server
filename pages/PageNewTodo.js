const Page = require('../components/Page.js');

class PageNewTodo extends Page {
    constructor() {
        super();
        this.route = '';
        this.pageName = 'New';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>New TODO</h1>`;
    }
}

module.exports = PageNewTodo;