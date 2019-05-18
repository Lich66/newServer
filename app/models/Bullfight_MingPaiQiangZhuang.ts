import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class Bullfight_MingPaiQiangZhuang extends Model<Bullfight_MingPaiQiangZhuang> {
  
  @PrimaryKey
  @Column
  public index: string;

  @Column
  public GameType: string;

  @Column
  public GamePlay: string;

  @Column
  public OpenDeskNum: string;

  @Column
  public BottomPouring: string;

  @Column
  public SetQuotient: string;

  @Column
  public RoomPayMode: string;

  @Column
  public RoomPayCost: string;

  @Column
  public StartGameMode: string;

  @Column
  public BolusChoose: string;

  @Column
  public MaximumBank: string;

  @Column
  public DoubleRule: string;

  @Column
  public SpecialDoubleRule: string;

  @Column
  public HighLevelChoose: string;

  @Column
  public WangLaiMode: string;

}
