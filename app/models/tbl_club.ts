import { AllowNull, AutoIncrement, BeforeCreate, Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

const BIGINT20 = '20';
const STRING64 = 64;
const STRING32 = 32;
const STRING2048 = 2048;
const STRING512 = 512;
@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_club extends Model<tbl_club> {

    @AutoIncrement
    @PrimaryKey
    @AllowNull
    @Column({
        type: DataType.BIGINT(BIGINT20),
        comment: '茶楼id'
    })
    public clubid: number;

    @Column({
        comment: '所属玩家'
    })
    public uid: number;

    @Column({
        type: DataType.STRING(STRING32),
        comment: '茶楼名字'
    })
    public name: string;

    @Column({
        type: DataType.STRING(STRING2048),
        comment: '茶楼公告'
    })
    public notice: string;

    @Column({
        type: DataType.STRING(STRING512),
        comment: '茶楼默认玩法设置'
    })
    public play_setting: string;

    @Column({
        comment: '开桌'
    })
    public person_number: number;

    @Column({
        comment: '底分'
    })
    public end_points: number;

    @Column({
        comment: '总回合数'
    })
    public round_total: number;

    @Column({
        comment: '支付方式'
    })
    public pay_type: number;

    @Column({
        comment: '开始方式'
    })
    public start_type: number;

    @Column({
        comment: '推注方式'
    })
    public bolus_type: number;

    @Column({
        comment: '最大抢庄倍数'
    })
    public max_banker_bet: number;

    @Column({
        comment: '翻倍规则'
    })
    public double_rule: number;

    @Column({
        comment: '特殊牌型'
    })
    public special_card_type: string;

    @Column({
        comment: '高级选项'
    })
    public advanced_options: string;

    @Column({
        comment: '王癞玩法'
    })
    public laizi_type: number;

    @Column({
        comment: '茶楼类型,普通还是比赛'
    })
    public type: number;

    @Column({
        type: 'TIMESTAMP',
        comment: '茶楼创建时间'
    })
    public create_time: Date;
    @BeforeCreate
    public static makeUpperCase(instance: tbl_club) {
        // this will be called when an instance is created or updated
        instance.create_time = new Date();
    }

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
        comment: '打烊标志'
    })
    public open_flag: boolean;

    @Default(false)
    @Column({
        comment: '隐私标志'
    })
    public privacy_flag: boolean;

    @Column({
        comment: '非aa支付开关'
    })
    public pay_flag: boolean;

    /**
     * 下面的是比赛场的选项
     */

    @Column({
        comment: '参加分数'
    })
    public join_points: number;

    @Column({
        comment: '参加抢庄分数'
    })
    public join_rob_banker: number;

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
