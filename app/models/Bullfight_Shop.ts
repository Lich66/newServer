import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { MAXVARCHA } from '../db/sequelize';
@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class Bullfight_Shop extends Model<Bullfight_Shop> {

    @Column
    public index: string;

    @Column
    public ViewOrder: string;

    @Column
    public Name: string;

    @Column
    public PayType: string;

    @Column
    public Money: string;

    @Column
    public Diamond: string;

    @Column
    public Extra: string;

    @Column
    public BuyNum: string;

}
