import {faker} from '@faker-js/faker'

const getRandomProducts = (quantity) => {
    let products = []
    for(let i = 1; i <= quantity; i++) {
        let product = {
            name: faker.commerce.product(),
            price: faker.commerce.price(1000, 5000),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department(),
            imageUrl: faker.image.image()
        }
        products.push(product)
    }
    return products
}

export default getRandomProducts