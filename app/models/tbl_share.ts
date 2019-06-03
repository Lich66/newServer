import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING64 = 64;
const STRING512 = 512;

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_share extends Model<tbl_share> {
    @PrimaryKey
    @Column({
        comment: '分享数据id'
    })
    public share_id: number;

    @Column({
        type: DataType.STRING(STRING512),
        comment: '二维码图片数据'
    })
    public photo_url: string;

    @Column({
        type: DataType.STRING(STRING64),
        comment: '图片位置'
    })
    public photo_position: string;

    @Column({
        type: DataType.STRING(STRING64),
        comment: '图片大小'
    })
    public photo_size: string;

    @Column({
        type: DataType.STRING(STRING64),
        comment: '邀请码位置'
    })
    public code_position: string;


}
