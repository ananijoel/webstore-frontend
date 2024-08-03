const urlParams = new URLSearchParams(window.location.search);
const paramid = urlParams.get('id');
let baseurl = 'https://webstore-api-aee43d786de0.herokuapp.com'

let pics = ['front_pic', 'back_pic', 'left_pic', 'right_pic', 'up_pic', 'down_pic']
let item;
let nom = document.querySelector('.nom');
let creation = document.querySelector('.date');
let description = document.querySelector('.description');
let types = document.querySelector('.types');
let quantite = document.querySelector('.quantite input');
let prix = document.querySelector('.prix p:nth-child(2)');
let button = document.querySelector('.button');
let options = document.querySelectorAll('.buttonOption')
document.querySelector('.boutique').classList.add('active')
let pictures = document.querySelectorAll('.img')
let mainPicture = document.querySelector('.image img')
let main = document.querySelector('main')

function convertirDate(dateString) {
    // Créer un objet Date à partir de la chaîne de caractères
    const dateParts = dateString.split('/');
    const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

    // Tableau des noms de mois en français
    const mois = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];

    // Obtenir le jour, le mois et l'année
    const jour = date.getDate();
    const moisNom = mois[date.getMonth()];
    const annee = date.getFullYear();

    // Retourner la date formatée
    return `${jour} ${moisNom} ${annee}`;
}

fetch(`${baseurl}/api/get-item/${paramid}`, {
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    console.log(data)

    item = data.data;
    pics.map((element, index) => {
        if (item[element]) {
            pictures[index].setAttribute('src', `${baseurl}/api/get-item/${paramid}/front_pic`);
        } else {
            //console.log(`Element ${index} is false`);
        }
    });
    
    mainPicture.setAttribute('src', document.querySelector('.img.active').getAttribute('src'))
    nom.innerHTML = item.name;
    creation.innerHTML =convertirDate(new Date(item.update).toLocaleDateString())
    description.innerHTML = item.description
    types.innerHTML+= `<div class="${item.category}">${item.category}</div>`
    types.innerHTML+= `<div class="${item.subcategory}">${item.subcategory}</div>`
    quantite.max = item.quantity;
    prix.innerHTML = item.price;
    updatePrixTotal(); // Calcul initial du prix total
    quantite.addEventListener('input', updatePrixTotal); // Ajouter un écouteur d'événement pour la mise à jour de la quantité
    button.setAttribute('href',`https://wa.me/70076829?text= 
        Produit : ${item.name},
        Prix unitaire : ${item.price},
        Quantité : ${quantite.value},
        Prix total : ${prixTotale},
        Option sélectionnée : ${document.querySelector('.buttonOption.active').innerText},
        URL actuelle : ${window.location.href}
        `)
        listrelativeItems(item.subcategory)
})
.catch(error => console.error('Error:', error));


let prixTotale // Fonction pour mettre à jour le prix total
function updatePrixTotal() {
    prixTotale = parseInt(quantite.value) * parseFloat(item.price)
    button.innerHTML = `acheter au total de ${prixTotale} FCFA`;
}

//modification de l'image pricipale au clic de l'utillisateur
pictures.forEach(picture => {
    picture.addEventListener('click', (e) => {
        // Supprimer la classe 'active' de tous les éléments
        pictures.forEach(p => p.classList.remove('active'));
        
        // Ajouter la classe 'active' à l'élément cliqué
        picture.classList.add('active');
        mainPicture.setAttribute('src', picture.getAttribute('src'))
    });
});

options.forEach(option =>{
    option.addEventListener('click', (e) =>{
        options.forEach(o =>o.classList.remove('active'))
        option.classList.toggle('active')
    })
})


/*
    data.data.map(element=>{
        subcategies.push(element)
    })
    console.log(subcategies)
    
    subcategies.forEach(element=>{
         main.innerHTML +=`<wc-slide-container Category="${element}/subcategory/${infosubcategory}" title="${element}" limit="20" link="/pages/general/category.html?value=${element}"></wc-slide-container>`
    })
*/

function listrelativeItems(argument){
    fetch(`${baseurl}/api/get-categories/${argument}`)
    .then(response => response.json())
    .then(data =>{
        //console.log(data.data)
        data.data.map(element =>{
            console.log(element)
           main.innerHTML +=`<wc-slide-container Category="${element}/subcategory/${argument}" title="${element}" limit="20" link="/pages/general/category.html?value=${element}"></wc-slide-container>`
        })
    })
}