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
     * 房间玩家(坐下和旁观)
     */
    roomUsers: ':users',
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
     * 房间位置存储前缀
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
/**
 * 房间游戏的命名空间
 */
exports.channelKeyPrefix = {
    /**
     * 游戏的命名空间
     */
    channel: 'channel_'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZVNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL2dhbWVDb25maWcvbmFtZVNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxjQUFjLEdBQUc7SUFDMUI7O09BRUc7SUFDSCxJQUFJLEVBQUUsWUFBWTtJQUNsQjs7T0FFRztJQUNILFlBQVksRUFBRSw0QkFBNEI7SUFDMUM7O09BRUc7SUFDSCxJQUFJLEVBQUUsWUFBWTtJQUNsQjs7T0FFRztJQUNILFNBQVMsRUFBRSxRQUFRO0lBQ25COztPQUVHO0lBQ0gsSUFBSSxFQUFFLGVBQWU7SUFDckIsZUFBZSxFQUFFLFdBQVc7SUFDNUI7O09BRUc7SUFDSCxRQUFRLEVBQUUsWUFBWTtJQUN0QixjQUFjLEVBQUUsUUFBUTtJQUN4QixZQUFZLEVBQUUsTUFBTTtJQUNwQjs7T0FFRztJQUNILEtBQUssRUFBRSxRQUFRO0NBQ2xCLENBQUM7QUFHRjs7R0FFRztBQUNVLFFBQUEsb0JBQW9CLEdBQUc7SUFDaEM7O09BRUc7SUFDSCxjQUFjLEVBQUUsaUJBQWlCO0lBQ2pDLElBQUksRUFBRSxPQUFPO0lBQ2IsUUFBUSxFQUFFLFlBQVk7SUFDdEIsSUFBSSxFQUFFLE9BQU87Q0FDaEIsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBRztJQUM1Qjs7T0FFRztJQUNILE9BQU8sRUFBRSxVQUFVO0NBQ3RCLENBQUMifQ==