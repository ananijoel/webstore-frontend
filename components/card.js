class Card extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        fetch('/components/html/card.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;
                this.updateContent();
                this.redirection()
            })
            .catch(error => {
                console.error('Error loading card HTML:', error);
            });
    }

    updateContent() {
        const itemId = this.getAttribute('itemid');
        if (!itemId) {
            console.error('No itemid attribute provided.');
            return;
        }
        baseurl="https://webstore-api-aee43d786de0.herokuapp.com"
        const img = this.shadowRoot.querySelector('.card-picture img');
        const name = this.shadowRoot.querySelector('.name');
        const price = this.shadowRoot.querySelector('.price');
        const category = this.shadowRoot.querySelector('.category');

        fetch(`${baseurl}/api/get-item/${itemId}`)
            .then(response => response.json())
            .then(data => {
                const itemdata = data.data;
                if (itemdata.front_pic) {
                    img.setAttribute('src',`${baseurl}/api/get-item/${itemId}/front_pic`)
                }

                if (name) name.innerHTML = itemdata.name || 'No name';
                if (price) price.innerHTML = itemdata.price || 'No price';
                if (category) category.innerHTML = itemdata.category || 'No category';
                
            })
            .catch(error => {
                console.error('Error fetching item data:', error);
            });
    }
    redirection(){
        let card = this.shadowRoot.querySelector('.card')
        card.addEventListener('click',(e)=>{
            const itemId = this.getAttribute('itemid');
            console.log(itemId)
            window.location.href = `/pages/general/item.html?id=${encodeURIComponent(itemId)}`;

        })
    }
}

customElements.define('wc-card', Card);
