import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const BIGINT20 = '20';
@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_role extends Model<tbl_role> {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.BIGINT(BIGINT20),
        comment: 'roleid'
    })
    public roleid: number;

    @Column({
        comment: '账号'
    })
    public account: string;

    @Column({
        comment: '密码'
    })
    public password: string;


    @Column({
        comment: '盐'
    })
    public passsalt: string;

    @Column({
        comment: '权限'
    })
    public role: number;
}
