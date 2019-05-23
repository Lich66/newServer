"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
const clubRoom_1 = require("../../../controller/clubRoom/clubRoom");
const user_1 = require("../../../controller/user/user");
const redis_1 = require("../../../db/redis");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../../../gameConfig/socketRouterConfig");
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
                code: 200,
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
                code: 200,
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
                code: 200,
                data: result
            };
        }
        else {
            return {
                code: 500
            };
        }
    }
    async getAllClubRoomState(ClubRoominfo, session) {
        const MAXLENGTH = 20;
        const clubid = session.get('clubid');
        if (!clubid) {
            return {
                code: 500
            };
        }
        const roomIdList = await redis_1.redisClient.lrangeAsync(`${nameSpace_1.redisKeyPrefix.club}${clubid}`, 0, MAXLENGTH);
        console.log(roomIdList);
        const roomarr = [];
        for (const iterator of roomIdList) {
            const json = {};
            json.roomid = iterator;
            const state = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${iterator}`);
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    // const element = state[key];
                    if (!key.startsWith(nameSpace_1.redisKeyPrefix.chair)) {
                        const userinfo = await user_1.User.getUser({ userid: Number.parseInt(key, 0) });
                        json[key] = userinfo;
                    }
                    else {
                        json[key] = state[key];
                    }
                }
            }
            roomarr.push(json);
        }
        console.log(roomarr);
        if (roomarr.length > 0) {
            return {
                code: 200,
                data: roomarr
            };
        }
        else {
            return {
                code: 500
            };
        }
    }
    async getClubRoomState(ClubRoominfo, session) {
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
        const state = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                // const element = state[key];
                if (!key.startsWith(nameSpace_1.redisKeyPrefix.chair)) {
                    const userinfo = await user_1.User.getUser({ userid: Number.parseInt(key, 0) });
                    json[key] = userinfo;
                }
                else {
                    json[key] = state[key];
                }
            }
        }
        return {
            code: 200,
            data: json
        };
    }
    async leaveClubRoom(clubroomrpc, session) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        const channels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
        // const channel = this.channelService.getChannel(`${redisKeyPrefix.club}${session.get('clubid')}`, false);
        for (const key in channels) {
            if (channels.hasOwnProperty(key)) {
                const element = channels[key];
                const ishas = element[`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (ishas) {
                    this.globalChannelStatus.leave(`${session.uid}`, key, `${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
                }
            }
        }
        // 获取是否已经坐下
        const chairIndex = await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`);
        // 删除标识
        await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
        // 如果已经坐下，位子空出来
        if (Number.parseInt(chairIndex, 0) >= 0) {
            await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${nameSpace_1.redisKeyPrefix.chair}${chairIndex}`, '-1');
        }
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onLeaveClubRoom}`, { user }, `${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onLeaveClubRoom}`, { user, roomid }, `${nameSpace_1.redisKeyPrefix.club}${clubid}`);
        // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
        // roomChannel.pushMessage(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, { user, action: 0 });
        session.set('roomid', null);
        session.push('roomid', () => {
        });
        return {
            code: 200,
            data: session.get('clubid')
        };
    }
    async sitDown(obj, session) {
        const MAXLENGTH = 20;
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        const roomChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
        for (const key in roomChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = roomChannels[key];
                const ishas = element[`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 501
                    };
                }
            }
        }
        const clubChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.redisKeyPrefix.club}${clubid}`);
        for (const key in clubChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = clubChannels[key];
                const ishas = element[`${nameSpace_1.redisKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 502
                    };
                }
            }
        }
        const roomInfo = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
        let chairIndex = -1;
        let index = 0;
        console.log('****************************************');
        console.log(roomInfo);
        console.log(JSON.stringify(roomInfo));
        do {
            if (Number.parseInt(roomInfo[`${nameSpace_1.redisKeyPrefix.chair}${index}`], 0) < 0) {
                chairIndex = index;
            }
            index++;
        } while (chairIndex < 0 && chairIndex < MAXLENGTH);
        if (chairIndex < 0) {
            return {
                code: 503
            };
        }
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`, `${chairIndex}`);
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${nameSpace_1.redisKeyPrefix.chair}${chairIndex}`, `${session.uid}`);
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        console.log(`${nameSpace_1.redisKeyPrefix.club}${clubid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onSitDown}`, { user, chairIndex }, `${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onSitDown}`, { user, chairIndex, roomid }, `${nameSpace_1.redisKeyPrefix.club}${clubid}`);
        return {
            code: 200
        };
    }
    async standUp(obj, session) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        const roomChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
        for (const key in roomChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = roomChannels[key];
                const ishas = element[`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 501
                    };
                }
            }
        }
        const clubChannels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.redisKeyPrefix.club}${clubid}`);
        for (const key in clubChannels) {
            if (roomChannels.hasOwnProperty(key)) {
                const element = clubChannels[key];
                const ishas = element[`${nameSpace_1.redisKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (!ishas) {
                    return {
                        code: 502
                    };
                }
            }
        }
        const chairIndex = await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`);
        if (Number.parseInt(chairIndex, 0) < 0) {
            return {
                code: 500
            };
        }
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`, '-1');
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${nameSpace_1.redisKeyPrefix.chair}${chairIndex}`, '-1');
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStandUp}`, { user, chairIndex }, `${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStandUp}`, { user, chairIndex, roomid }, `${nameSpace_1.redisKeyPrefix.club}${clubid}`);
        return {
            code: 200
        };
    }
    async startGame(roomid, roomInfo) {
        const MAXTime = 50000;
        let clubRoom;
        if (!roomInfo) {
            clubRoom = await clubRoom_1.ClubRoom.getClubRoom({ roomid });
        }
        else {
            clubRoom = roomInfo;
        }
        // const channel = this.channelService.getChannel(`${redisKeyPrefix.clubRoom}${roomid}`);
        // let game = new Game(clubRoom, this.channelService);
        // this.app.set(`${gameKeyPrefix.club_room_game}${roomid}`, game);
        // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${roomid}`);
        // for (const key in state) {
        //     if (state.hasOwnProperty(key)) {
        //         // const element = state[key];
        //         if (key.startsWith(redisKeyPrefix.chair)) {
        //             game.pushUser(Number.parseInt(state[key], 0));
        //         }
        //     }
        // }
        // const round = clubRoom.round;
        // let roundIndex = 1;
        // const timmer = setInterval(() => {
        //     game.sendPoker();
        //     setTimeout(() => {
        //         game.settlement();
        //     }, 10000);
        //     roundIndex++;
        //     if (roundIndex == round) {
        //         clearInterval(timmer);
        //         game = null;
        //     }
        // }, MAXTime);
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY2x1YlJvb20vaGFuZGxlci9jbHViUm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsb0VBQWlFO0FBQ2pFLHdEQUFxRDtBQUNyRCw2Q0FBZ0Q7QUFDaEQsNkRBQThFO0FBQzlFLCtFQUFrRTtBQU1sRSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxNQUFhLE9BQU87SUFJaEIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0RBQTBCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBOEIsRUFBRSxPQUF1QjtRQUMvRSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsb0JBQW9CO0lBQ2IsS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUE4QixFQUFFLE9BQXVCO1FBRS9FLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxLQUFLLENBQUMsY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7UUFFL0UsSUFBSSxLQUFLLHFCQUFRLFlBQVksQ0FBRSxDQUFDO1FBQ2hDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNwQixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDekIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRXBCLElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxN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