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
        let result = await clubRoom_1.ClubRoom.updateClubRoom({ roomid: ClubRoominfo.roomid, clubid: ClubRoominfo.clubid, uid: session.uid }, njson);
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
        let result = await clubRoom_1.ClubRoom.getClubRoom({ roomid: ClubRoominfo.roomid });
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
        return {
            code: 0,
            data: roomarr
        };
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
                code: 15008
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
        if (!clubid) {
            return {
                code: 15011
            };
        }
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
                code: 15012
            };
        }
        session.set('roomid', clubroomrpc.roomid);
        await session.apush('roomid');
        const clubRoom = await clubRoom_1.ClubRoom.getClubRoom({ roomid: clubroomrpc.roomid });
        if (!clubRoom) {
            return {
                code: 15013
            };
        }
        const clubChannel = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        for (const key in clubChannel) {
            if (clubChannel.hasOwnProperty(key)) {
                const element = clubChannel[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.leave(session.uid, key, `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
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
                code: 15014
            };
        }
        if (!clubid) {
            return {
                code: 15015
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
        const clubchannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        for (const key in clubchannels) {
            if (clubchannels.hasOwnProperty(key)) {
                const element = clubchannels[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${session.uid}`, key, `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
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
                code: 15016
            };
        }
        if (!clubid) {
            return {
                code: 15017
            };
        }
        const roomChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
        for (const key in roomChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = roomChannels[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 15018
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
                        code: 15019
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
                code: 15020
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
                code: 15021
            };
        }
        if (!clubid) {
            return {
                code: 15022
            };
        }
        const roomChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`);
        for (const key in roomChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = roomChannels[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 15023
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
                        code: 15024
                    };
                }
            }
        }
        const chairIndex = await clubRoomState_1.ClubRoomState.getClubRoomUserState({ clubid, roomid, uid: Number.parseInt(session.uid, 0) });
        if (Number.parseInt(chairIndex, 0) < 0) {
            return {
                code: 15025
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
                code: 15026
            };
        }
        if (!clubid) {
            return {
                code: 15027
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY2x1YlJvb20vaGFuZGxlci9jbHViUm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsb0VBQWlFO0FBQ2pFLHNGQUFtRjtBQUNuRixrR0FBK0Y7QUFDL0YseUZBQXNGO0FBQ3RGLHdEQUFxRDtBQUNyRCw2REFBcUU7QUFDckUsK0VBQWtFO0FBRWxFLDZDQUEwQztBQUUxQyxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxNQUFhLE9BQU87SUFJaEIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0RBQTBCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNNLDZCQUE2QjtRQUNoQyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNwQyxDQUFDO0lBQ00sTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUE4QixFQUFFLE9BQXVCO1FBQy9FLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvQkFBb0I7SUFDYixLQUFLLENBQUMsY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7UUFFL0UsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBOEIsRUFBRSxPQUF1QjtRQUMvRSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUN2QyxPQUFPO2dCQUNI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