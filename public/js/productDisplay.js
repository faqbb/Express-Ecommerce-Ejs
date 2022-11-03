import productService from "../../src/models/Products.js";

async function renderProds() {
    const products = await productService.find()
    const html = products.map((elem, index) =>{
        return(`<ul class="d-flex justify-content-between list-unstyled mx-5 text-light h6">
                    <li>${elem.name}</li>
                    <li>${elem.price}</li>
                    <li>${elem.category}</li>
                    <li>${elem.description}</li>
                    <li>${elem.imageUrl}</li>
                </ul>    `)
    }).join(" ")
    console.log(html)
    document.getElementById('products').innerHTML = html
}

export default renderProds()

