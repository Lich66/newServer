import {Table, Column, Model} from 'sequelize-typescript';

@Table
export class tbl_account extends Model<tbl_account> {

  @Column
  public token: string;

  @Column
  public wxopenid: string;

  @Column
  public xlopenid: string;

  @Column
  public uid: number;

  @Column
  public account: string;

  @Column
  public password: string;

}
