import { UserMemory } from "../../gameModels/userMemory";
import { IUserRequest } from "../../interface/user/remote/userInterface";

export class UserManager {
    userList: { [key: number]: UserMemory } = {}
    constructor() {

    }
    setUser(key: number, value: IUserRequest) {
        let user: UserMemory = new UserMemory(value);
        this.userList[key] = user;
    }
    getUser(key: number) {
        return this.userList[key.toString()];
    }



}