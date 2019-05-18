import { IResponse } from '../../global/response';
import { IUser } from '../../models/tbl_user';

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
    // [key: string]: any;
}

export interface IUserResponse extends IUser {
    token: string;
    // [key: string]: any;
}

// export interface IUserinfoRequest {
//     token?: string;
//     wxopenid?: string;
//     xlopenid?: string;
// }
export interface IUserinfoRequest {
    token?: string;
    wxopenid?: string;
    xlopenid?: string;
    // [key: string]: string;
}
export interface IAccountInfoRequest {
    account: string;
    password: string;
    // [key: string]: any;
}

export interface ITokenInfoRequest {
    token: string;
    // [key: string]: string;
}

export interface IAuthReturn extends IResponse {
    data?: IUserResponse;
    // [key: string]: any;
}
