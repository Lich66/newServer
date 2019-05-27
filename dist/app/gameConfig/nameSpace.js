"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisKeyPrefix = {
    /**
     * 用户存储前缀
     */
    user: 'user_',
    /**
     * 房间列表存储前缀
     */
    userRoomList: 'userRoomList_',
    /**
     * 房间存储前缀
     */
    room: 'room_',
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
    clubRoom: ':clubRoom_'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZVNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL2dhbWVDb25maWcvbmFtZVNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxjQUFjLEdBQUc7SUFDMUI7O09BRUc7SUFDSCxJQUFJLEVBQUUsT0FBTztJQUNiOztPQUVHO0lBQ0gsWUFBWSxFQUFFLGVBQWU7SUFDN0I7O09BRUc7SUFDSCxJQUFJLEVBQUUsT0FBTztJQUNiOztPQUVHO0lBQ0gsSUFBSSxFQUFFLGVBQWU7SUFDckIsZUFBZSxFQUFFLFdBQVc7SUFDNUI7O09BRUc7SUFDSCxRQUFRLEVBQUUsWUFBWTtJQUN0QixjQUFjLEVBQUUsUUFBUTtJQUN4QixZQUFZLEVBQUUsTUFBTTtJQUNwQjs7T0FFRztJQUNILEtBQUssRUFBRSxRQUFRO0NBQ2xCLENBQUM7QUFHRjs7R0FFRztBQUNVLFFBQUEsb0JBQW9CLEdBQUc7SUFDaEM7O09BRUc7SUFDSCxjQUFjLEVBQUUsaUJBQWlCO0lBQ2pDLElBQUksRUFBRSxPQUFPO0lBQ2IsUUFBUSxFQUFFLFlBQVk7Q0FDekIsQ0FBQztBQUVXLFFBQUEsWUFBWSxHQUFHO0lBQ3hCLFFBQVEsRUFBRSxVQUFVO0NBQ3ZCLENBQUM7QUFDRjs7R0FFRztBQUNVLFFBQUEsZ0JBQWdCLEdBQUc7SUFDNUI7O09BRUc7SUFDSCxPQUFPLEVBQUUsVUFBVTtDQUN0QixDQUFDIn0=