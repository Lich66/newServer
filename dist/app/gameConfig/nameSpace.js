"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisKeyPrefix = {
    /**
     * 用户存储前缀
     */
    user: 'User:user_',
    /**
     * 房间列表存储前缀
     */
    userRoomList: 'UserRoomList:userRoomList_',
    /**
     * 房间存储前缀
     */
    room: 'Room:room_',
    /**
     * 茶楼存储前缀
     */
    club: 'MAGNATE:club_',
    clubRoomId_List: ':roomList',
    /**
     * 茶楼房间存储前缀
     */
    clubRoom: ':clubRoom_',
    clubRoom_users: ':users',
    clubRoom_sid: ':sid',
    /**
     * 茶楼房间位置存储前缀
     */
    chair: ':chair'
};
/**
 * 房间游戏的命名空间
 */
exports.gameChannelKeyPrefix = {
    /**
     * 游戏的命名空间
     */
    club_room_game: 'club_room_game_',
    club: 'club_',
    clubRoom: ':clubRoom_',
    room: 'room_'
};
exports.appKeyPrefix = {
    roomList: 'roomList'
};
/**
 * 房间游戏的命名空间
 */
exports.channelKeyPrefix = {
    /**
     * 游戏的命名空间
     */
    channel: 'channel_'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZVNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL2dhbWVDb25maWcvbmFtZVNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxjQUFjLEdBQUc7SUFDMUI7O09BRUc7SUFDSCxJQUFJLEVBQUUsWUFBWTtJQUNsQjs7T0FFRztJQUNILFlBQVksRUFBRSw0QkFBNEI7SUFDMUM7O09BRUc7SUFDSCxJQUFJLEVBQUUsWUFBWTtJQUNsQjs7T0FFRztJQUNILElBQUksRUFBRSxlQUFlO0lBQ3JCLGVBQWUsRUFBRSxXQUFXO0lBQzVCOztPQUVHO0lBQ0gsUUFBUSxFQUFFLFlBQVk7SUFDdEIsY0FBYyxFQUFFLFFBQVE7SUFDeEIsWUFBWSxFQUFFLE1BQU07SUFDcEI7O09BRUc7SUFDSCxLQUFLLEVBQUUsUUFBUTtDQUNsQixDQUFDO0FBR0Y7O0dBRUc7QUFDVSxRQUFBLG9CQUFvQixHQUFHO0lBQ2hDOztPQUVHO0lBQ0gsY0FBYyxFQUFFLGlCQUFpQjtJQUNqQyxJQUFJLEVBQUUsT0FBTztJQUNiLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLElBQUksRUFBRSxPQUFPO0NBQ2hCLENBQUM7QUFFVyxRQUFBLFlBQVksR0FBRztJQUN4QixRQUFRLEVBQUUsVUFBVTtDQUN2QixDQUFDO0FBQ0Y7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFHO0lBQzVCOztPQUVHO0lBQ0gsT0FBTyxFQUFFLFVBQVU7Q0FDdEIsQ0FBQyJ9