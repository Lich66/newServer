import { tbl_user } from "../../models/tbl_user";
import { IUser, IUserModel } from "../../interface/user/handler/userInterface";

export class User{
    public static async addUser(json:IUser){
        await tbl_user.removeAttribute('id');
        const user = await tbl_user.create<IUserModel>(json);
        return user;
    }
    public static async deleteUser(){
        
    }
    public static async updateUser(){
        
    }
    public static async getUser(){
        
    }
}