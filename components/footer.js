class Footer extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        
    }
    connectedCallback(){
        fetch('/components/html/footer.html')
        .then(response => response.text())
        .then(html =>{
            this.shadowRoot.innerHTML = html
        })
    }
}

customElements.define('wc-footer',Footer)