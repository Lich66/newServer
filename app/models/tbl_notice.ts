import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING1024 = 1024;
const STRING64 = 64;
const STRING32 = 32;

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_notice extends Model<tbl_notice> {
    @PrimaryKey
    @Column({
        comment: '公告id'
    })
    public index: number;

    @Column({
        type: DataType.STRING(STRING32),
        comment: '公告类型'
    })
    public notice_type: string;

    @Column({
        type: DataType.STRING(STRING64),
        comment: '公告标题'
    })
    public notice_title: string;

    @Column({
        comment: '公告起始时间'
    })
    public notice_start_time: Date;

    @Column({
        comment: '公告结束时间'
    })
    public notice_end_time: Date;

    @Column({
        type: DataType.STRING(STRING1024),
        comment: '公告内容'
    })
    public value: string;

}
