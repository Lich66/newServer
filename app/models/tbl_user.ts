import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING64 = 64;
const STRING32 = 32;
const STRING512 = 512;


@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_user extends Model<tbl_user> {
  @PrimaryKey
  @Column
  public userid: number;

  @Column({ type: DataType.STRING(STRING64) })
  public usernick: string;

  @Column({ type: DataType.STRING(STRING512) })
  public image: string;

  @Column
  public regtime: Date;

  @Column
  public diamond: number;

  @Column({ type: DataType.STRING(STRING32) })
  public region: string;

  @Column({ type: DataType.STRING(STRING32) })
  public ip: string;

  @Column
  public sex: number;

  @Column({ type: DataType.STRING(STRING32) })
  public invite_code: string;

  @Column
  public inviter: number;

  @Column
  public logintime: Date;
}
