import { IResponse } from '../global/response';
import { IUser } from '../models/tbl_user';

/**
 * tbl_user表相关的request
 */
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
    inviter?: string;
    logintime?: Date;
    invitation_status?: number;
    // [key: string]: any;
}
/**
 * 登陆后的返回
 */
export interface IUserResponse extends IUser {
    token: string;
    // [key: string]: any;
}
/**
 * accout表中玩家登陆的request
 */
export interface IUserinfoRequest {
    token?: string;
    wxopenid?: string;
    xlopenid?: string;
    // [key: string]: string;
}
/**
 * accout的账号密码登陆的request
 */
export interface IAccountInfoRequest {
    account: string;
    password: string;
    // [key: string]: any;
}
/**
 * accout表中的 token登陆的 request
 */
export interface ITokenInfoRequest {
    token: string;
    // [key: string]: string;
}
/**
 * 登陆的类型
 */

export interface IAuthReturn extends IResponse {
    data?: IUserResponse;
    // [key: string]: any;
}
