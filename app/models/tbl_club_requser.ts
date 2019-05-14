import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType,Default, BeforeCreate } from 'sequelize-typescript';

@Table
export class tbl_club_requser extends Model<tbl_club_requser> {

    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.BIGINT(20),
        comment: '主键'
    })
    public rid: number;

    @Column({
        type: DataType.BIGINT(20),
        comment: '茶楼id'
    })
    public clubid: number;

    @Column({
        comment: '用户id'
    })
    public userid: number;

    @Column({
        type:'TIMESTAMP',
        comment: '申请时间'
    })
    public req_time: Date;

}
