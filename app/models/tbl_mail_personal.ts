import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING512 = 512;
const STRING1024 = 1024;

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_mail_personal extends Model<tbl_mail_personal> {
    @PrimaryKey
    @Column({
        comment: '邮件id'
    })
    public msgid: number;

    @Column({
        comment: '发送者id'
    })
    public senderid: number;

    @Column({
        comment: '接收者id'
    })
    public receiverid: number;

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
        type: DataType.STRING(STRING1024),
        comment: '内容'
    })
    public content: string;

    @Column({
        comment: '发送时间'
    })
    public starttime: Date;

    @Column({
        comment: '失效时间'
    })
    public endtime: Date;

    @Column({
        comment: '是否已读(0:未读,1:已读)'
    })
    public isread: number;

}
