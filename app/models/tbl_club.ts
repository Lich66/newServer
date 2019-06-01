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
        comment: '玩法类型'
    })
    public play_type: number;

    @Column({
        comment: '开桌'
    })
    public player_num: number;

    @Column({
        comment: '底分'
    })
    public base_point: number;

    @Column({
        comment: '总回合数'
    })
    public round: number;

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
        comment: '通比玩法'
    })
    public all_contrast_play: number;

    @Column({
        comment: '轮庄玩法'
    })
    public take_turns_play: number;

    @Column({
        comment: '上庄玩法'
    })
    public up_banker_play: number;

    @Column({
        comment: '特殊牌型'
    })
    public special_card: string;

    @Column({
        comment: '快速模式标志位'
    })
    public fast_flag: boolean;

    @Column({
        comment: '中途禁入标志'
    })
    public half_way_add: boolean;

    @Column({
        comment: '搓牌标志'
    })
    public rubbing_flag: boolean;

    @Column({
        comment: '道具禁用标志'
    })
    public item_use: boolean;

    @Column({
        comment: '闲家买码'
    })
    public buy_code: boolean;

    @Column({
        comment: '推注限制'
    })
    public bolus_limit: boolean;

    @Column({
        comment: '暗抢庄家标志'
    })
    public grab_flag: boolean;

    @Column({
        comment: '加倍标志'
    })
    public double_flag: boolean;

    @Column({
        comment: '王癞玩法'
    })
    public laizi_type: number;

    @Column({
        comment: '茶楼类型,普通还是比赛'
    })
    public type: number;

    @Column({
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
