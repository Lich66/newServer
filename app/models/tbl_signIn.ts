import { BeforeCreate, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING64 = 64;
const STRING32 = 32;
const STRING512 = 512;


@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_signIn extends Model<tbl_signIn> {
    @PrimaryKey
    @Column({
        comment: '玩家id'
    })
    public userid: number;

    @Column({
        comment: '签到时间戳'
    })
    public date: number;

    @Column({
        type: DataType.STRING(STRING512),
        comment: '签到表'
    })
    public form: string;

}
