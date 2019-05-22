import { Channel, ChannelService } from 'pinus';
import { redisKeyPrefix } from '../gameConfig/nameSpace';
import { ITbl_room } from '../interface/models/tbl_room';
import { Pokers } from './poker';



export class Game {
    // 房间的配置信息
    private clubroom: ITbl_room;
    // 玩多少局
    private roundNumber: number;
    // 发的牌是什么 结算用
    private poker: number[][][];
    // user id
    private users: number[];
    // 发的牌是什么 发给用户用 主要用户核对
    private poker_user: { [key: string]: object };
    // 频道
    private channelService: ChannelService;
    // 频道
    private channel: Channel;
    public constructor(clubroom: ITbl_room, channelService: ChannelService) {
        this.clubroom = clubroom;
        this.channelService = channelService;
        this.channel = channelService.getChannel(`${redisKeyPrefix.clubRoom}${clubroom.roomid}`);
        this.roundNumber = clubroom.round;
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
        this.roundNumber--;
        this.sendPoker();
    }
    public sendPoker() {

        this.poker = [];
        this.poker_user = {};

        // 掏出一副牌
        const pokers = new Pokers();

        const plength = this.users.length;
        let pindex = 0;
        // 初始化用户的牌
        do {
            this.poker[pindex] = [];
            pindex++;
        } while (pindex <= plength);


        const sendcount = 5;
        let sindex = 0;
        // 随机发牌（全发）
        do {
            let index = 0;
            do {
                const pokerone: number[] = pokers.getPoker();
                this.poker[index].push(pokerone);
                index++;
            } while (index <= plength);

            sindex++;
        } while (sindex < sendcount);

        this.poker.forEach((element, i) => {
            this.poker_user[this.users[i]] = element;
            this.channelService.pushMessageByUids('onSendPoker', element.slice(0, 4), [{
                uid: `${this.users[sindex]}`,
                sid: this.channel.getMember(`${this.users[sindex]}`).sid
            }]);
        });
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
