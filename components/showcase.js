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
        //const baseurl = 'https://webstore-api-aee43d786de0.herokuapp.com';
        const baseurl = 'http://localhost:3000';
        const img = this.shadowRoot.querySelectorAll('img');
        const a = this.shadowRoot.querySelectorAll('a');
        //console.log(a[1].getAttribute('href'))
        
        fetch(`${baseurl}/api/get-all-items/5/update/DESC`)
            .then(response => response.json())
            .then(data => {
                data.data.map((element,index)=>{
                    if (a[index]) {
                        a[index].setAttribute('href', `/pages/general/item.html?id=${element.id}`);
                    }
                    if ( img[index] && element.front_pic) {
                        img[index].setAttribute('src', `${baseurl}/api/get-item/${element.id}/front_pic`);
                    }else{
                        img[index].setAttribute('src', `/files/Sorry No.png`)
                    }
                })
            })
            .catch(error => console.error('Error fetching data:', error));
            
    }
}

customElements.define('wc-showcase', Showcase);

/*
                data.forEach((item, index) => {
                    if (a[index]) {
                        a[index].setAttribute('href', `/pages/general/item.html?id=${item.id}`);
                    }
                    if (img[index]) {
                        img[index].setAttribute('src', `${baseurl}/api/get-item/${item.id}/front_pic`);
                    }
                });
                */