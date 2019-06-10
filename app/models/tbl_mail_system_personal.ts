import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_mail_system_personal extends Model<tbl_mail_system_personal> {
    @PrimaryKey
    @Column({
        comment: '系统-个人邮件id'
    })
    public msdid: number;

    @Column({
        comment: '玩家id'
    })
    public userid: number;

    @Column({
        comment: '邮件id'
    })
    public msgid: number;

    @Column({
        comment: '是否已读(0:未读,1:已读)'
    })
    public isread: number;

    @Column({
        comment: '是否已领取(0:未领取,1:已领取)'
    })
    public isget: number;

    @Column({
        comment: '是否已删除(0:未删除,1:已删除)'
    })
    public isdel: number;

}
