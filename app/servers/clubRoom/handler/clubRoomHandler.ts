import { Application, BackendSession, ChannelService } from 'pinus';
import { ClubRoom } from '../../../controller/clubRoom/clubRoom';
import { User } from '../../../controller/user/user';
import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/redisKeyPrefix';
import { IClubRoomRequest, IClubRoomReturn, IClubRoomRpc } from '../../../interface/clubRoom/clubRoomInterface';

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    private channelService: ChannelService;
    public constructor(private app: Application) {
        this.channelService = app.get('channelService');
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
                code: 200,
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
                code: 200,
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
                code: 200,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }
    public async leaveClubRoom(clubroomrpc: IClubRoomRpc, session: BackendSession): Promise<IClubRoomReturn> {
        const roomChannel = this.channelService.getChannel(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, false);
        const roomChannelUser = roomChannel.getMember(`${session.uid}`);
        if (roomChannelUser) {
            roomChannel.removeMember(`${session.uid}`);
        }
        const chairIndex = await redisClient.hgetAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);

        await redisClient.hdelAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
        await redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${redisKeyPrefix.chair}${chairIndex}`, '-1');
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
        roomChannel.pushMessage(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, { user, action: 0 });
        session.set('roomid', null);
        session.push('roomid', () => {

        });
        return {
            code: 200,
            data: session.get('clubid')
        };

    }
    public async sitDown(obj: any, session: BackendSession): Promise<IClubRoomReturn> {
        const MAXLENGTH = 20;
        const roomChannel = this.channelService.getChannel(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, false);
        const roomChannelUser = roomChannel.getMember(`${session.uid}`);
        if (!roomChannelUser) {
            return {
                code: 500
            };
        }
        const roomInfo = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`);

        let chairIndex = -1;
        let index = 0;
        do {
            if (Number.parseInt(roomInfo[`${redisKeyPrefix.chair}${index}`], 0) < 0) {
                chairIndex = index;
            }
            index++;

        } while (chairIndex < 0 && chairIndex > MAXLENGTH);
        if (chairIndex < 0) {
            return {
                code: 500
            };
        }
        await redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`, `${chairIndex}`);
        await redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${redisKeyPrefix.chair}${chairIndex}`, `${session.uid}`);
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
        roomChannel.pushMessage(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, { user, action: 2, chairIndex });
        return {
            code: 200
        };

    }
    public async standUp(obj: any, session: BackendSession): Promise<IClubRoomReturn> {
        const roomChannel = this.channelService.getChannel(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, false);
        const roomChannelUser = roomChannel.getMember(`${session.uid}`);
        if (!roomChannelUser) {
            return {
                code: 500
            };
        }
        const chairIndex = await redisClient.hgetAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
        if (Number.parseInt(chairIndex, 0) < 0) {
            return {
                code: 500
            };
        }
        await redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`, '-1');
        await redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${redisKeyPrefix.chair}${chairIndex}`, '-1');
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
        roomChannel.pushMessage(`${redisKeyPrefix.clubRoom}${session.get('roomid')}`, { user, action: 3 });
        return {
            code: 200
        };
    }
}
