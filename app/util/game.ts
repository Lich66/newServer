import { Channel, ChannelService } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { redisKeyPrefix } from '../gameConfig/nameSpace';
import { ITbl_room } from '../interface/models/tbl_room';
import { Pokers } from './poker';


export class Game {
    // 房间的配置信息
    private clubroom: ITbl_room;
    // 玩多少局
    private round: number;
    // 发的牌是什么 结算用
    private poker: number[][][];
    // user id
    private users: number[];
    // 发的牌是什么 发给用户用 主要用户核对
    private poker_user: { [key: string]: object };
    // 频道
    private globalChannelStatus: GlobalChannelServiceStatus;
    // 频道
    private channel: Channel;
    public constructor(clubroom: ITbl_room, globalChannelStatus: GlobalChannelServiceStatus, clubid: number) {
        this.clubroom = clubroom;
        this.globalChannelStatus = globalChannelStatus;
        // this.channel = channelService.getChannel(`${redisKeyPrefix.clubRoom}${clubroom.roomid}`);
        this.round = clubroom.round;
        this.poker = [];
        this.poker_user = {};
        this.users = [];
    }
    /**
     * pushUser
     */
    public pushUser(uid: number) {
        this.users.push(uid);
    }
    public startRound() {
        this.round--;
        this.sendPoker();
    }
    public sendPoker() {

        this.poker = [];
        this.poker_user = {};

        // 掏出一副牌
        const pokers = new Pokers();

        // 玩家数量
        const ulength = this.users.length;

        // // 玩家数量
        // const ulength = 6;
        /**
         * 开始发牌
         */

        // 玩家的index
        let uindex = 0;
        // 发多少张牌
        const sendcount = 5;

        // 初始化用户的牌
        while (uindex < ulength) {
            this.poker[uindex] = [];
            // 当前发的第几张牌
            let pindex = 0;
            do {
                this.poker[uindex].push(pokers.lpop());
                pindex++;
            } while (pindex < sendcount);
            uindex++;
        }

        // this.poker.forEach((element, i) => {
        //     this.poker_user[this.users[i]] = element;
        //     // this.channelService.pushMessageByUids('onSendPoker', element.slice(0, 4), [{
        //     //     uid: `${this.users[sindex]}`,
        //     //     sid: this.channel.getMember(`${this.users[sindex]}`).sid
        //     // }]);
        // });
        console.log(this.poker);
    }
    public settlement() {
        // 这个里还要有个结算
        this.channel.pushMessage('onSendPoker', this.poker_user);
        this.end();
    }
    public end() {
        // 这里入库
    }

}
