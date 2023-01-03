

export default class UserService {
    constructor(dao){
        this.dao = dao
    }
    getUserByID = (id) => {
        return this.dao.getByID(id)
    }
    getUsers = () => {
        return this.dao.getAll()
    }
    getUserByEmail = (email) => {
        return this.dao.getByEmail(email)
    }
    saveUser = (user) => {
        return this.dao.save(user)
    }
    updateUserEmail = (userId, newEmail) => {
        return this.dao.updateUserEmail(userId, newEmail)
    }
    updateUserAddress = (userId, newAddress) => {
        return this.dao.updateUserAddress(userId, newAddress)
    }
}