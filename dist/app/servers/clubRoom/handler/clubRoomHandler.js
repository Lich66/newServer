"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
const clubRoom_1 = require("../../../controller/clubRoom/clubRoom");
const clubRoomList_1 = require("../../../controller/redis/clubRoomList/clubRoomList");
const clubRoomServerId_1 = require("../../../controller/redis/clubRoomServerId/clubRoomServerId");
const clubRoomState_1 = require("../../../controller/redis/clubRoomState/clubRoomState");
const user_1 = require("../../../controller/user/user");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../../../gameConfig/socketRouterConfig");
const game_1 = require("../../../util/game");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
        // this.channelService = app.get('channelService');
        this.globalChannelStatus = app.get(pinus_global_channel_status_1.GlobalChannelServiceStatus.PLUGIN_NAME);
    }
    getGlobalChannelServiceStatus() {
        return this.globalChannelStatus;
    }
    getApp() {
        return this.app;
    }
    async createClubRoom(ClubRoominfo, session) {
        return null;
    }
    // 假的 删除的时候解散茶楼 就都删了
    async deleteClubRoom(ClubRoominfo, session) {
        return null;
    }
    async updateClubRoom(ClubRoominfo, session) {
        if (!ClubRoominfo || !ClubRoominfo.roomid) {
            return {
                code: 10003
            };
        }
        let njson = Object.assign({}, ClubRoominfo);
        delete njson.roomid;
        delete njson.create_time;
        delete njson.clubid;
        let result = await clubRoom_1.ClubRoom.updateClubRoom({ roomid: ClubRoominfo.roomid, clubid: ClubRoominfo.roomid, uid: session.uid }, njson);
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 15001
            };
        }
    }
    async getClubRoom(ClubRoominfo, session) {
        if (!ClubRoominfo || !ClubRoominfo.clubid) {
            return {
                code: 10003
            };
        }
        let result = await clubRoom_1.ClubRoom.getClubRoom({ clubid: ClubRoominfo.clubid });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 15002
            };
        }
    }
    async getAllClubRoom(ClubRoominfo, session) {
        if (!ClubRoominfo || !ClubRoominfo.clubid) {
            return {
                code: 10003
            };
        }
        let result = await clubRoom_1.ClubRoom.getAllClubRoom({ clubid: ClubRoominfo.clubid });
        if (result.length > 0) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 15003
            };
        }
    }
    /**
     *
     * 获取全部房间的椅子信息
     */
    async getAllClubRoomChairsState(ClubRoominfo, session) {
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 15004
            };
        }
        // const roomIdList = await redisClient.lrangeAsync(`${redisKeyPrefix.club}${clubid}`, 0, MAXLENGTH);
        const roomIdList = await clubRoomList_1.ClubRoomList.getClubRoomList({ clubid });
        if (roomIdList.length == 0) {
            return {
                code: 15005
            };
        }
        const roomarr = [];
        for (const iterator of roomIdList) {
            const json = {};
            json.roomid = iterator;
            // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${iterator}`);
            const state = await clubRoomState_1.ClubRoomState.getClubRoomAllChairsState({ clubid, roomid: Number.parseInt(iterator, 0) });
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    // const element = state[key];
                    const userinfo = await user_1.User.getUser({ userid: Number.parseInt(state[key], 0) });
                    json[key] = userinfo;
                }
            }
            roomarr.push(json);
        }
        if (roomarr.length > 0) {
            return {
                code: 0,
                data: roomarr
            };
        }
        else {
            return {
                code: 15005
            };
        }
    }
    /**
     *
     * 获取茶楼下全部房间的 正在房间的信息
     */
    async getAllClubRoomUsersState(ClubRoominfo, session) {
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 15006
            };
        }
        // const roomIdList = await redisClient.lrangeAsync(`${redisKeyPrefix.club}${clubid}`, 0, MAXLENGTH);
        const roomIdList = await clubRoomList_1.ClubRoomList.getClubRoomList({ clubid });
        const roomarr = [];
        for (const iterator of roomIdList) {
            const json = {};
            json.roomid = iterator;
            json.userlist = {};
            // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${iterator}`);
            const state = await clubRoomState_1.ClubRoomState.getClubRoomAllUsersState({ clubid, roomid: Number.parseInt(iterator, 0) });
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    // const element = state[key];
                    const userinfo = await user_1.User.getUser({ userid: Number.parseInt(key, 0) });
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
    async getClubRoomUserState(ClubRoominfo, session) {
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 15007
            };
        }
        const roomid = session.get('roomid');
        if (!roomid) {
            return {
                code: 500
            };
        }
        const json = {};
        json.roomid = roomid;
        // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${roomid}`);
        const state = await clubRoomState_1.ClubRoomState.getClubRoomAllUsersState({ clubid, roomid });
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                // const element = state[key];
                const userinfo = await user_1.User.getUser({ userid: Number.parseInt(key, 0) });
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
    async getClubRoomAllChairsState(ClubRoominfo, session) {
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
        const json = {};
        json.roomid = roomid;
        // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${roomid}`);
        const state = await clubRoomState_1.ClubRoomState.getClubRoomAllChairsState({ clubid, roomid });
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                // const element = state[key];
                const userinfo = await user_1.User.getUser({ userid: Number.parseInt(state[key], 0) });
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
    async getClubRoomServerId(ClubRoominfo, session) {
        const clubid = session.get('clubid');
        let serverId = this.app.getServerId();
        const channel = this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${ClubRoominfo.roomid}`);
        let update = true;
        for (const key in channel) {
            if (channel.hasOwnProperty(key)) {
                const element = channel[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.clubRoom}${ClubRoominfo.roomid}`].length > 0;
                if (ishas) {
                    serverId = await clubRoomServerId_1.ClubRoomServerId.getClubRoomServerId({ clubid, roomid: ClubRoominfo.roomid });
                    update = false;
                }
            }
        }
        if (update) {
            clubRoomServerId_1.ClubRoomServerId.setClubRoomServerId({ clubid, roomid: ClubRoominfo.roomid, sid: serverId });
        }
        return {
            code: 0,
            data: serverId
        };
    }
    async joinClubRoom(clubroomrpc, session) {
        if (!clubroomrpc || !clubroomrpc.roomid) {
            return {
                code: 10003
            };
        }
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 15011
            };
        }
        session.set('roomid', clubroomrpc.roomid);
        await session.apush('roomid');
        const clubRoom = await clubRoom_1.ClubRoom.getClubRoom({ roomid: clubroomrpc.roomid });
        if (!clubRoom) {
            return {
                code: 15012
            };
        }
        const clubChannel = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        for (const key in clubChannel) {
            if (clubChannel.hasOwnProperty(key)) {
                const element = clubChannel[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${session.uid}`, key, `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
                }
            }
        }
        const roomChannel = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${clubroomrpc.roomid}`);
        for (const key in roomChannel) {
            if (roomChannel.hasOwnProperty(key)) {
                const element = roomChannel[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.clubRoom}${clubroomrpc.roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${session.uid}`, key, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${clubroomrpc.roomid}`);
                }
            }
        }
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        // 发送到房间
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onEntryClubRoom}`, { user }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${clubroomrpc.roomid}`);
        // 发送到大厅
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onEntryClubRoom}`, { user, roomid: clubroomrpc.roomid }, `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        // redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, `${user.userid}`, '-1');
        clubRoomState_1.ClubRoomState.setClubRoomUserState({ clubid, roomid: clubroomrpc.roomid, uid: user.userid, state: -1 });
        return {
            code: 0,
            data: clubRoom
        };
    }
    async leaveClubRoom(clubroomrpc, session) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        if (!roomid) {
            return {
                code: 15013
            };
        }
        if (!clubid) {
            return {
                code: 15014
            };
        }
        const channels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
        // const channel = this.channelService.getChannel(`${gameChannelKeyPrefix.club}${session.get('clubid')}`, false);
        for (const key in channels) {
            if (channels.hasOwnProperty(key)) {
                const element = channels[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (ishas) {
                    this.globalChannelStatus.leave(`${session.uid}`, key, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
                }
            }
        }
        // 获取是否已经坐下
        // const chairIndex = await redisClient.hgetAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`, `${session.uid}`);
        const chairIndex = await clubRoomState_1.ClubRoomState.getClubRoomUserState({ clubid, roomid, uid: Number.parseInt(session.uid, 0) });
        // 删除标识
        // await redisClient.hdelAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`, `${session.uid}`);
        clubRoomState_1.ClubRoomState.delClubRoomUser({ clubid, roomid, uid: Number.parseInt(session.uid, 0) });
        // 如果已经坐下，位子空出来
        if (Number.parseInt(chairIndex, 0) >= 0) {
            clubRoomState_1.ClubRoomState.setClubRoomChairState({ clubid, roomid, chairIndex: Number.parseInt(chairIndex, 0), state: -1 });
            // await redisClient.hsetAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`, `${gameChannelKeyPrefix.chair}${chairIndex}`, '-1');
        }
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStandUp}`, { user, roomid, chairIndex }, `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStandUp}`, { user, chairIndex }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onLeaveClubRoom}`, { user }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onLeaveClubRoom}`, { user, roomid }, `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        session.set('roomid', null);
        session.apush('roomid');
        return {
            code: 0,
            data: clubid
        };
    }
    async sitDown(obj, session) {
        const MAXLENGTH = 20;
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        if (!roomid) {
            return {
                code: 15015
            };
        }
        if (!clubid) {
            return {
                code: 15016
            };
        }
        const roomChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
        for (const key in roomChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = roomChannels[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 501
                    };
                }
            }
        }
        const clubChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        for (const key in clubChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = clubChannels[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 502
                    };
                }
            }
        }
        // const roomInfo = await redisClient.hgetallAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`);
        const roomInfo = await clubRoomState_1.ClubRoomState.getClubRoomAllChairsState({ clubid, roomid });
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
                code: 503
            };
        }
        // await redisClient.hsetAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`, `${session.uid}`, `${chairIndex}`);
        // await redisClient.hsetAsync(`${gameChannelKeyPrefix.clubRoom}${roomid}`, `${gameChannelKeyPrefix.chair}${chairIndex}`, `${session.uid}`);
        clubRoomState_1.ClubRoomState.setClubRoomUserState({ clubid, roomid, uid: Number.parseInt(session.uid, 0), state: chairIndex });
        clubRoomState_1.ClubRoomState.setClubRoomChairState({ clubid, roomid, chairIndex, state: Number.parseInt(session.uid, 0) });
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onSitDown}`, { user, chairIndex }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onSitDown}`, { user, chairIndex, roomid }, `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        return {
            code: 0
        };
    }
    async standUp(obj, session) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        if (!roomid) {
            return {
                code: 15017
            };
        }
        if (!clubid) {
            return {
                code: 15018
            };
        }
        const roomChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
        for (const key in roomChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = roomChannels[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 15019
                    };
                }
            }
        }
        const clubChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        for (const key in clubChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = clubChannels[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 15020
                    };
                }
            }
        }
        const chairIndex = await clubRoomState_1.ClubRoomState.getClubRoomUserState({ clubid, roomid, uid: Number.parseInt(session.uid, 0) });
        if (Number.parseInt(chairIndex, 0) < 0) {
            return {
                code: 15021
            };
        }
        clubRoomState_1.ClubRoomState.setClubRoomUserState({ clubid, roomid, uid: Number.parseInt(session.uid, 0), state: -1 });
        clubRoomState_1.ClubRoomState.setClubRoomChairState({ clubid, roomid, chairIndex: Number.parseInt(chairIndex, 0), state: -1 });
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStandUp}`, { user, chairIndex }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStandUp}`, { user, chairIndex, roomid }, `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        return {
            code: 0
        };
    }
    async startGame(obj, session) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        if (!roomid) {
            return {
                code: 15022
            };
        }
        if (!clubid) {
            return {
                code: 15023
            };
        }
        const clubroom = await clubRoom_1.ClubRoom.getClubRoom({ roomid });
        let game = new game_1.Game(clubroom, this, clubid, roomid);
        this.app.set(`${nameSpace_1.gameChannelKeyPrefix.club_room_game}${roomid}`, game);
        game.start();
        return {
            code: 0
        };
    }
    async grabBanker(json, session) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        let game = this.app.get(`${nameSpace_1.gameChannelKeyPrefix.club_room_game}${roomid}`);
        let parms = {};
        parms[session.uid] = json.number;
        return {
            code: game.userGrabBanker(parms)
        };
    }
    async setBet(json, session) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        let game = this.app.get(`${nameSpace_1.gameChannelKeyPrefix.club_room_game}${roomid}`);
        let parms = {};
        parms[session.uid] = json.number;
        return {
            code: game.userSetBet(parms)
        };
    }
    async expression(info, session) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onExpression}`, Object.assign({}, info, { uid: session.uid }), `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
        return {
            code: 0
        };
        // return club;
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY2x1YlJvb20vaGFuZGxlci9jbHViUm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsb0VBQWlFO0FBQ2pFLHNGQUFtRjtBQUNuRixrR0FBK0Y7QUFDL0YseUZBQXNGO0FBQ3RGLHdEQUFxRDtBQUNyRCw2REFBcUU7QUFDckUsK0VBQWtFO0FBRWxFLDZDQUEwQztBQUUxQyxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxNQUFhLE9BQU87SUFJaEIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0RBQTBCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNNLDZCQUE2QjtRQUNoQyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNwQyxDQUFDO0lBQ00sTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUE4QixFQUFFLE9BQXVCO1FBQy9FLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvQkFBb0I7SUFDYixLQUFLLENBQUMsY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7UUFFL0UsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBOEIsRUFBRSxPQUF1QjtRQUMvRSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUN2QyxPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO1FBQ0QsSUFBSSxLQUFLLHFCQUFRLFlBQVksQ0FBRSxDQUFDO1FBQ2hDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNwQixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDekIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRXBCLElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xJLElBQUksTUFBTSxFQUFFO1lBQ1IsT0FBTztnQkFDSCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUM7U0FDTDthQUFNO1lBQ0gsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7UUFDNUUsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDdkMsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDtRQUNELElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDekUsSUFBSSxNQUFNLEVBQUU7WUFDUixPQUFPO2dCQUNILElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBOEIsRUFBRSxPQUF1QjtRQUMvRSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUN2QyxPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO1FBQ0QsSUFBSSxNQUFNLEdBQUcsTUFBTSxtQkFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM1RSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLHlCQUF5QixDQUFDLFlBQThCLEVBQUUsT0FBdUI7UUFDMUYsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDtRQUNELHFHQUFxRztRQUNyRyxNQUFNLFVBQVUsR0FBRyxNQUFNLDJCQUFZLENBQUMsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNsRSxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3hCLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFDRCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsS0FBSyxNQUFNLFFBQVEsSUFBSSxVQUFVLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEdBQVEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ3ZCLHlGQUF5RjtZQUN6RixNQUFNLEtBQUssR0FBRyxNQUFNLDZCQUFhLENBQUMseUJBQXlCLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5RyxLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtnQkFDckIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQiw4QkFBOEI7b0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2hGLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7aUJBQ3hCO2FBQ0o7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixPQUFPO2dCQUNILElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUM7U0FDTDthQUFNO1lBQ0gsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDtJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsWUFBOEIsRUFBRSxPQUF1QjtRQUN6RixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO1FBQ0QscUdBQXFHO1FBQ3JHLE1BQU0sVUFBVSxHQUFHLE1BQU0sMkJBQVksQ0FBQyxlQUFlLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFLLE1BQU0sUUFBUSxJQUFJLFVBQVUsRUFBRTtZQUMvQixNQUFNLElBQUksR0FBUSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIseUZBQXlGO1lBQ3pGLE1BQU0sS0FBSyxHQUFHLE1BQU0sNkJBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdHLEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUNyQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLDhCQUE4QjtvQkFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7aUJBQ2pDO2FBQ0o7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTztZQUNILElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLE9BQU87U0FDaEIsQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsWUFBOEIsRUFBRSxPQUF1QjtRQUNyRixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO1FBQ0QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztnQkFDSCxJQUFJLEVBQUUsR0FBRzthQUNaLENBQUM7U0FDTDtRQUNELE1BQU0sSUFBSSxHQUFRLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQix1RkFBdUY7UUFDdkYsTUFBTSxLQUFLLEdBQUcsTUFBTSw2QkFBYSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0UsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDckIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQiw4QkFBOEI7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7YUFDeEI7U0FDSjtRQUNELE9BQU87WUFDSCxJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMseUJBQXlCLENBQUMsWUFBOEIsRUFBRSxPQUF1QjtRQUMxRixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO1FBQ0QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDtRQUNELE1BQU0sSUFBSSxHQUFRLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQix1RkFBdUY7UUFDdkYsTUFBTSxLQUFLLEdBQUcsTUFBTSw2QkFBYSxDQUFDLHlCQUF5QixDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDaEYsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDckIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQiw4QkFBOEI7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hGLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO2FBQzlCO1NBQ0o7UUFDRCxPQUFPO1lBQ0gsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLG1CQUFtQixDQUFDLFlBQThCLEVBQUUsT0FBdUI7UUFDcEYsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXRDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDeEksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEtBQUssTUFBTSxHQUFHLElBQUksT0FBTyxFQUFFO1lBQ3ZCLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxnQ0FBb0IsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDM0YsSUFBSSxLQUFLLEVBQUU7b0JBQ1AsUUFBUSxHQUFHLE1BQU0sbUNBQWdCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUMvRixNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUNsQjthQUNKO1NBQ0o7UUFDRCxJQUFJLE1BQU0sRUFBRTtZQUNSLG1DQUFnQixDQUFDLG1CQUFtQixDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ2hHO1FBQ0QsT0FBTztZQUNILElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLFFBQVE7U0FDakIsQ0FBQztJQUNOLENBQUM7SUFFTSxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQXlCLEVBQUUsT0FBdUI7UUFDeEUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDckMsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDtRQUVELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFFRCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqSSxLQUFLLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRTtZQUMzQixJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2pDLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzFGLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDaEc7YUFDSjtTQUNKO1FBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2pKLEtBQUssTUFBTSxHQUFHLElBQUksV0FBVyxFQUFFO1lBQzNCLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDakMsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxnQ0FBb0IsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzFHLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQ2hIO2FBQ0o7U0FDSjtRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLFFBQVE7UUFDUixJQUFJLENBQUMsbUJBQW1CLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLEdBQUcsNEJBQVksQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3JLLFFBQVE7UUFDUixJQUFJLENBQUMsbUJBQW1CLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLEdBQUcsNEJBQVksQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFakwsb0dBQW9HO1FBQ3BHLDZCQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV4RyxPQUFPO1lBQ0gsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsUUFBUTtTQUNqQixDQUFDO0lBRU4sQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhLENBQUMsV0FBeUIsRUFBRSxPQUF1QjtRQUN6RSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDtRQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxHQUFHLGdDQUFvQixDQUFDLFFBQVEsR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2xJLGlIQUFpSDtRQUNqSCxLQUFLLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUN4QixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzlCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsZ0NBQW9CLENBQUMsUUFBUSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzlGLElBQUksS0FBSyxFQUFFO29CQUNQLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsUUFBUSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQ3RHO2FBQ0o7U0FDSjtRQUNELFdBQVc7UUFDWCxpSEFBaUg7UUFDakgsTUFBTSxVQUFVLEdBQUcsTUFBTSw2QkFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0SCxPQUFPO1FBQ1AsOEZBQThGO1FBQzlGLDZCQUFhLENBQUMsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4RixlQUFlO1FBQ2YsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckMsNkJBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0csZ0lBQWdJO1NBQ25JO1FBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxHQUFHLDRCQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbkssSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxHQUFHLDRCQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvSixJQUFJLENBQUMsbUJBQW1CLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLEdBQUcsNEJBQVksQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsUUFBUSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDekosSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxHQUFHLDRCQUFZLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM3SixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hCLE9BQU87WUFDSCxJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxNQUFNO1NBQ2YsQ0FBQztJQUVOLENBQUM7SUFDTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVEsRUFBRSxPQUF1QjtRQUNsRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDckIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFDRCxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN0SSxLQUFLLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRTtZQUM1QixJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsZ0NBQW9CLENBQUMsUUFBUSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzlGLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsT0FBTzt3QkFDSCxJQUFJLEVBQUUsR0FBRztxQkFDWixDQUFDO2lCQUNMO2FBQ0o7U0FDSjtRQUNELE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxHQUFHLGdDQUFvQixDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2xJLEtBQUssTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFO1lBQzVCLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxnQ0FBb0IsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDMUYsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixPQUFPO3dCQUNILElBQUksRUFBRSxHQUFHO3FCQUNaLENBQUM7aUJBQ0w7YUFDSjtTQUNKO1FBQ0QsZ0dBQWdHO1FBQ2hHLE1BQU0sUUFBUSxHQUFHLE1BQU0sNkJBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRW5GLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEdBQUc7WUFDQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUN0QjtZQUNELEtBQUssRUFBRSxDQUFDO1NBRVgsUUFBUSxVQUFVLEdBQUcsQ0FBQyxJQUFJLFVBQVUsR0FBRyxTQUFTLEVBQUU7UUFDbkQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7YUFDWixDQUFDO1NBQ0w7UUFDRCwrR0FBK0c7UUFDL0csNElBQTRJO1FBQzVJLDZCQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDaEgsNkJBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVHLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsR0FBRyw0QkFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsUUFBUSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0osSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxHQUFHLDRCQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbkssT0FBTztZQUNILElBQUksRUFBRSxDQUFDO1NBQ1YsQ0FBQztJQUVOLENBQUM7SUFDTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVEsRUFBRSxPQUF1QjtRQUNsRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDtRQUNELE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxHQUFHLGdDQUFvQixDQUFDLFFBQVEsR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RJLEtBQUssTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFO1lBQzVCLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxnQ0FBb0IsQ0FBQyxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDOUYsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixPQUFPO3dCQUNILElBQUksRUFBRSxLQUFLO3FCQUNkLENBQUM7aUJBQ0w7YUFDSjtTQUNKO1FBQ0QsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbEksS0FBSyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUU7WUFDNUIsSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLGdDQUFvQixDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLE9BQU87d0JBQ0gsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsQ0FBQztpQkFDTDthQUNKO1NBQ0o7UUFDRCxNQUFNLFVBQVUsR0FBRyxNQUFNLDZCQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RILElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BDLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFDRCw2QkFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEcsNkJBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0csTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxHQUFHLDRCQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvSixJQUFJLENBQUMsbUJBQW1CLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLEdBQUcsNEJBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNuSyxPQUFPO1lBQ0gsSUFBSSxFQUFFLENBQUM7U0FDVixDQUFDO0lBQ04sQ0FBQztJQUNNLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBUSxFQUFFLE9BQXVCO1FBQ3BELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO1FBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxtQkFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDeEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxnQ0FBb0IsQ0FBQyxjQUFjLEdBQUcsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTztZQUNILElBQUksRUFBRSxDQUFDO1NBQ1YsQ0FBQztJQUNOLENBQUM7SUFDTSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQXdCLEVBQUUsT0FBdUI7UUFDckUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsZ0NBQW9CLENBQUMsY0FBYyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFakYsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pDLE9BQU87WUFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7U0FDbkMsQ0FBQztJQUNOLENBQUM7SUFDTSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQXdCLEVBQUUsT0FBdUI7UUFDakUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsZ0NBQW9CLENBQUMsY0FBYyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFakYsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pDLE9BQU87WUFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7U0FDL0IsQ0FBQztJQUNOLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQVMsRUFBRSxPQUF1QjtRQUN0RCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxHQUFHLDRCQUFZLENBQUMsWUFBWSxFQUFFLG9CQUFPLElBQUksSUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsS0FBSSxHQUFHLGdDQUFvQixDQUFDLFFBQVEsR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzNLLE9BQU87WUFDSCxJQUFJLEVBQUUsQ0FBQztTQUNWLENBQUM7UUFDRixlQUFlO0lBQ25CLENBQUM7Q0FDSjtBQWxpQkQsMEJBa2lCQyJ9