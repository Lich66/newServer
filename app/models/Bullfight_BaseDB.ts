import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
// tslint:disable-next-line: class-name
export class Bullfight_BaseDB extends Model<Bullfight_BaseDB> {
  
  @PrimaryKey
  @Column
  public index: string;

  @Column
  public PlayerStartGemsNum: string;

  @Column
  public RoomStartID: string;

  @Column
  public ClubStartID: number;

}
