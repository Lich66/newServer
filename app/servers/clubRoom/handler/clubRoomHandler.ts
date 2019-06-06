import { Application, BackendSession } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { ClubRoom } from '../../../controller/clubRoom/clubRoom';
import { ClubRoomList } from '../../../controller/redis/clubRoomList/clubRoomList';
import { ClubRoomServerId } from '../../../controller/redis/clubRoomServerId/clubRoomServerId';
import { ClubRoomState } from '../../../controller/redis/clubRoomState/clubRoomState';
import { User } from '../../../controller/user/user';
import { gameChannelKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';
import { IClubRoomRequest, IClubRoomReturn, IClubRoomRpc, IClubRoomSidReturn, IClubRoomStateReturn } from '../../../interface/clubRoom/clubRoomInterface';
import { Game } from '../../../util/game';

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
    public getGlobalChannelServiceStatus(): GlobalChannelServiceStatus {
        return this.globalChannelStatus;
    }
    public getApp(): Application {
        return this.app;
    }

    public async createClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {
        return null;
    }

    // 假的 删除的时候解散茶楼 就都删了
    public async deleteClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        return null;
    }

    public async updateClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {
        if (!ClubRoominfo || !ClubRoominfo.roomid) {
            return {
                code: 10003
            };
        }
        let njson = { ...ClubRoominfo };
        delete njson.roomid;
        delete njson.create_time;
        delete njson.clubid;

        let result = await ClubRoom.updateClubRoom({ roomid: ClubRoominfo.roomid, clubid: ClubRoominfo.clubid, uid: session.uid }, njson);
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 15001
            };
        }
    }

    public async getClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {
        if (!ClubRoominfo || !ClubRoominfo.clubid) {
            return {
                code: 10003
            };
        }
        let result = await ClubRoom.getClubRoom({ roomid: ClubRoominfo.roomid });
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 15002
            };
        }
    }

    public async getAllClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {
        if (!ClubRoominfo || !ClubRoominfo.clubid) {
            return {
                code: 10003
            };
        }
        let result = await ClubRoom.getAllClubRoom({ clubid: ClubRoominfo.clubid });
        if (result.length > 0) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 15003
            };
        }
    }

    /**
     * 
     * 获取全部房间的椅子信息
     */
    public async getAllClubRoomChairsState(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomStateReturn> {
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 15004
            };
        }
        // const roomIdList = await redisClient.lrangeAsync(`${redisKeyPrefix.club}${clubid}`, 0, MAXLENGTH);
        const roomIdList = await ClubRoomList.getClubRoomList({ clubid });
        if (roomIdList.length == 0) {
            return {
                code: 15005
            };
        }
        const roomarr = [];
        for (const iterator of roomIdList) {
            const json: any = {};
            json.roomid = iterator;
            // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${iterator}`);
            const state = await ClubRoomState.getClubRoomAllChairsState({ clubid, roomid: Number.parseInt(iterator, 0) });
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    // const element = state[key];
                    const userinfo = await User.getUser({ userid: Number.parseInt(state[key], 0) });
                    json[key] = userinfo;
                }
            }
            roomarr.push(json);
        }
        return {
            code: 0,
            data: roomarr
        };
    }
    /**
     * 
     * 获取茶楼下全部房间的 正在房间的信息
     */
    public async getAllClubRoomUsersState(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomStateReturn> {
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 15006
            };
        }
        // const roomIdList = await redisClient.lrangeAsync(`${redisKeyPrefix.club}${clubid}`, 0, MAXLENGTH);
        const roomIdList = await ClubRoomList.getClubRoomList({ clubid });
        const roomarr = [];
        for (const iterator of roomIdList) {
            const json: any = {};
            json.roomid = iterator;
            json.userlist = {};
            // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${iterator}`);
            const state = await ClubRoomState.getClubRoomAllUsersState({ clubid, roomid: Number.parseInt(iterator, 0) });
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    // const element = state[key];
                    const userinfo = await User.getUser({ userid: Number.parseInt(key, 0) });
                    json.userlist[key] = userinfo;
                }
            }
            roomarr.push(json);
        }
        return {
            code: 0,
            data: roomarr
        };
    }

    /**
     * 
     * 获取某房间的用户信息
     */
    public async getClubRoomUserState(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomStateReturn> {
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 15007
            };
        }
        const roomid = session.get('roomid');
        if (!roomid) {
            return {
                code: 15008
            };
        }
        const json: any = {};
        json.roomid = roomid;
        // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${roomid}`);
        const state = await ClubRoomState.getClubRoomAllUsersState({ clubid, roomid });
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                // const element = state[key];
                const userinfo = await User.getUser({ userid: Number.parseInt(key, 0) });
                json[key] = userinfo;
            }
        }
        return {
            code: 0,
            data: json
        };
    }

    /**
     * 
     * 获取某房间的椅子信息
     */
    public async getClubRoomAllChairsState(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomStateReturn> {
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 15009
            };
        }
        const roomid = session.get('roomid');
        if (!roomid) {
            return {
                code: 15010
            };
        }
        const json: any = {};
        json.roomid = roomid;
        // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${roomid}`);
        const state = await ClubRoomState.getClubRoomAllChairsState({ clubid, roomid });
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                // const element = state[key];
                const userinfo = await User.getUser({ userid: Number.parseInt(state[key], 0) });
                json[key] = userinfo;
                json[key].chairIndex = key;
            }
        }
        return {
            code: 0,
            data: json
        };
    }

    /**
     * 
     * 获取clubroom的serverid 
     */
    public async getClubRoomServerId(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomSidReturn> {
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 15011
            };
        }
        let serverId = this.app.getServerId();

        const channel = this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.clubRoom}${ClubRoominfo.roomid}`);
        let update = true;
        for (const key in channel) {
            if (channel.hasOwnProperty(key)) {
                const element = channel[key];
                const ishas = element[`${gameChannelKeyPrefix.clubRoom}${ClubRoominfo.roomid}`].length > 0;
                if (ishas) {
                    serverId = await ClubRoomServerId.getClubRoomServerId({ clubid, roomid: ClubRoominfo.roomid });
                    update = false;
                }
            }
        }
        if (update) {
            ClubRoomServerId.setClubRoomServerId({ clubid, roomid: ClubRoominfo.roomid, sid: serverId });
        }
        return {
            code: 0,
            data: serverId
        };
    }

    public async joinClubRoom(clubroomrpc: IClubRoomRpc, session: BackendSession): Promise<IClubRoomReturn> {
        if (!clubroomrpc || !clubroomrpc.roomid) {
            return {
                code: 10003
            };
        }

        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 15012
            };
        }
        session.set('roomid', clubroomrpc.roomid);
        await session.apush('roomid');
        const clubRoom = await ClubRoom.getClubRoom({ roomid: clubroomrpc.roomid });
        if (!clubRoom) {
            return {
                code: 15013
            };
        }

        const clubChannel = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.club}${clubid}`);
        for (const key in clubChannel) {
            if (clubChannel.hasOwnProperty(key)) {
                const element = clubChannel[key];
                const ishas = element[`${gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.leave(session.uid, key, `${gameChannelKeyPrefix.club}${clubid}`);
                }
            }
        }

        const roomChannel = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.clubRoom}${clubroomrpc.roomid}`);
        for (const key in roomChannel) {
            if (roomChannel.hasOwnProperty(key)) {
                const element = roomChannel[key];
                const ishas = element[`${gameChannelKeyPrefix.clubRoom}${clubroomrpc.roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${session.uid}`, key, `${gameChannelKeyPrefix.clubRoom}${clubroomrpc.roomid}`);
                }
            }
        }
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        // 发送到房间
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onEntryClubRoom}`, { user }, `${gameChannelKeyPrefix.clubRoom}${clubroomrpc.roomid}`);
        // 发送到大厅
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onEntryClubRoom}`, { user, roomid: clubroomrpc.roomid }, `${gameChannelKeyPrefix.club}${clubid}`);

        // redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, `${user.userid}`, '-1');
        ClubRoomState.setClubRoomUserState({ clubid, roomid: clubroomrpc.roomid, uid: user.userid, state: -1 });

        return {
            code: 0,
            data: clubRoom
        };

    }

    public async leaveClubRoom(clubroomrpc: IClubRoomRpc, session: BackendSession): Promise<IClubRoomReturn> {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        if (!roomid) {
            return {
                code: 15014
            };
        }
        if (!clubid) {
            return {
                code: 15015
            };
        }
        const channels = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.clubRoom}${roomid}`);
        // const channel = this.channelService.getChannel(`${gameChannelKeyPrefix.club}${session.get('clubid')}`, false);
        for (const key in channels) {
            if (channels.hasOwnProperty(key)) {
                const element = channels[key];
                const ishas = element[`${gameChannelKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (ishas) {
                    this.globalChannelStatus.leave(`${session.uid}`, key, `${gameChannelKeyPrefix.clubRoom}${roomid}`);
                }
            }
        }
        const clubchannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.club}${clubid}`);

        for (const key in clubchannels) {
            if (clubchannels.hasOwnProperty(key)) {
                const element = clubchannels[key];
                const ishas = element[`${gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${session.uid}`, key, `${gameChannelKeyPrefix.club}${clubid}`);
                }
            }
        }
        // 获取是否已经坐下
        // const chairIndex = await redisClient.hgetAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`, `${session.uid}`);
        const chairIndex = await ClubRoomState.getClubRoomUserState({ clubid, roomid, uid: Number.parseInt(session.uid, 0) });
        // 删除标识
        // await redisClient.hdelAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`, `${session.uid}`);
        ClubRoomState.delClubRoomUser({ clubid, roomid, uid: Number.parseInt(session.uid, 0) });
        // 如果已经坐下，位子空出来
        if (Number.parseInt(chairIndex, 0) >= 0) {
            ClubRoomState.setClubRoomChairState({ clubid, roomid, chairIndex: Number.parseInt(chairIndex, 0), state: -1 });
            // await redisClient.hsetAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`, `${gameChannelKeyPrefix.chair}${chairIndex}`, '-1');
        }

        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStandUp}`, { user, roomid, chairIndex }, `${gameChannelKeyPrefix.club}${clubid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStandUp}`, { user, chairIndex }, `${gameChannelKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onLeaveClubRoom}`, { user }, `${gameChannelKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onLeaveClubRoom}`, { user, roomid }, `${gameChannelKeyPrefix.club}${clubid}`);
        session.set('roomid', null);
        session.apush('roomid');
        return {
            code: 0,
            data: clubid
        };

    }
    public async sitDown(obj: any, session: BackendSession): Promise<IClubRoomReturn> {
        const MAXLENGTH = 20;
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        if (!roomid) {
            return {
                code: 15016
            };
        }
        if (!clubid) {
            return {
                code: 15017
            };
        }
        const roomChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.clubRoom}${roomid}`);
        for (const key in roomChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = roomChannels[key];
                const ishas = element[`${gameChannelKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 15018
                    };
                }
            }
        }
        const clubChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.club}${clubid}`);
        for (const key in clubChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = clubChannels[key];
                const ishas = element[`${gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 15019
                    };
                }
            }
        }
        // const roomInfo = await redisClient.hgetallAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`);
        const roomInfo = await ClubRoomState.getClubRoomAllChairsState({ clubid, roomid });

        let chairIndex = -1;
        let index = 0;
        do {
            if (Number.parseInt(roomInfo[index], 0) < 0) {
                chairIndex = index;
            }
            index++;

        } while (chairIndex < 0 && chairIndex < MAXLENGTH);
        if (chairIndex < 0) {
            return {
                code: 15020
            };
        }
        // await redisClient.hsetAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`, `${session.uid}`, `${chairIndex}`);
        // await redisClient.hsetAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`, `${gameChannelKeyPrefix.chair}${chairIndex}`, `${session.uid}`);
        ClubRoomState.setClubRoomUserState({ clubid, roomid, uid: Number.parseInt(session.uid, 0), state: chairIndex });
        ClubRoomState.setClubRoomChairState({ clubid, roomid, chairIndex, state: Number.parseInt(session.uid, 0) });
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });

        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onSitDown}`, { user, chairIndex }, `${gameChannelKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onSitDown}`, { user, chairIndex, roomid }, `${gameChannelKeyPrefix.club}${clubid}`);
        return {
            code: 0
        };

    }
    public async standUp(obj: any, session: BackendSession): Promise<IClubRoomReturn> {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        if (!roomid) {
            return {
                code: 15021
            };
        }
        if (!clubid) {
            return {
                code: 15022
            };
        }
        const roomChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.clubRoom}${roomid}`);
        for (const key in roomChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = roomChannels[key];
                const ishas = element[`${gameChannelKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 15023
                    };
                }
            }
        }
        const clubChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.club}${clubid}`);
        for (const key in clubChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = clubChannels[key];
                const ishas = element[`${gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 15024
                    };
                }
            }
        }
        const chairIndex = await ClubRoomState.getClubRoomUserState({ clubid, roomid, uid: Number.parseInt(session.uid, 0) });
        if (Number.parseInt(chairIndex, 0) < 0) {
            return {
                code: 15025
            };
        }
        ClubRoomState.setClubRoomUserState({ clubid, roomid, uid: Number.parseInt(session.uid, 0), state: -1 });
        ClubRoomState.setClubRoomChairState({ clubid, roomid, chairIndex: Number.parseInt(chairIndex, 0), state: -1 });
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStandUp}`, { user, chairIndex }, `${gameChannelKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStandUp}`, { user, chairIndex, roomid }, `${gameChannelKeyPrefix.club}${clubid}`);
        return {
            code: 0
        };
    }
    public async startGame(obj: any, session: BackendSession) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        if (!roomid) {
            return {
                code: 15026
            };
        }
        if (!clubid) {
            return {
                code: 15027
            };
        }
        const clubroom = await ClubRoom.getClubRoom({ roomid });
        let game = new Game(clubroom, this, clubid, roomid);
        this.app.set(`${gameChannelKeyPrefix.club_room_game}${roomid}`, game);
        game.start();
        return {
            code: 0
        };
    }
    public async grabBanker(json: { number: number }, session: BackendSession) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        let game: Game = this.app.get(`${gameChannelKeyPrefix.club_room_game}${roomid}`);

        let parms = {};
        parms[session.uid] = json.number;
        return {
            code: game.userGrabBanker(parms)
        };
    }
    public async setBet(json: { number: number }, session: BackendSession) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        let game: Game = this.app.get(`${gameChannelKeyPrefix.club_room_game}${roomid}`);

        let parms = {};
        parms[session.uid] = json.number;
        return {
            code: game.userSetBet(parms)
        };
    }

    public async expression(info: any, session: BackendSession): Promise<any> {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onExpression}`, { ...info, uid: session.uid }, `${gameChannelKeyPrefix.clubRoom}${roomid}`);
        return {
            code: 0
        };
        // return club;
    }
}
