class Showcase extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        
    }
    connectedCallback(){
        fetch('/components/html/showcase.html')
        .then(Response => Response.text())
        .then(html =>{
            this.shadowRoot.innerHTML = html
        })
    }
}
customElements.define('wc-showcase',Showcase)