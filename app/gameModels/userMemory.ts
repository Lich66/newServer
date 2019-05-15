import { IUserRequest } from "../interface/user/remote/userInterface";
import { Data } from "ws";

export class UserMemory {
    userid: number;      //ID
    usernick: string;    //昵称
    image: string;       //头像地址
    regtime: Date;       //注册时间
    diamond: number;     //钻石数
    region: string;      //地区
    ip: string;          //登录IP
    sex: number;         //性别
    invite_code: string; //邀请码
    inviter: number;     //邀请者
    logintime: Date;     //最后登录时间
    roomlist: number[] = [];  //玩家创建的房间id列表

    constructor(userInfo: IUserRequest) {
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