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

                // Maintenant que le contenu HTML est chargé, vous pouvez accéder aux éléments
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

        const img = this.shadowRoot.querySelector('.card-picture img');
        const name = this.shadowRoot.querySelector('.name');
        const price = this.shadowRoot.querySelector('.price');
        const category = this.shadowRoot.querySelector('.category');

        fetch(`http://localhost:3000/api/item/${itemId}`)
            .then(response => response.json())
            .then(data => {
                const itemData = data.data;
                if (name) name.innerHTML = itemData.name || 'No name';
                if (price) price.innerHTML = itemData.price || 'No price';
                if (category) category.innerHTML = itemData.category || 'No category';
                // Mettez également à jour l'image et autres éléments si nécessaire
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
