import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table
export class tbl_account extends Model<tbl_account> {

  @Column({ type: DataType.STRING(64) })
  public token: string;

  @Column({ type: DataType.STRING(64) })
  public wxopenid: string;

  @Column({ type: DataType.STRING(64) })
  public xlopenid: string;

  @AutoIncrement
  @PrimaryKey
  @Column
  public uid: number;

  @Column({ type: DataType.STRING(64) })
  public account: string;

  @Column({ type: DataType.STRING(64) })
  public password: string;

}
