import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class Bullfight_BaseDB extends Model<Bullfight_BaseDB> {
  
  @PrimaryKey
  @Column
  public Index: string;

  @Column
  public Key: string;

  @Column
  public Text: string;

  @Column
  public Value: string;

}
