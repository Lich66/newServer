"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roomChannelService_1 = require("../channelService/roomChannelService/roomChannelService");
const redis_1 = require("../db/redis");
let room = {
    roomid: '123456',
    userList: ['123', '456']
};
redis_1.redisClient.setAsync('room:123456', JSON.stringify(room));
let room1 = new roomChannelService_1.RoomChannelService();
redis_1.redisClient.getAsync('room:123456').then((xx) => {
    {
        console.log(JSON.parse(xx));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdFJlZGlzSkcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdGVzdC90ZXN0UmVkaXNKRy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdHQUE2RjtBQUM3Rix1Q0FBMEM7QUFFMUMsSUFBSSxJQUFJLEdBQUc7SUFDUCxNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0NBQzNCLENBQUM7QUFHRixtQkFBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBRTFELElBQUksS0FBSyxHQUFHLElBQUksdUNBQWtCLEVBQUUsQ0FBQztBQUVwQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtJQUM3QztRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBRS9CO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==