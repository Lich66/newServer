import { BeforeCreate, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING64 = 64;
const STRING32 = 32;
const STRING512 = 512;


@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_realinfo extends Model<tbl_realinfo> {
  @PrimaryKey
  @Column({
    comment: 'uid'
  })
  public userid: number;

  @Column({
    type: DataType.STRING(STRING32),
    comment: '真实姓名'
  })
  public realname: string;

  @Column({
    type: DataType.STRING(STRING32),
    comment: '身份证id'
  })
  public idnum: string;
}
