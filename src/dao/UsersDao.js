import userService from "./models/User.js";

export default class UsersDao {
    getAll = () => {
        return userService.find()
    }
    getByID = (propid) => {
        return userService.findOne({_id:propid})
    }
    getByEmail = (propEmail) => {
        return userService.findOne({email: propEmail})
    }
    save = (propUser) => {
        return userService.create(propUser)
    }
}