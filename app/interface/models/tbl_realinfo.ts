import { Model } from 'sequelize-typescript';

export interface IRealInfo {
    userid: number;
    realname: string;
    idnum: string;
}

// tslint:disable-next-line: class-name
export interface ITbl_realInfo extends Model<ITbl_realInfo>, IRealInfo {
    // [key: string]: any;
}
