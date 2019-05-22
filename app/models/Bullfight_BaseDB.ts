import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { MAXVARCHA } from '../db/sequelize';

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class Bullfight_BaseDB extends Model<Bullfight_BaseDB> {

  @PrimaryKey
  @Column({
    type: DataType.STRING(MAXVARCHA)
  })
  public Index: string;

  @Column
  public Key: string;

  @Column
  public Text: string;

  @Column
  public Value: string;

}
