import { Application, BackendSession, ChannelService } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { ClubRoom } from '../../../controller/clubRoom/clubRoom';
import { GameManager } from '../../../controller/game/gameManager';
import { User } from '../../../controller/user/user';
import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';
import { IClubRoomRequest, IClubRoomReturn, IClubRoomRpc, IClubRoomStateReturn } from '../../../interface/clubRoom/clubRoomInterface';



export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    private app: Application;
    // private channelService: ChannelService;
    private globalChannelStatus: GlobalChannelServiceStatus;
    public constructor(app: Application) {
        this.app = app;
        // this.channelService = app.get('channelService');
        this.globalChannelStatus = app.get(GlobalChannelServiceStatus.PLUGIN_NAME);
    }

    public async createClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {
        return null;
    }

    // 假的 删除的时候解散茶楼 就都删了
    public async deleteClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        return null;
    }

    public async updateClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        let njson = { ...ClubRoominfo };
        delete njson.roomid;
        delete njson.create_time;
        delete njson.clubid;

        let result = await ClubRoom.updateClubRoom({ roomid: ClubRoominfo.roomid, clubid: ClubRoominfo.roomid, uid: session.uid }, njson);
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async getClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        let result = await ClubRoom.getClubRoom({ clubid: ClubRoominfo.clubid });
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async getAllClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        let result = await ClubRoom.getAllClubRoom({ clubid: ClubRoominfo.clubid });
        if (result.length > 0) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }


    public async getAllClubRoomState(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomStateReturn> {
        const MAXLENGTH = 20;
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 500
            };
        }
        const roomIdList = await redisClient.lrangeAsync(`${redisKeyPrefix.club}${clubid}`, 0, MAXLENGTH);
        console.log(roomIdList);
        const roomarr = [];
        for (const iterator of roomIdList) {
            const json: any = {};
            json.roomid = iterator;
            const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${iterator}`);
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    // const element = state[key];
                    if (!key.startsWith(redisKeyPrefix.chair)) {
                        const userinfo = await User.getUser({ userid: Number.parseInt(key, 0) });
                        json[key] = userinfo;
                    } else {
                        json[key] = state[key];
                    }
                }
            }
            roomarr.push(json);
        }
        console.log(roomarr);
        if (roomarr.length > 0) {
            return {
                code: 0,
                data: roomarr
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async getClubRoomState(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomStateReturn> {
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 500
            };
        }
        const roomid = session.get('roomid');
        if (!roomid) {
            return {
                code: 500
            };
        }
        const json: any = {};
        json.roomid = roomid;
        const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${roomid}`);
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                // const element = state[key];
                if (!key.startsWith(redisKeyPrefix.chair)) {
                    const userinfo = await User.getUser({ userid: Number.parseInt(key, 0) });
                    json[key] = userinfo;
                } else {
                    json[key] = state[key];
                }
            }
        }
        return {
            code: 0,
            data: json
        };
    }



    public async leaveClubRoom(clubroomrpc: IClubRoomRpc, session: BackendSession): Promise<IClubRoomReturn> {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        const channels = await this.globalChannelStatus.getMembersByChannelName('connector', `${redisKeyPrefix.clubRoom}${roomid}`);
        // const channel = this.channelService.getChannel(`${redisKeyPrefix.club}${session.get('clubid')}`, false);
        for (const key in channels) {
            if (channels.hasOwnProperty(key)) {
                const element = channels[key];
                const ishas = element[`${redisKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (ishas) {
                    this.globalChannelStatus.leave(`${session.uid}`, key, `${redisKeyPrefix.clubRoom}${roomid}`);
                }
            }
        }
        // 获取是否已经坐下
        const chairIndex = await redisClient.hgetAsync(`${redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`);
        // 删除标识
        await redisClient.hdelAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
        // 如果已经坐下，位子空出来
        if (Number.parseInt(chairIndex, 0) >= 0) {
            await redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${redisKeyPrefix.chair}${chairIndex}`, '-1');
        }

        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStandUp}`, { user, roomid, chairIndex }, `${redisKeyPrefix.club}${clubid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStandUp}`, { user, chairIndex }, `${redisKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onLeaveClubRoom}`, { user }, `${redisKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onLeaveClubRoom}`, { user, roomid }, `${redisKeyPrefix.club}${clubid}`);
        // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
        // roomChannel.pushMessage(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, { user, action: 0 });
        session.set('roomid', null);
        session.push('roomid', () => {

        });
        return {
            code: 0,
            data: session.get('clubid')
        };

    }
    public async sitDown(obj: any, session: BackendSession): Promise<IClubRoomReturn> {
        const MAXLENGTH = 20;
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        const roomChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${redisKeyPrefix.clubRoom}${roomid}`);
        for (const key in roomChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = roomChannels[key];
                const ishas = element[`${redisKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 501
                    };
                }
            }
        }
        const clubChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${redisKeyPrefix.club}${clubid}`);
        for (const key in clubChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = clubChannels[key];
                const ishas = element[`${redisKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 502
                    };
                }
            }
        }
        const roomInfo = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${roomid}`);

        let chairIndex = -1;
        let index = 0;
        console.log('****************************************');
        console.log(roomInfo);
        console.log(JSON.stringify(roomInfo));
        do {
            if (Number.parseInt(roomInfo[`${redisKeyPrefix.chair}${index}`], 0) < 0) {
                chairIndex = index;
            }
            index++;

        } while (chairIndex < 0 && chairIndex < MAXLENGTH);
        if (chairIndex < 0) {
            return {
                code: 503
            };
        }
        await redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`, `${chairIndex}`);
        await redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${roomid}`, `${redisKeyPrefix.chair}${chairIndex}`, `${session.uid}`);
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });

        console.log(`${redisKeyPrefix.club}${clubid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onSitDown}`, { user, chairIndex }, `${redisKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onSitDown}`, { user, chairIndex, roomid }, `${redisKeyPrefix.club}${clubid}`);
        return {
            code: 0
        };

    }
    public async standUp(obj: any, session: BackendSession): Promise<IClubRoomReturn> {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        const roomChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${redisKeyPrefix.clubRoom}${roomid}`);
        for (const key in roomChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = roomChannels[key];
                const ishas = element[`${redisKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 501
                    };
                }
            }
        }
        const clubChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${redisKeyPrefix.club}${clubid}`);
        for (const key in clubChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = clubChannels[key];
                const ishas = element[`${redisKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 502
                    };
                }
            }
        }
        const chairIndex = await redisClient.hgetAsync(`${redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`);
        if (Number.parseInt(chairIndex, 0) < 0) {
            return {
                code: 500
            };
        }
        await redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`, '-1');
        await redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${roomid}`, `${redisKeyPrefix.chair}${chairIndex}`, '-1');
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStandUp}`, { user, chairIndex }, `${redisKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStandUp}`, { user, chairIndex, roomid }, `${redisKeyPrefix.club}${clubid}`);
        return {
            code: 0
        };
    }
    public async startGame(obj: any, session: BackendSession) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        await GameManager.startGame(clubid, roomid, this.globalChannelStatus);
        return {
            code: 0
        };
    }
}
