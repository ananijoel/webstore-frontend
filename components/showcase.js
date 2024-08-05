class Showcase extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        fetch('/components/html/showcase.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;
                this.updateElements();
            });
    }

    updateElements(){
        const baseurl = 'https://webstoreapi-da2e54274ab2.herokuapp.com';
        //const baseurl = 'http://localhost:3000';
        const img = this.shadowRoot.querySelectorAll('img');
        //console.log(a[1].getAttribute('href'))
        
        fetch(`${baseurl}/api/get-all-items/5/update/DESC`)
            .then(response => response.json())
            .then(data => {
                data.data.map((element,index)=>{
                    if (img[index]) {
                        img[index].setAttribute('onclick', `window.location.href='/pages/general/item.html?id=${element.id}'`);
                    }
                    if ( img[index] && element.front_pic) {
                        img[index].setAttribute('src', `${baseurl}/api/get-item/${element.id}/front_pic`);
                    }else{
                        img[index].setAttribute('src', `/files/mini sorry.png`)
                    }
                })
            })
            .catch(error => console.error('Error fetching data:', error));
            
    }
}

customElements.define('wc-showcase', Showcase);
