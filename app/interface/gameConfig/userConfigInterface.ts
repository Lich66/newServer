import { IUser } from '../models/tbl_user';

export interface IUserConfig extends IUser {
    roomList: number[];
    [key: string]: any;
}
