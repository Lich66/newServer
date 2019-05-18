import { IResponse } from '../../global/response';
import { IUser } from '../../models/tbl_user';
export interface IData {
    host: string;
    port: number;
    // [key: string]: string | number;
}
export interface IEntryReturn extends IResponse {
    data?: IData;
    // [key: string]: any;
}
export interface IUserReturn extends IResponse {
    data?: IUser;
}
