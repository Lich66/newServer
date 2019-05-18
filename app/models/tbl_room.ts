import { AutoIncrement, BeforeCreate, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

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
        type: 'TIMESTAMP',
        comment: '房间创建时间'
    })
    public create_time: Date;
    @BeforeCreate
    public static makeUpperCase(instance: tbl_room) {
        // this will be called when an instance is created or updated
        instance.create_time = new Date();
    }

    @Column({
        type: DataType.STRING(STRING64),
        comment: '拥有者'
    })
    public owner: string;

    @Column({
        comment: '玩法'
    })
    public play_type: number;

    @Column({
        comment: '底分'
    })
    public base_point: number;

    @Column({
        comment: '桌子坐的人数'
    })
    public player_num: number;

    @Column({
        comment: '局数'
    })
    public round: number;

    @Column({
        comment: '房费类型'
    })
    public room_pay: number;

    @Column({
        comment: '开始选项'
    })
    public start_option: number;

    @Column({
        comment: '推注选项'
    })
    public push_flag: boolean;

    @Column({
        comment: '最大抢庄'
    })
    public max_grab: number;

    @Column({
        comment: '翻倍规则'
    })
    public double_rule: number;

    @Column({
        comment: '特殊牌型'
    })
    public special_card: number;

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
        comment: '表情禁用'
    })
    public emotion: boolean;

    @Column({
        comment: '暗抢庄家标志'
    })
    public grab_flag: boolean;

    @Column({
        comment: '加倍标志'
    })
    public double_flag: boolean;

    @Column({
        comment: '王赖玩法'
    })
    public laizi_type: number;

}
