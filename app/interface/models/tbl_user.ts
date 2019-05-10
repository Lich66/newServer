import { Model } from 'sequelize-typescript';

export interface IUser {
    userid: number;
    usernick: string;
    image: string;
    regtime: Date;
    diamond: number;
    region: string;
    ip: string;
    sex: number;
    invite_code: string;
    inviter: number;
    logintime: Date;
}

export interface ITbl_user extends Model<ITbl_user>,IUser {
    
}
