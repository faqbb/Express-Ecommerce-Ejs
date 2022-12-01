import UsersDao from "../dao/UsersDao.js";
import UserService from "./UserService.js";
import CartsService from "./CartsService.js";
import CartsDao from "../dao/CartsDao.js";
import ProductsDao from "../dao/ProductsDao.js";
import ProductsService from "./ProductService.js";

export const usersService = new UserService(new UsersDao)
export const cartsService = new CartsService(new CartsDao)
export const productsService = new ProductsService(new ProductsDao)