let baseurl = "https://webstoreapi-da2e54274ab2.herokuapp.com"
//let baseurl = "http://localhost:3000"
let main = document.querySelector('main')

fetch(`${baseurl}/api/get-items/category`)
.then(response => response.json())
.then(data =>{
    data.data.map(element=>{
        main.innerHTML +=`<wc-slide-container Category="${element}" title="${element}" limit="20" link="/pages/general/category.html?value=${element}"></wc-slide-container>`

    })
})


