import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING128 = 128;
const STRING256 = 256;
const STRING1024 = 1024;
const STRING2048 = 2048;

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_report_room extends Model<tbl_report_room> {
    @PrimaryKey
    @Column({
        comment: '战绩表id'
    })
    public reportid: number;

    @Column({
        comment: '房间id'
    })
    public roomid: number;

    @Column({
        comment: '房主id'
    })
    public creatorid: number;

    @Column({
        comment: '开始时间'
    })
    public starttime: Date;

    @Column({
        type: DataType.STRING(STRING128),
        comment: '房间配置信息'
    })
    public roomconfig: string;

    @Column({
        comment: '对局回合数'
    })
    public round: number;

    @Default(0)
    @Column({
        comment: '房间类型(茶楼:[比赛场:2,休闲场:1],普通场:0)'
    })
    public roomtype: number;

    @Column({
        type: DataType.STRING(STRING128),
        comment: '玩家id列表'
    })
    public useridlist: string;

    @Column({
        type: DataType.STRING(STRING256),
        comment: '玩家昵称列表'
    })
    public usernicklist: string;

    @Column({
        type: DataType.STRING(STRING2048),
        comment: '玩家头像列表'
    })
    public userimagelist: string;

    @Column({
        type: DataType.STRING(STRING128),
        comment: '大赢家id列表'
    })
    public winnerlist: string;

    @Column({
        type: DataType.STRING(STRING128),
        comment: '土豪id列表'
    })
    public loserlist: string;

    @Column({
        type: DataType.STRING(STRING1024),
        comment: '最终战绩'
    })
    public finalreport: string;

    @Column({
        type: DataType.STRING(STRING2048),
        comment: '详细战绩'
    })
    public detailreport: string;

    @Column({
        comment: '结束时间'
    })
    public endtime: Date;

    @Default(0)
    @Column({
        comment: '结束类型(正常:0,解散:1)'
    })
    public endtype: number;

    @Default(0)
    @Column({
        comment: '战绩状态(正常:0,删除:1)'
    })
    public state: number;
}
