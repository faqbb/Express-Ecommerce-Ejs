
export default class ProductsService {
    constructor(dao){
        this.dao = dao
    }
    getProductByID = (id) => {
        return this.dao.getById(id)
    }
    getAllProducts = () =>{
        return this.dao.getAll()
    }
    createProduct = (product) =>{
        return this.dao.save(product)
    }
}

