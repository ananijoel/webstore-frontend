let baseurl = "https://webstore-api-aee43d786de0.herokuapp.com"
let main = document.querySelector('main')

fetch(`${baseurl}/api/get-items/category`)
.then(response => response.json())
.then(data =>{
    data.data.map(element=>{
        main.innerHTML +=`<wc-slide-container Category="${element}" title="${element}" limit="20" link="/pages/general/category.html?value=${element}"></wc-slide-container>`

    })
})


