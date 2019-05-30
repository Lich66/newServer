import { Model } from 'sequelize-typescript';

export interface ISignIn {
    userid: number;
    date: number;
    form: string;
}

// tslint:disable-next-line: class-name
export interface ITbl_signIn extends Model<ITbl_signIn>, ISignIn {
    // [key: string]: any;
}
