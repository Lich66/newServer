import { AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING64 = 64;
@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_account extends Model<tbl_account> {

  @Column({ type: DataType.STRING(STRING64) })
  public token: string;

  @Column({ type: DataType.STRING(STRING64) })
  public wxopenid: string;

  @Column({ type: DataType.STRING(STRING64) })
  public xlopenid: string;

  @AutoIncrement
  @PrimaryKey
  @Column
  public uid: number;

  @Column({ type: DataType.STRING(STRING64) })
  public account: string;

  @Column({ type: DataType.STRING(STRING64) })
  public password: string;

  @Default(new Date('2019-1-1'))
  @Column({
    comment: '解除封号时间'
  })
  public unsealtime: Date;
}
