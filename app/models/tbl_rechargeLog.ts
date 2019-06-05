import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const BIGINT20 = '20';

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_rechargeLog extends Model<tbl_rechargeLog> {
    @PrimaryKey
    @Column({
        type: DataType.BIGINT(BIGINT20),
        comment: '充值id'
    })
    public rechargeid: number;

    @Column({
        comment: '订单流水号'
    })
    public oderid: string;

    @Column({
        comment: 'uid'
    })
    public userid: number;


    @Column({
        type: DataType.FLOAT(8),
        comment: '充值金额'
    })
    public money: number;


    @Column({
        comment: '获得的钻石数'
    })
    public diamond: number;

    @Column({
        comment: '赠送的钻石数'
    })
    public extra: number;

    @Column({
        comment: '充值时间'
    })
    public rechargetime: Date;

    @Column({
        comment: '渠道'
    })
    public pf: string;

}
