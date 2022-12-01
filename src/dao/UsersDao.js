import userModel from "./models/User.js";

export default class UsersDao {
    getAll = () => {
        return userModel.find()
    }
    getByID = async (propid) => {
        let user = await userModel.findOne({_id:propid})
        return user
    }
    getByEmail = (propEmail) => {
        return userModel.findOne({email: propEmail})
    }
    save = (propUser) => {
        return userModel.create(propUser)
    }
}