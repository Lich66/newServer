import { Model } from 'sequelize-typescript';
export interface IClubuser {

    cid: number;
    clubid: number;
    userid: number;
    chactor: number;
    adtime: Date;
    invitor: string;
    points: number;
    freeze_flag: boolean;
    assist_flag: boolean;
    pay_flag: boolean;
    // [key: string]: any;
}


// tslint:disable-next-line: class-name
export interface ITbl_clubuser extends Model<ITbl_clubuser>, IClubuser {
    // [key: string]: any;
}
