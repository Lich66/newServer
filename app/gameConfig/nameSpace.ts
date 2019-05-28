export const redisKeyPrefix = {
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
export const gameChannelKeyPrefix = {
    /**
     * 游戏的命名空间
     */
    club_room_game: 'club_room_game_',
    club: 'club_',
    clubRoom: ':clubRoom_',
    room: 'room_'
};

export const appKeyPrefix = {
    roomList: 'roomList'
};
/**
 * 房间游戏的命名空间
 */
export const channelKeyPrefix = {
    /**
     * 游戏的命名空间
     */
    channel: 'channel_'
};
