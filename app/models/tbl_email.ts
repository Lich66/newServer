import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING64 = 64;
const STRING32 = 32;
const STRING512 = 512;


@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_email extends Model<tbl_email> {
    @PrimaryKey
    @Column({
        comment: '邮件id'
    })
    public msgid: number;

    @Column({
        comment: '接收者id'
    })
    public userid: number;

    @Column({
        comment: '邮件类型'
    })
    public type: number;

    @Column({
        type: DataType.STRING(STRING512),
        comment: '标题'
    })
    public title: string;

    @Column({
        type: DataType.STRING(STRING512),
        comment: '内容'
    })
    public content: string;

    @Column({
        type: DataType.STRING(STRING32),
        comment: '发送时间'
    })
    public sendTime: string;

    @Column({
        comment: '是否已读(0:未读,1:已读)'
    })
    public isRead: number;

    @Column({
        type: DataType.STRING(STRING512),
        comment: '附件'
    })
    public items: string;
}
