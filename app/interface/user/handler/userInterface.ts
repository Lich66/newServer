import { Model } from "sequelize-typescript";
import { IResponse } from "../../global/response";
import { ITbl_account } from "../../models/tbl_account";


export interface IUser {
    userid?: number;
    usernick?: string;
    image?: string;
    regtime?: Date;
    diamond?: number;
    region?: string;
    ip?: string;
    sex?: number;
    invite_code?: string;
    inviter?: number;
    logintime?: Date;
}

export interface IUserModel extends Model<IUserModel>,IUser {
    
}

export interface IUserinfo {
    token?: string;
    wxopenid?: string;
    xlopenid?: string;
}

export interface IUserinfoModel extends Model<IUserinfoModel> {
    token?: string;
    wxopenid?: string;
    xlopenid?: string;
}

export interface IAccountInfo {
    account?: string;
    password?: string;
}

export interface IAccountInfoModel extends Model<IAccountInfoModel> {
    account?: string;
    password?: string;
}


export interface ITokenInfo {
    token?: string;
}

export interface ITokenInfoModel extends Model<ITokenInfoModel> {
    token?: string;
}


export interface IAuthReturn extends IResponse {
    data?: ITbl_account;
}