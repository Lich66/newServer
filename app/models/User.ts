import {Table, Column, Model} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

  @Column
  public phone: string;

  @Column
  public password: string;

  @Column
  public isAdmin: number;
}
