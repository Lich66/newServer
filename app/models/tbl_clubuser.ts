import { AutoIncrement, BeforeCreate, Column, DataType, Default, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { tbl_user } from './tbl_user';

const BIGINT20 = '20';
const STRING64 = 64;
@Table({ timestamps: false })
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

    @Default(5)
    @Column({
        comment: '角色'
    })
    public chactor: number;

    @Column({
        comment: '加入时间'
    })
    public adtime: Date;
    @BeforeCreate
    public static makeUpperCase(instance: tbl_clubuser) {
        // this will be called when an instance is created or updated
        instance.adtime = new Date();
    }

    @Column({
        type: DataType.STRING(STRING64),
        comment: '邀请人'
    })
    public invitor: string;

    @Default(0)
    @Column({
        comment: '积分'
    })
    public points: number;

    @Default(false)
    @Column({
        comment: '冻结标志'
    })
    public freeze_flag: boolean;

    @Default(false)
    @Column({
        comment: '助手标志'
    })
    public assist_flag: boolean;

    @Default(false)
    @Column({
        comment: '代付标志'
    })
    public pay_flag: boolean;

    @HasOne(() => tbl_user)
    public tbl_user: tbl_user;
}
