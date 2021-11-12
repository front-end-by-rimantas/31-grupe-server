const Page = require('../components/Page.js');

class PageUpdateTodo extends Page {
    constructor(globalData) {
        super(globalData);
        this.route = '';
        this.pageName = 'New';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>Update TODO</h1>`;
    }
}

module.exports = PageUpdateTodo;