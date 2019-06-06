import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class test extends Model<test> {
    @PrimaryKey
    @Column({
        comment: '第1张'
    })
    public p1: string;

    @Column({
        comment: '第2张'
    })
    public p2: string;

    @Column({
        comment: '第3张'
    })
    public p3: string;

    @Column({
        comment: '第4张'
    })
    public p4: string;

    @Column({
        comment: '第5张'
    })
    public p5: string;


}
