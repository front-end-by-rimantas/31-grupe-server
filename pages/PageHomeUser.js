const Page = require('../components/Page.js');
const table = require('../components/table.js');

class PageHomeUser extends Page {
    constructor() {
        super();
        this.route = '';
        this.pageName = 'Your tasks';
        this.pageTemplateName = 'home';

        this.demoData = [
            {
                id: 1,
                text: 'Lorem',
                status: 1,
            },
            {
                id: 2,
                text: 'Lorem ipsum',
                status: 1,
            },
            {
                id: 3,
                text: 'Lorem ipsul dolor',
                status: 1,
            },
            {
                id: 4,
                text: 'Lorem ipsum dolor sit amet',
                status: 1,
            },
        ];
    }

    bodyHTML() {
        return `<h1>TODO list</h1>
                <button id="new_task_button" class="btn">New task</button>
                ${table(this.demoData)}
                <div id="new_task_lightbox" class="lightbox hidden">
                    <div class="background"></div>
                    <div class="content">
                        <div class="close">&times;</div>
                        <form>
                            <input type="hidden" name="action" value="demo">
                            <input type="hidden" name="id" value="0">
                            <div class="form-row">
                                <label for="task">Task</label>
                                <textarea name="text" id="task"></textarea>
                            </div>
                            <div class="form-row">
                                <label for="status">Status</label>
                                <select name="status" id="status">
                                    <option value="1">To do</option>
                                    <option value="2">In progress</option>
                                    <option value="3">Done</option>
                                </select>
                            </div>
                            <div class="form-row">
                                <button type="submit" class="btn">New task</button>
                            </div>
                        </form>
                    </div>
                </div>
                <script src="./js/page/home.js" type="module" defer></script>`;
    }
}

module.exports = PageHomeUser;