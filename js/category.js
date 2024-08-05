const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const value = params.get('value');
let title = document.querySelector('title')
title.innerText = value
let subcategies =[]
let main = document.querySelector('main')
let baseurl = "https://webstoreapi-da2e54274ab2.herokuapp.com"
//let baseurl = "http://localhost:3000"
fetch(`${baseurl}/api/get-subcategories/${value}`)
.then(response => response.json())
.then(data =>{
    data.data.map(element=>{
        subcategies.push(element)
    })
    subcategies.forEach(element=>{
        fetch(`${baseurl}/api/get-items/category/${value}/subcategory/${element}/100`)
        .then(response => response.json())
        .then(data =>{
            //console.log(data)
            main.innerHTML +=`<wc-slide-container Category="${value}/subcategory/${element}" title="${element}" limit="20" link="/pages/general/subcategory.html?value=${element}"></wc-slide-container>`
        })
    })
})


