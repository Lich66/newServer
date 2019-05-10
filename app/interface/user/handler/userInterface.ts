import { IResponse } from "../../global/response";
import { IUser } from "../../models/tbl_user";

export interface IUserRequest {
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

export interface IUserResponse extends IUser {
    token: string;
}

export interface IUserinfoRequest {
    token?: string;
    wxopenid?: string;
    xlopenid?: string;
}

export interface IAccountInfoRequest {
    account: string;
    password: string;
}

export interface ITokenInfoRequest {
    token: string;
}

export interface IAuthReturn extends IResponse {
    data?: IUserResponse;
}