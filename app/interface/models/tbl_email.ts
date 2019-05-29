import { Model } from 'sequelize-typescript';

export interface IEmail {
    msgid: number;
    userid: number;
    type: number;
    title: string;
    content: string;
    sendTime: number;
    isRead: number;
    items: string;
}

// tslint:disable-next-line: class-name
export interface ITbl_email extends Model<ITbl_email>, IEmail {
    // [key: string]: any;
}
