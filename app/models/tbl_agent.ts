import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
const STRING16 = 16;

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_agent extends Model<tbl_agent> {
  @PrimaryKey
  @Column({
    comment: 'uid'
  })
  public userid: number;

  @Column({
    type: DataType.STRING(STRING16),
    comment: '邀请码'
  })
  public invite_code: string;

  @Column({
    comment: '上级代理id'
  })
  public parent_id: number;

  @Column({
    comment: '代理大级别'
  })
  public big_level: number;

  @Column({
    comment: '代理小级别'
  })
  public small_level: number;
}
