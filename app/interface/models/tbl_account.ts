import { Model } from 'sequelize-typescript';

export interface ITbl_account extends Model<ITbl_account> {
    token?: string;
    wxopenid?: string;
    xlopenid?: string;
    uid?: number;
    account?: string;
    password?: string;
}
