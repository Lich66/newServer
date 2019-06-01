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
    inviter: string;
    logintime: Date;
    // [key: string]: any;
}

// tslint:disable-next-line: class-name
export interface ITbl_user extends Model<ITbl_user>, IUser {
    // [key: string]: any;
}
