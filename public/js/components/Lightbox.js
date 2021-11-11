class Lightbox {
    constructor(selector) {
        this.selector = selector;
        this.DOM = null;
        this.bgDOM = null;
        this.closeDOM = null;

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.targetElement()) {
            throw new Error('Paduotas netinkamas selectorius lightboxui');
        }

        this.bgDOM = this.DOM.querySelector('.background');
        this.closeDOM = this.DOM.querySelector('.close');

        this.bgDOM.addEventListener('click', () => {
            this.DOM.classList.add('hidden');
        })

        this.closeDOM.addEventListener('click', () => {
            this.DOM.classList.add('hidden');
        })
    }

    isValidSelector() {
        return typeof this.selector === 'string' && this.selector !== '';
    }

    targetElement() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    show() {
        this.DOM.classList.remove('hidden');
    }
}

export { Lightbox }