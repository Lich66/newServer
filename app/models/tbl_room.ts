import { AutoIncrement, BeforeBulkCreate, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const BIGINT20 = '20';
const STRING64 = 64;
const STRING32 = 32;
const STRING2048 = 2048;
const STRING512 = 512;
@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_room extends Model<tbl_room> {

    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.BIGINT(BIGINT20),
        comment: 'roomid'
    })
    public roomid: number;

    @Column({
        comment: '茶楼id'
    })
    public clubid: number;

    @Column({
        comment: '房间创建时间'
    })
    public create_time: Date;
    @BeforeBulkCreate
    public static makeUpperCase(instance: tbl_room[]) {
        // this will be called when an instance is created or updated
        instance.map((item) => {
            item.create_time = new Date();
        });
    }

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
        comment: '基本配置数组'
    })
    public config_str: string;

}
