import { IUserRequest } from '../interface/user/remote/userInterface';

export class UserMemory {
    // ID
    public userid: number;
    // 昵称      
    public usernick: string;
    // 头像地址   
    public image: string;
    // 注册时间     
    public regtime: Date;
    // 钻石数     
    public diamond: number;
    // 地区   
    public region: string;
    // 登录IP 
    public ip: string;
    // 性别        
    public sex: number;
    // 邀请码         
    public invite_code: string;
    // 邀请者 
    public inviter: number;
    // 最后登录时间   
    public logintime: Date;
    // 玩家创建的房间id列表
    public roomlist: number[] = [];

    public constructor(userInfo: IUserRequest) {
        this.userid = userInfo.userid;
        this.usernick = userInfo.usernick;
        this.image = userInfo.image;
        this.regtime = userInfo.regtime;
        this.diamond = userInfo.diamond;
        this.region = userInfo.region;
        this.ip = userInfo.ip;
        this.sex = userInfo.sex;
        this.invite_code = userInfo.invite_code;
        this.inviter = userInfo.inviter;
        this.logintime = userInfo.logintime;
    }
}
