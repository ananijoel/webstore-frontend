const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const value = params.get('value');
//let baseurl = "https://webstore-api-aee43d786de0.herokuapp.com"
let baseurl = "http://localhost:3000"
let title = document.querySelector('title')
title.innerText = value
let subcategies =[]
let main = document.querySelector('main')

fetch(`${baseurl}/api/get-categories/${value}`)
.then(response => response.json())
.then(data =>{
    data.data.map(element=>{
        subcategies.push(element)
    })
    console.log(subcategies)
    
    subcategies.forEach(element=>{
         main.innerHTML +=`<wc-slide-container Category="${element}/subcategory/${value}" title="${element}" limit="20" link="/pages/general/category.html?value=${element}"></wc-slide-container>`
    })
    
})


