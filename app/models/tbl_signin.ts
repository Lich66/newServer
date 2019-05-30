import {  Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING512 = 512;


@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_signin extends Model<tbl_signin> {
    @PrimaryKey
    @Column({
        comment: '玩家id'
    })
    public userid: number;

    @Column({
        type: DataType.BIGINT('15'),
        comment: '签到时间戳'
    })
    public date: number;

    @Column({
        type: DataType.STRING(STRING512),
        comment: '签到表'
    })
    public form: string;

}
