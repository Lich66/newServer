import { BeforeCreate, Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

const STRING64 = 64;
const STRING32 = 32;
const STRING512 = 512;


@Table({ timestamps: false })
// tslint:disable-next-line: class-name
export class tbl_user extends Model<tbl_user> {
  @PrimaryKey
  @Column({
    comment: 'uid'
  })
  public userid: number;

  @Column({
    type: DataType.STRING(STRING64),
    comment: '昵称'
  })
  public usernick: string;

  @Column({
    type: DataType.STRING(STRING512),
    comment: '头像'
  })
  public image: string;

  @Column({
    comment: '注册时间'
  })
  public regtime: Date;
  @BeforeCreate
  public static makeUpperCase(instance: tbl_user) {
    // this will be called when an instance is created or updated
    instance.regtime = new Date();
  }

  @Column({
    comment: '钻石数'
  })
  public diamond: number;

  @Column({
    type: DataType.STRING(STRING32),
    comment: '注册地点'
  })
  public region: string;

  @Column({
    type: DataType.STRING(STRING32),
    comment: '注册ip'
  })
  public ip: string;

  @Column({
    comment: '性别'
  })
  public sex: number;

  @Column({
    type: DataType.STRING(7),
    comment: '邀请人的邀请码'
  })
  public inviter: string;

  @Column({
    comment: '最后登陆时间'
  })
  public logintime: Date;

  @Column({
    comment: '首冲标识'
  })
  public first_pay: boolean;

  @Column({
    comment: '推广员标识'
  })
  public generalize: number;

  @Column({
    comment: '首次分享标识'
  })
  public first_share: boolean;

  @Column({
    comment: '每日分享时间'
  })
  public share_time: Date;

  @Default(0)
  @Column({
    comment: '邀请状态(接收:0/拒收:1)'

  })
  public invitation_status: number;
}
