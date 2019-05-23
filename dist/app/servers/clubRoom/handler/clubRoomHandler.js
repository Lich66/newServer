"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clubRoom_1 = require("../../../controller/clubRoom/clubRoom");
const user_1 = require("../../../controller/user/user");
const redis_1 = require("../../../db/redis");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const game_1 = require("../../../util/game");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
        this.channelService = app.get('channelService');
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
        const roomChannel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, false);
        const roomChannelUser = roomChannel.getMember(`${session.uid}`);
        if (roomChannelUser) {
            roomChannel.removeMember(`${session.uid}`);
        }
        const chairIndex = await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
        await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${nameSpace_1.redisKeyPrefix.chair}${chairIndex}`, '-1');
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
        roomChannel.pushMessage(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, { user, action: 0 });
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
        const roomChannel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, true);
        const roomChannelUser = roomChannel.getMember(`${session.uid}`);
        if (!roomChannelUser) {
            return {
                code: 501
            };
        }
        const clubChannel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.club}${clubid}`, true);
        const clubChannelUser = clubChannel.getMember(`${session.uid}`);
        if (!clubChannelUser) {
            return {
                code: 502
            };
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
        console.log(clubChannel.getMembers());
        clubChannel.pushMessage(`${nameSpace_1.redisKeyPrefix.club}${clubid}`, { user, action: 2, chairIndex, roomid });
        roomChannel.pushMessage(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, { user, action: 2, chairIndex });
        return {
            code: 200
        };
    }
    async standUp(obj, session) {
        const roomid = session.get('roomid');
        const clubid = session.get('clubid');
        const roomChannel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, true);
        const roomChannelUser = roomChannel.getMember(`${session.uid}`);
        if (!roomChannelUser) {
            return {
                code: 500
            };
        }
        const clubChannel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.club}${clubid}`, true);
        const clubChannelUser = clubChannel.getMember(`${session.uid}`);
        if (!clubChannelUser) {
            return {
                code: 500
            };
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
        clubChannel.pushMessage(`${nameSpace_1.redisKeyPrefix.club}${clubid}`, { user, action: 3, chairIndex, roomid });
        roomChannel.pushMessage(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, { user, action: 3 });
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
        let game = new game_1.Game(clubRoom, this.channelService);
        this.app.set(`${nameSpace_1.gameKeyPrefix.club_room_game}${roomid}`, game);
        const state = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                // const element = state[key];
                if (key.startsWith(nameSpace_1.redisKeyPrefix.chair)) {
                    game.pushUser(Number.parseInt(state[key], 0));
                }
            }
        }
        const round = clubRoom.round;
        let roundIndex = 1;
        const timmer = setInterval(() => {
            game.sendPoker();
            setTimeout(() => {
                game.settlement();
            }, 10000);
            roundIndex++;
            if (roundIndex == round) {
                clearInterval(timmer);
                game = null;
            }
        }, MAXTime);
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY2x1YlJvb20vaGFuZGxlci9jbHViUm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxvRUFBaUU7QUFDakUsd0RBQXFEO0FBQ3JELDZDQUFnRDtBQUNoRCw2REFBOEU7QUFHOUUsNkNBQTBDO0FBRzFDLG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQWEsT0FBTztJQUdoQixZQUFtQixHQUFnQjtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxLQUFLLENBQUMsY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7UUFDL0UsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELG9CQUFvQjtJQUNiLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBOEIsRUFBRSxPQUF1QjtRQUUvRSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUE4QixFQUFFLE9BQXVCO1FBRS9FLElBQUksS0FBSyxxQkFBUSxZQUFZLENBQUUsQ0FBQztRQUNoQyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDcEIsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3pCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUVwQixJQUFJLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFF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