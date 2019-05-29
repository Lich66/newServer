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
                code: 500
            };
        }
    }
    async getClubRoom(ClubRoominfo, session) {
        let result = await clubRoom_1.ClubRoom.getClubRoom({ clubid: ClubRoominfo.clubid });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 500
            };
        }
    }
    async getAllClubRoom(ClubRoominfo, session) {
        let result = await clubRoom_1.ClubRoom.getAllClubRoom({ clubid: ClubRoominfo.clubid });
        if (result.length > 0) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 500
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
                code: 501
            };
        }
        // const roomIdList = await redisClient.lrangeAsync(`${redisKeyPrefix.club}${clubid}`, 0, MAXLENGTH);
        const roomIdList = await clubRoomList_1.ClubRoomList.getClubRoomList({ clubid });
        console.log(roomIdList);
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
        console.log(roomarr);
        if (roomarr.length > 0) {
            return {
                code: 0,
                data: roomarr
            };
        }
        else {
            return {
                code: 502
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
                code: 501
            };
        }
        // const roomIdList = await redisClient.lrangeAsync(`${redisKeyPrefix.club}${clubid}`, 0, MAXLENGTH);
        const roomIdList = await clubRoomList_1.ClubRoomList.getClubRoomList({ clubid });
        console.log(roomIdList);
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
        console.log(roomarr);
        if (roomarr.length > 0) {
            return {
                code: 0,
                data: roomarr
            };
        }
        else {
            return {
                code: 502
            };
        }
    }
    /**
     *
     * 获取某房间的用户信息
     */
    async getClubRoomUserState(ClubRoominfo, session) {
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
                code: 500
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
        session.set('roomid', clubroomrpc.roomid);
        await session.apush('roomid');
        const clubid = session.get('clubid');
        const clubRoom = await clubRoom_1.ClubRoom.getClubRoom({ roomid: clubroomrpc.roomid });
        if (!clubRoom) {
            return null;
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
        const chairIndex = await clubRoomState_1.ClubRoomState.getClubRoomUserState({ clubid, roomid, uid: Number.parseInt(session.uid, 0) });
        if (Number.parseInt(chairIndex, 0) < 0) {
            return {
                code: 500
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY2x1YlJvb20vaGFuZGxlci9jbHViUm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsb0VBQWlFO0FBQ2pFLHNGQUFtRjtBQUNuRixrR0FBK0Y7QUFDL0YseUZBQXNGO0FBQ3RGLHdEQUFxRDtBQUNyRCw2REFBcUU7QUFDckUsK0VBQWtFO0FBRWxFLDZDQUEwQztBQUUxQyxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxNQUFhLE9BQU87SUFJaEIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0RBQTBCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNNLDZCQUE2QjtRQUNoQyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNwQyxDQUFDO0lBQ00sTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUE4QixFQUFFLE9BQXVCO1FBQy9FLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvQkFBb0I7SUFDYixLQUFLLENBQUMsY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7UUFFL0UsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBOEIsRUFBRSxPQUF1QjtRQUUvRSxJQUFJLEtBQUsscUJBQVEsWUFBWSxDQUFFLENBQUM7UUFDaEMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFD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