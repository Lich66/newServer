import {Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table
export class tbl_account extends Model<tbl_account> {

  @Column
  public token: string;

  @Column
  public wxopenid: string;

  @Column
  public xlopenid: string;
  
  @AutoIncrement
  @PrimaryKey
  @Column
  public uid: number;

  @Column
  public account: string;

  @Column
  public password: string;

}
