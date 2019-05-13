import { Table, Column, Model, PrimaryKey, DataType, Length } from 'sequelize-typescript';

@Table
export class tbl_user extends Model<tbl_user> {
  @PrimaryKey
  @Column
  public userid: number;

  @Column({ type:DataType.STRING(64) })
  public usernick: string;

  @Column({ type:DataType.STRING(512) })
  public image: string;

  @Column
  public regtime: Date;

  @Column
  public diamond: number;

  @Column({ type:DataType.STRING(32) })
  public region: string;

  @Column({ type:DataType.STRING(32) })
  public ip: string;

  @Column
  public sex: number;

  @Column({ type:DataType.STRING(32) })
  public invite_code: string;

  @Column
  public inviter: number;

  @Column
  public logintime: Date;
}
