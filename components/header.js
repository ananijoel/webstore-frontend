class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        fetch('/components/html/header.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;
                this.toggleElements(); // Use `this` to refer to the class instance
            });
    }

    toggleElements() {
        const menu = this.shadowRoot.querySelector('.menu')
        const nav = this.shadowRoot.querySelector('nav'); // Select `nav` from shadow DOM
        const main = document.querySelector('main');
        const footer = document.querySelector('wc-footer');

        menu.addEventListener('click', () => {
            nav.classList.toggle('active');
            main.style.display = main.style.display === 'none' ? 'block' : 'none';
            footer.style.display = footer.style.display === 'none' ? 'block' : 'none';
        });
        
    }
}

customElements.define('wc-header', Header);
