import { UserMemory } from '../../gameModels/userMemory';
import { IUserRequest } from '../../interface/user/remote/userInterface';

export class UserManager {
    public userList: { [key: number]: UserMemory } = {};
    public constructor() {

    }
    public setUser(key: number, value: IUserRequest) {
        let user: UserMemory = new UserMemory(value);
        this.userList[key] = user;
    }
    public getUser(key: number) {
        return this.userList[key.toString()];
    }

}
