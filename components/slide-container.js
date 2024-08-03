class Slide extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        fetch('/components/html/slide-container.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;
                this.updateContent();
               
            })
            .catch(error => {
                console.error('Error loading slide HTML:', error);
            });
    }

    updateContent() {
        
        const category = this.getAttribute('category') || 'jeu';
        const sliderName = this.getAttribute('title') || 'Default Title';
        const limit = this.getAttribute('limit') || 12;
        const link = this.getAttribute('link') || '#';
        //console.log(category)
        let baseurl = 'https://webstore-api-aee43d786de0.herokuapp.com'
        fetch(`${baseurl}/api/get-items/category/${category}/100`)
            .then(response => response.json())
            .then(data => {
                const title = this.shadowRoot.querySelector('.title');
                const cardWrapper = this.shadowRoot.querySelector('.card-wrapper');
                title.setAttribute('href', link);
                title.textContent = sliderName;
                
                data.data.forEach(element => {
                    //console.log(element.id)
                    
                    const itemCard = document.createElement('wc-card');
                    itemCard.setAttribute('itemid', element.id);
                    cardWrapper.appendChild(itemCard);
                    
                });
                this.sliderlogic();
            })
            .catch(error => {
                console.error('Error fetching item data:', error);
            });
            
    }

    sliderlogic() {
//console.log('Initializing slider logic...');

    // Sélection des boutons et des cartes
    const prevButton = this.shadowRoot.querySelector('.prev');
    const nextButton = this.shadowRoot.querySelector('.next');
    const cardWrapper = this.shadowRoot.querySelector('.card-wrapper');
    const cards = this.shadowRoot.querySelectorAll('wc-card');
    let currentIndex = 0;

    // Journaux pour vérifier les sélections
    //console.log('Prev Button:', prevButton);
    //console.log('Next Button:', nextButton);
    //console.log('Card Wrapper:', cardWrapper);
    //console.log('Number of Cards:', cards.length);

    function getTotalCardWidth(card) {
        const style = window.getComputedStyle(card);
        const marginLeft = parseFloat(style.marginLeft);
        const marginRight = parseFloat(style.marginRight);
        const totalWidth = card.offsetWidth + marginLeft + marginRight;
        //console.log(`Card Width (including margin): ${totalWidth}px`);
        return totalWidth;
    }

    function updateSlider() {
        if (cards.length > 0) {
            const cardWidth = getTotalCardWidth(cards[0]);
            //console.log(`Updating slider to translateX(-${currentIndex * cardWidth}px)`);
            cardWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        } else {
            console.warn('No cards to display.');
        }
    }

    function nextCard() {
        //console.log('Next Card clicked');
        if (currentIndex < cards.length -5 ) {
            currentIndex++;
            //console.log('Moving to next card:', currentIndex);
        } else {
            currentIndex = cards.length -5;
            //console.log('Reached end of cards:', currentIndex);
        }
        updateSlider();
    }

    function prevCard() {
        //console.log('Previous Card clicked');
        if (currentIndex > 0) {
            currentIndex--;
            //console.log('Moving to previous card:', currentIndex);
        } else {
            currentIndex = 0;
            //console.log('Reached beginning of cards:', currentIndex);
        }
        updateSlider();
    }
    nextButton.addEventListener('click', nextCard);
    prevButton.addEventListener('click', prevCard);


    // Ajout des écouteurs d'événements pour les boutons
    if (nextButton) {
        //console.log('Next button event listener added');
    } else {
        console.warn('Next button not found');
    }

    if (prevButton) {
        //console.log('Prev button event listener added');
    } else {
        console.warn('Prev button not found');
    }

    // Initialisation de l'affichage des cartes
    updateSlider();
    }
}

customElements.define('wc-slide-container', Slide);
