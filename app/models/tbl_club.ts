import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType,Default, BeforeCreate } from 'sequelize-typescript';

@Table
export class tbl_club extends Model<tbl_club> {

    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.BIGINT(20),
        comment: '茶楼id'
    })
    public clubid: number;

    @Column({
        type: DataType.STRING(64),
        comment: '所属玩家'
    })
    public uid: number;

    @Column({
        type: DataType.STRING(32),
        comment: '茶楼名字'
    })
    public name: string;

    @Column({
        type: DataType.STRING(2048),
        comment: '茶楼公告'
    })
    public notice: string;

    @Column({
        type: DataType.STRING(512),
        comment: '茶楼默认玩法设置'
    })
    public play_setting: string;

    @Column({
        comment: '茶楼类型,普通还是比赛'
    })
    public type: number;

    @Column({
        type:'TIMESTAMP',
        comment: '茶楼创建时间'
    })
    public create_time: Date;
    @BeforeCreate
    static makeUpperCase(instance: tbl_club) {
        // this will be called when an instance is created or updated
        instance.create_time = new Date();
    }
    
    @Default(false)
    @Column({
        comment: '打烊标志'
    })
    public open_flag: boolean;

    @Column({
        comment: '非aa支付开关'
    })
    public pay_flag: boolean;

    @Default(false)
    @Column({
        comment: '审核开关'
    })
    public audit_flag: boolean;

    @Column({
        comment: '积分是否可查看标识'
    })
    public integral_flag: boolean;

    @Default(false)
    @Column({
        comment: '隐私标志'
    })
    public privacy_flag: boolean;

    @Column({
        comment: '底分'
    })
    public end_points: number;

    @Column({
        comment: '参加分数'
    })
    public join_points: number;

    @Column({
        comment: '负分设置'
    })
    public point_setflag: boolean;

    @Column({
        comment: '积分调整选项'
    })
    public point_adjustflag: boolean;

    @Column({
        comment: '积分权限类型'
    })
    public point_permission: number;

    @Column({
        comment: '表情赠送对象'
    })
    public present_target: number;

    @Column({
        comment: '表情赠送次数'
    })
    public present_times: number;

    @Column({
        comment: '赠送积分'
    })
    public present_points: number;

}
