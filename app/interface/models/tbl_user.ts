import { Model } from 'sequelize-typescript';

export interface ITbl_user extends Model<ITbl_user> {
    username?: string;
    userid?: number;
    usernick?: string;
    password?: string;
    image?: string;
    regtime?: Date;
    gold?: number;
    roomcard?: number;
    region?: string;
    ip?: string;
    sex?: number;
    invite_code?: string;
    inviter?: number;
    logintime?: Date;
}
