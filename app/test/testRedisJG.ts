import { RoomChannelService } from '../channelService/roomChannelService/roomChannelService';
import { redisClient } from '../db/redis';

let room = {
    roomid: '123456',
    userList: ['123', '456']
};


redisClient.setAsync('room:123456', JSON.stringify(room));

let room1 = new RoomChannelService();

 redisClient.getAsync('room:123456').then((xx) => {
    {
        console.log(JSON.parse(xx));

    }
});

