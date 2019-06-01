import { Model } from 'sequelize-typescript';

export interface IAgent {
    userid: number;
    invite_code: string;
    parent_id: number;
    big_level: number;
    small_level: number;
}

// tslint:disable-next-line: class-name
export interface ITbl_agent extends Model<ITbl_agent>, IAgent {
    // [key: string]: any;
}
