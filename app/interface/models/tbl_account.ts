import { Model } from 'sequelize-typescript';
export interface IAccount {
    token: string;
    wxopenid: string;
    xlopenid: string;
    uid: number;
    account: string;
    password: string;
}


export interface ITbl_account extends Model<ITbl_account>, IAccount {
}
