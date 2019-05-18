import { Model } from 'sequelize-typescript';
export interface IAccount {
    token: string;
    wxopenid: string;
    xlopenid: string;
    uid: number;
    account: string;
    password: string;
    // [key: string]: any;
}


// tslint:disable-next-line: class-name
export interface ITbl_account extends Model<ITbl_account>, IAccount {
    // [key: string]: any;
}
