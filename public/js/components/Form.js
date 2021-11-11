class Form {
    constructor(selector) {
        this.selector = selector;
        this.DOM = null;
        this.inputsDOM = null;
        this.submitDOM = null;
        this.state = null;
        this.taskId = 0;

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.targetElement()) {
            throw new Error('Paduotas netinkamas selectorius formai');
        }

        this.inputsDOM = this.DOM.querySelectorAll('[name]');
        this.submitDOM = this.DOM.querySelector('button');

        this.submitDOM.addEventListener('click', (e) => {
            e.preventDefault();
            this.sendRequest();
        });
    }

    isValidSelector() {
        return typeof this.selector === 'string' && this.selector !== '';
    }

    targetElement() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    updateUI(state, taskId = 0) {
        const availableStates = ['new', 'update'];
        const btnText = {
            new: 'New task',
            update: 'Update task',
        }

        if (!availableStates.includes(state)) {
            throw new Error('Netinkama formos konfiguracija')
        }
        this.state = state;
        this.taskId = taskId;

        for (const inputDOM of this.inputsDOM) {
            if (inputDOM.name === 'action') {
                inputDOM.value = state;
            }
            if (inputDOM.name === 'id') {
                inputDOM.value = taskId;
            }
        }

        this.submitDOM.innerText = btnText[state];
    }

    sendRequest() {
        const obj = {};

        for (const inputDOM of this.inputsDOM) {
            obj[inputDOM.name] = inputDOM.value;
        }

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                console.log(xhttp.responseText);
            }
        };
        xhttp.open("GET", "/api/task", true);
        xhttp.send(obj);
    }
}

export { Form }