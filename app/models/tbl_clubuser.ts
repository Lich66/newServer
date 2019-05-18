import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const BIGINT20 = '20';
const STRING64 = 64;
@Table
// tslint:disable-next-line: class-name
export class tbl_clubuser extends Model<tbl_clubuser> {

    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.BIGINT(BIGINT20),
        comment: '主键'
    })
    public cid: number;

    @Column({
        comment: '茶楼id'
    })
    public clubid: number;

    @Column({
        comment: '用户id'
    })
    public userid: number;

    @Column({
        comment: '角色'
    })
    public chactor: number;

    @Column({
        type: 'TIMESTAMP',
        comment: '加入时间'
    })
    public adtime: Date;

    @Column({
        type: DataType.STRING(STRING64),
        comment: '邀请人'
    })
    public invitor: string;

    @Column({
        comment: '积分'
    })
    public points: number;

    @Column({
        comment: '冻结标志'
    })
    public freeze_flag: boolean;

    @Column({
        comment: '助手标志'
    })
    public assist_flag: boolean;

    @Column({
        comment: '代付标志'
    })
    public pay_flag: boolean;

}
