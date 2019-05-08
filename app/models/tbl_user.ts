import {Table, Column, Model} from 'sequelize-typescript';

@Table
export class tbl_user extends Model<tbl_user> {

  @Column
  public username: string;

  @Column
  public userid: number;

  @Column
  public usernick: string;

  @Column
  public password: string;

  @Column
  public image: string;

  @Column
  public regtime: Date;

  @Column
  public gold: number;

  @Column
  public roomcard: number;

  @Column
  public region: string;

  @Column
  public ip: string;

  @Column
  public sex: number;

  @Column
  public invite_code: string;

  @Column
  public inviter: number;

  @Column
  public logintime: Date;
}
