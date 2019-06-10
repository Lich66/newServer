import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING512 = 512;
const STRING1024 = 1024;
const STRING65533 = 65533;

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_mail_system extends Model<tbl_mail_system> {
    @PrimaryKey
    @Column({
        comment: '邮件id'
    })
    public msgid: number;

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
        type: DataType.STRING(STRING512),
        comment: '附件'
    })
    public items: string;

    @Column({
        comment: '生效时间'
    })
    public starttime: Date;

    @Column({
        comment: '失效时间'
    })
    public endtime: Date;

    @Column({
        type: DataType.STRING(STRING65533),
        comment: '对象条件'
    })
    public condition: string;

}
